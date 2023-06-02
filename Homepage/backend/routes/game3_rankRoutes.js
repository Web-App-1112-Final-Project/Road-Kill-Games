const mongoose = require('mongoose');
const { Router } = require('express');

const game3Schema = new mongoose.Schema({
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

const Game3Model = mongoose.model('game3_rank', game3Schema);

const getGame3Rank = async (req, res) => {
  const tasks = await Game3Model.find({});
  // console.log(tasks);
  res.send(tasks);
};

const saveGame3Rank = (req, res) => {
  const { name, score } = req.body;
  // console.log(name);
  Game3Model.create({ name, score })
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

router.get('/get', getGame3Rank);
router.post('/save', saveGame3Rank);
module.exports = router;