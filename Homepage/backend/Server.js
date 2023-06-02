const express = require('express');

const mongoose = require('mongoose');
require('dotenv').config();

const game1Routes = require('./routes/game1_rankRoutes.js');
const game2Routes = require('./routes/game2_rankRoutes.js');
const game3Routes = require('./routes/game3_rankRoutes.js');
// const skillRoutes = require('./routes/SkillRoutes');
// const tourRoutes = require('./routes/TourRoutes');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT | 4000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use('/api_game1', game1Routes);
app.use('/api_game2', game2Routes);
app.use('/api_game3', game3Routes);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
