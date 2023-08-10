const express = require('express');
const { UserInfo } = require('../db/models');

const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
     
    const 

      res.json(user);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    const newPost = await Post.create(req.body);
    res.json(newPost);
  });

router.delete('/:id', async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;

