const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const Bank = require('./models/bankModel');
const populateDb = require('./utils/populateDb');

const app = express();
app.use(cors());
dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('connected to db');
    populateDb();
  });

app.get('/', (req, res, next) => {
  console.log('Got it');
  res.send('Got it!');
});

app.get('/near/:lat/:lng', async (req, res, next) => {
  const { lat, lng } = req.params;
  const coords = [Number(lat), Number(lng)];

  const radius = 10 / 6378.1;
  const banks = await Bank.find({
    location: { $geoWithin: { $centerSphere: [coords, radius] } },
  });

  res.send(banks);
});

app.listen(5000, () => {
  console.log('Im up');
});
