const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');
const populateDb = require('./utils/populateDb');

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('Database connection has been established!');
    populateDb();
  })
  .catch((error) => {
    console.log(error);
    console.log('Could not connect to database');
  });

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log('Im up on port', process.env.PORT);
});
