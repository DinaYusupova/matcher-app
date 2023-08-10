const express = require('express');
const { Profile } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await Profile.findOne({
      where: {
        id: 1,
      },
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
