const express = require('express');
const { Op, QueryTypes } = require('sequelize');
const { Profile, sequelize } = require('../db/models');

const router = express.Router();
const user_id_session = 1;

router.get('/', async (req, res) => {
  try {
    // const profile = await Profile.findOne({
    //   where: {
    //     id: 1,
    //   },
    // });

    const newProfiles = await sequelize.query(
      '(select * from "Profiles" p where p."userId" not in (select l."likedById" from "Likes" l where l."likerId" = :userId) and p."gender" = :userGender and p."age" between :minAge and :maxAge)',
      {
        replacements: {
          userId: user_id_session,
          userGender: 'Male',
          minAge: 25,
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

module.exports = router;
