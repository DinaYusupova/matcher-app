const authPhotoMiddleware = (req, res, next) => {
  if (req.session.user) {
    // Пользователь авторизован, передаем управление дальше
    next();
  } else {
    // Пользователь не авторизован, отправляем сообщение об ошибке
    res.status(401).json({ message: 'Доступ разрешен только авторизованным пользователям' });
  }
};

module.exports = authPhotoMiddleware;
