const express = require('express');
const { QueryTypes } = require('sequelize');
const { Like, Dislikes, sequelize } = require('../db/models');

const router = express.Router();
const session_user = 2;

router.get('/', async (req, res) => {
  try {
    const newProfiles = await sequelize.query(
      '(select * from "Profiles" p where p."userId" not in (select l."likedById" from "Likes" l where l."likerId" = :userId) and p."gender" = :userGender and p."age" between :minAge and :maxAge limit 3)',
      {
        replacements: {
          userId: session_user,
          userGender: 'Female',
          minAge: 18,
          maxAge: 40,
        },
        type: QueryTypes.SELECT,
      },
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
      likerId: session_user,
      likedById: req.body.userId,
    });

    const newProfile = await sequelize.query(
      '(select * from "Profiles" p where p."userId" not in (select l."likedById" from "Likes" l where l."likerId" = :userId) and p."gender" = :userGender and p."age" between :minAge and :maxAge limit 1)',
      {
        replacements: {
          userId: session_user,
          userGender: 'Female',
          minAge: 18,
          maxAge: 40,
        },
        type: QueryTypes.SELECT,
      },
    );
    res.json(newProfile);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.delete('/dislike/:id', async (req, res) => {
  try {
    await Dislikes.create({
      // eslint-disable-next-line camelcase
      dislikerId: session_user,
      dislikedById: req.body.userId,
    });
    const newProfile = await sequelize.query(
      '(select * from "Profiles" p where p."userId" not in (select l."likedById" from "Likes" l where l."likerId" = :userId) and p."gender" = :userGender and p."age" between :minAge and :maxAge limit 1)',
      {
        replacements: {
          userId: session_user,
          userGender: 'Female',
          minAge: 18,
          maxAge: 40,
        },
        type: QueryTypes.SELECT,
      },
    );
    res.json(newProfile);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
module.exports = router;
