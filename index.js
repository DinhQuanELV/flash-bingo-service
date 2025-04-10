const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const db = require('./src/config/db');
const routes = require('./src/routes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// connect database
db.connect();

// apply library
app.use(
  cors({
    origin: process.env.BASE_URL || 'http://localhost:3000', // port fe
    credentials: true, // allow call api
  })
);
app.use(express.json());
app.use(morgan('dev'));

// handle routes
routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
