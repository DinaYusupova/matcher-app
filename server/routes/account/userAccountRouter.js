const express = require('express');
const { Profile } = require('../../db/models');
const { Filter } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const userInfo = await Profile.findOne({
      where: {
        userId: req.session.user.id,
      },
    });
    res.json(userInfo);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put('/', async (req, res) => {
  try {
    const data = await Profile.findByPk(1);
    if (!data) {
      await Profile.create({ ...req.body, userId: req.session.user.id });
    } else {
      await Profile.update(req.body, {
        where: {
          userId: req.session.usr.id,
        },
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/filter', async (req, res) => {
  try {
    const userFilter = await Filter.findOne({
      where: {
        userId: req.session.user.id,
      },
    });
    res.json(userFilter);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put('/filter', async (req, res) => {
  try {
    const data = await Filter.findOne({ where: { userId: req.session.user.id } });
    if (!data) {
      await Filter.create({ ...req.body, userId: req.session.user.id });
    } else {
      await Filter.update(req.body, {
        where: {
          userId: req.session.user.id,
        },
      });
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
