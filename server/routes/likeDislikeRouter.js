const express = require('express');
const { QueryTypes, Op } = require('sequelize');
const schedule = require('node-schedule');
const { unique } = require('agenda/dist/job/unique');
const { Like, Dislikes, Chat, sequelize, Profile, Filter, Dialogue } = require('../db/models');
const calculateDistance = require('./functions/calculateDistance');

const scheduledJobs = {};
const router = express.Router();

router.post('/like', async (req, res) => {
  try {
    await Like.create({
      // eslint-disable-next-line camelcase
      likerId: req.session.user.id,
      likedById: req.body.userId,
    });

    let isMutualLike = false;
    let matchUser = 0;
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
      const matchUsers = await sequelize.query(
        '(select * from "Profiles" p left join (select up."userId", array_agg(up."photo") photos from "UserPhotos" up where up."userId" = :userId group by up."userId") up on p."userId" = up."userId" where p."userId" = :userId)',
        {
          replacements: {
            userId: req.body.userId,
          },
          type: QueryTypes.SELECT,
        },
      );
      matchUser = matchUsers[0];
      // создать диалог
      const currentDialogue = await Dialogue.create({
        buddyOne: req.session.user.id,
        buddyTwo: req.body.userId,
      });
      const uniqueJobId = `${currentDialogue.dataValues.buddyOne}-${currentDialogue.dataValues.buddyTwo}`;
      console.log(uniqueJobId, 'UNIQUE JOB ID!!!!!!!!!!!!!!!!!!!!!!');
      console.log('SCHEDULE CREATED 5 MINS');
      const job = schedule.scheduleJob('30 * * * * *', async () => {
        console.log('delete testing---------------------------------------------');
        await Chat.destroy({
          where: {
            [Op.or]: [
              {
                senderId: req.session.user.id,
                recipientId: req.body.userId,
              },
              {
                senderId: req.body.userId,
                recipientId: req.session.user.id,
              },
            ],
          },
        });
        delete scheduledJobs[uniqueJobId];
        currentDialogue.destroy();
        job.cancel();
      });
      scheduledJobs[uniqueJobId] = job;
      console.log(scheduledJobs, 'JOBS OBJECT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }

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
    console.log({ newProfile });
    if (newProfile.length) {
      const currentUserProfile = await Profile.findOne({ where: { userId: req.session.user.id } });
      newProfile[0].distanceBetweenUsers = calculateDistance(
        newProfile[0].userLatitude,
        newProfile[0].userLongitude,
        currentUserProfile.userLatitude,
        currentUserProfile.userLongitude,
      );
    }
    if (matchUser) {
      const currentUserProfile = await Profile.findOne({ where: { userId: req.session.user.id } });
      matchUser.distanceBetweenUsers = calculateDistance(
        matchUser.userLatitude,
        matchUser.userLongitude,
        currentUserProfile.userLatitude,
        currentUserProfile.userLongitude,
      );

      res.json([...newProfile, matchUser]);
    } else {
      res.json(newProfile);
    }
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

module.exports = { router, scheduledJobs };
