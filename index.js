const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// apply library
app.use(
  cors({
    origin: process.env.BASE_URL || 'http://localhost:3000', // port fe
    credentials: true, // allow call api
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
