const express = require('express');

const mongoose = require('mongoose');
require('dotenv').config();

const game1Routes = require('./routes/game1_rankRoutes.js');
// const sociallinkRoutes = require('./routes/SocialLinkRoutes');
// const skillRoutes = require('./routes/SkillRoutes');
// const tourRoutes = require('./routes/TourRoutes');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use('/api_game1', game1Routes);
// app.use('/api_sociallink', sociallinkRoutes);
// app.use('/api_skill', skillRoutes);
// app.use('/api_tour', tourRoutes);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
