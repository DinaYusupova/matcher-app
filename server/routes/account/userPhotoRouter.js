const express = require('express');
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const upload = require('../../middlewares/multerMid');
const { UserPhoto } = require('../../db/models');
const authPhotoMiddleware = require('../../middlewares/ authPhotoMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const photos = await UserPhoto.findAll({
      where: {
        userId: req.session.user.id,
      },
      order: [['createdAt', 'DESC']], // Сортировка по полю createdAt в порядке убывания
    });
    res.json(photos);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/photos/:filename', authPhotoMiddleware, async (req, res) => { // ------------- ручка на запрос файла к серверу
  try {
    // Извлекаем имя файла из параметров запроса
    const { filename } = req.params;

    // Формируем путь к файлу на основе имени и текущего расположения скрипта
    const filePath = path.join(__dirname, '../../photos/img', filename);

    // Отправляем файл в ответ на запрос
    res.sendFile(filePath);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    // проверяем наличие файла
    if (!req.file) {
      return res.status(400).json({ message: 'File not found' });
    }

    // создаем имя файла с расширением webp и привязкой к дате
    const name = `${Date.now()}.webp`;
    // создаем буфер с помощью sharp
    const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
    // создаем файл с помощью fs
    await fs.writeFile(`./photos/img/${name}`, outputBuffer);
    // создаем пост в бд
    await UserPhoto.create({

      photo: name,
      userId: req.session.user.id,
    });
    const photo = await UserPhoto.findOne({ where: { photo: name } });

    res.status(200).json(photo);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const photoToDelete = await UserPhoto.findByPk(req.params.id);

    if (!photoToDelete) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // Получаем полный путь к файлу
    const filePath = path.join(__dirname, '../../photos/img', photoToDelete.photo);

    // Удаляем файл из файловой системы
    await fs.unlink(filePath);

    await UserPhoto.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
