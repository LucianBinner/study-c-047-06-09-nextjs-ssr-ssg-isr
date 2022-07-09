const express = require('express');
const cors = require('cors');

const data = require('./dados.json');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  return res.json(data);
});

app.listen(3001, () => {
  console.log('Server is running in port 3001');
});
