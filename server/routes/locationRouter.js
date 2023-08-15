const express = require('express');
const { Profile } = require('../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userLatitude } = req.body;
    const { userLongitude } = req.body;
    const updatedProfile = await Profile.findOne({ where: { userId: req.session.user.id } });
    updatedProfile.userLatitude = userLatitude;
    updatedProfile.userLongitude = userLongitude;
    await updatedProfile.save();
    res.json({ message: 'Геолокация сохранена успешно.' });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
