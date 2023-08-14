const express = require('express');
const { QueryTypes } = require('sequelize');
const { Like, Dislikes, Chat, sequelize, Profile, Filter } = require('../db/models');
const calculateDistance = require('./functions/calculateDistance');

const router = express.Router();

router.post('/like', async (req, res) => {
  try {
    await Like.create({
      // eslint-disable-next-line camelcase
      likerId: req.session.user.id,
      likedById: req.body.userId,
    });

    let isMutualLike = false;
    await sequelize
      .query(
        '(select count(*) = 1 isMutual from "Likes" l where l."likerId" = :likedByCurrentUserId and l."likedById" = :currentUserId)',
        {
          replacements: {
            likedByCurrentUserId: req.body.userId,
            currentUserId: req.session.user.id,
          },
          type: QueryTypes.SELECT,
        },
      )
      .then((object) => {
        isMutualLike = object[0].ismutual;
      });
    if (isMutualLike) {
      await Chat.create({
        senderId: req.session.user.id,
        recipientId: req.body.userId,
      });
    }

    const userFilter = await Filter.findOne({
      where: {
        userId: req.session.user.id,
      },
    });

    const newProfile = await sequelize.query(
      '(select * from "Profiles" p where p."userId" not in (select l."likedById" from "Likes" l where l."likerId" = :userId) and p."userId" not in (select d."dislikedById" from "Dislikes" d where d."dislikerId" = :userId) and p."gender" = :userGender and p."age" between :minAge and :maxAge and p."userId" <> :userId limit 1)',
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

router.get('/dislike/:id', async (req, res) => {
  try {
    await Dislikes.create({
      dislikerId: req.session.user.id,
      dislikedById: req.params.id,
    });

    const userFilter = await Filter.findOne({
      where: {
        userId: req.session.user.id,
      },
    });

    const newProfile = await sequelize.query(
      '(select * from "Profiles" p where p."userId" not in (select l."likedById" from "Likes" l where l."likerId" = :userId) and p."userId" not in (select d."dislikedById" from "Dislikes" d where d."dislikerId" = :userId) and p."gender" = :userGender and p."age" between :minAge and :maxAge and p."userId" <> :userId limit 1)',
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
