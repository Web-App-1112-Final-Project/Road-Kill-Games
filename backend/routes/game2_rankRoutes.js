const mongoose = require('mongoose');
const { Router } = require('express');

const game2Schema = new mongoose.Schema({
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

const Game2Model = mongoose.model('game2_rank', game2Schema);

const getGame2Rank = async (req, res) => {
  const tasks = await Game2Model.find({});
  // console.log(tasks);
  res.send(tasks);
};

const saveGame2Rank = (req, res) => {
  const { name, score } = req.body;
  // console.log(name);
  Game2Model.create({ name, score })
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

router.get('/get', getGame2Rank);
router.post('/save', saveGame2Rank);
module.exports = router;