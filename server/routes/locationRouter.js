const express = require('express');
const { Profile } = require('../db/models');

const router = express.Router();

const regSession = 2;

router.post('/', async (req, res) => {
  try {
    const { userLatitude } = req.body;
    const { userLongitude } = req.body;
    const updatedProfile = await Profile.findByPk(regSession);
    updatedProfile.userLatitude = userLatitude;
    updatedProfile.userLongitude = userLongitude;
    console.log(updatedProfile, 'updatedProfile');
    await updatedProfile.save();
    res.json({ message: 'Геолокация сохранена успешно.' });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
