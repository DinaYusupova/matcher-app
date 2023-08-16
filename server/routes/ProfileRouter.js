const express = require('express');
const { QueryTypes } = require('sequelize');
const { sequelize, Profile, Filter } = require('../db/models');
const calculateDistance = require('./functions/calculateDistance');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userLatitude } = req.body;
    const { userLongitude } = req.body;

    const updatedProfile = await Profile.findOne({ where: { userId: req.session.user.id } });
    updatedProfile.userLatitude = userLatitude;
    updatedProfile.userLongitude = userLongitude;
    await updatedProfile.save();

    const userFilter = await Filter.findOne({
      where: {
        userId: req.session.user.id,
      },
    });

    const newProfile = await sequelize.query(
      '(select p.*, up."photos" from "Profiles" p left join (select up."userId", array_agg(up."photo") photos from "UserPhotos" up group by up."userId") up on p."userId" = up."userId" where p."userId" not in (select l."likedById" from "Likes" l where l."likerId" = :userId) and p."userId" not in (select d."dislikedById" from "Dislikes" d where d."dislikerId" = :userId) and p."gender" = :userGender and p."age" between :minAge and :maxAge and p."userId" <> :userId limit 1)',
      {
        replacements: {
          userId: req.session.user.id,
          userGender: userFilter.searchGender,
          minAge: userFilter.minSearchAge,
          maxAge: userFilter.maxSearchAge,
        },
        type: QueryTypes.SELECT,
      },
    );

    if (newProfile[0]) {
      const currentUserProfile = await Profile.findOne({ where: { userId: req.session.user.id } });
      newProfile[0].distanceBetweenUsers = calculateDistance(
        newProfile[0].userLatitude,
        newProfile[0].userLongitude,
        currentUserProfile.userLatitude,
        currentUserProfile.userLongitude,
      );
    }
    res.json(newProfile);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
