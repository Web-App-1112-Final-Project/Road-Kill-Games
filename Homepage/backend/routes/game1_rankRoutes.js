const mongoose = require('mongoose');
const { Router } = require('express');

const game1Schema = new mongoose.Schema({
  name: {
    type: String,
  },
  score: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Game1Model = mongoose.model('game1_rank', game1Schema);

const getGame1Rank = async (req, res) => {
  const tasks = await Game1Model.find({});
  // console.log(tasks);
  res.send(tasks);
};

const saveGame1Rank = (req, res) => {
  const { name, score } = req.body;
  // console.log(name);
  Game1Model.create({ name, score })
    .then((data) => {
      console.log('Saved Successfully...');
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: 'Something went wrong!' });
    });
};


const router = Router();

router.get('/get', getGame1Rank);
router.post('/save', saveGame1Rank);
module.exports = router;