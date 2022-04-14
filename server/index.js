const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const Bank = require('./models/bankModel');
const populateDb = require('./utils/populateDb');
const path = require('path');
const app = express();

app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../', 'client/build')));

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('connected to db');
    populateDb();
  }).catch(error => {
    console.log(error);
    console.log("Could not connect to database");
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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.redirect("/")
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Im up on port 5000' , process.env.PORT );
});
