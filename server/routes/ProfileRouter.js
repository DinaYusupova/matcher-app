const express = require('express');
const { QueryTypes } = require('sequelize');
const { Like, Dislikes, Chat, sequelize, Profile } = require('../db/models');
const calculateDistance = require('./fuctions/calculateDistance');

const router = express.Router();
const sessionUser = 2;

router.get('/', async (req, res) => {
  try {
    const newProfiles = await sequelize.query(
      '(select * from "Profiles" p where p."userId" not in (select l."likedById" from "Likes" l where l."likerId" = :userId) and p."userId" not in (select d."dislikedById" from "Dislikes" d where d."dislikerId" = :userId) and p."gender" = :userGender and p."age" between :minAge and :maxAge and p."userId" <> :userId limit 3)',
      {
        replacements: {
          userId: sessionUser,
          userGender: 'Female',
          minAge: 18,
          maxAge: 40,
        },
        type: QueryTypes.SELECT,
      },
    );
    const currentUserProfile = await Profile.findByPk(sessionUser);
    newProfiles.forEach((profile) => {
      // eslint-disable-next-line no-param-reassign
      profile.distanceBetweenUsers = calculateDistance(
        profile.userLatitude,
        profile.userLongitude,
        currentUserProfile.userLatitude,
        currentUserProfile.userLongitude,
      );
    });
    console.log(
      newProfiles[0].distanceBetweenUsers,
      newProfiles[1].distanceBetweenUsers,
      newProfiles[2].distanceBetweenUsers,
    );

    res.json(newProfiles);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/like', async (req, res) => {
  try {
    await Like.create({
      // eslint-disable-next-line camelcase
      likerId: sessionUser,
      likedById: req.body.userId,
    });

    let isMutualLike = false;
    await sequelize
      .query(
        '(select count(*) = 1 isMutual from "Likes" l where l."likerId" = :likedByCurrentUserId and l."likedById" = :currentUserId)',
        {
          replacements: {
            likedByCurrentUserId: req.body.userId,
            currentUserId: sessionUser,
          },
          type: QueryTypes.SELECT,
        },
      )
      .then((object) => {
        isMutualLike = object[0].ismutual;
      });
    if (isMutualLike) {
      await Chat.create({
        senderId: sessionUser,
        recipientId: req.body.userId,
      });
    }
    const newProfile = await sequelize.query(
      '(select * from "Profiles" p where p."userId" not in (select l."likedById" from "Likes" l where l."likerId" = :userId) and p."userId" not in (select d."dislikedById" from "Dislikes" d where d."dislikerId" = :userId) and p."gender" = :userGender and p."age" between :minAge and :maxAge and p."userId" <> :userId limit 1)',
      {
        replacements: {
          userId: sessionUser,
          userGender: 'Female',
          minAge: 18,
          maxAge: 40,
        },
        type: QueryTypes.SELECT,
      },
    );
    const currentUserProfile = await Profile.findByPk(sessionUser);
    newProfile.distanceBetweenUsers = calculateDistance(
      newProfile.userLatitude,
      newProfile.userLongitude,
      currentUserProfile.userLatitude,
      currentUserProfile.userLongitude,
    );
    res.json(newProfile);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/dislike/:id', async (req, res) => {
  try {
    await Dislikes.create({
      dislikerId: sessionUser,
      dislikedById: req.params.id,
    });

    const newProfile = await sequelize.query(
      '(select * from "Profiles" p where p."userId" not in (select l."likedById" from "Likes" l where l."likerId" = :userId) and p."userId" not in (select d."dislikedById" from "Dislikes" d where d."dislikerId" = :userId) and p."gender" = :userGender and p."age" between :minAge and :maxAge and p."userId" <> :userId limit 1)',
      {
        replacements: {
          userId: sessionUser,
          userGender: 'Female',
          minAge: 18,
          maxAge: 40,
        },
        type: QueryTypes.SELECT,
      },
    );
    const currentUserProfile = await Profile.findByPk(sessionUser);
    newProfile.distanceBetweenUsers = calculateDistance(
      newProfile.userLatitude,
      newProfile.userLongitude,
      currentUserProfile.userLatitude,
      currentUserProfile.userLongitude,
    );
    res.json(newProfile);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
module.exports = router;
