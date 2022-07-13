const express = require('express');
const cors = require('cors');

const data = require('./dados.json');

const app = express();

app.use(cors());

app.get('/pages', (req, res) => {
  const { slug } = req.query;
  let newData = data;
  if (slug) {
    newData = data.filter((el) => {
      const title = String(el.title).replace(/\s/gi, '-').toLocaleLowerCase();
      if (slug === title) return el;
    });
  }
  return res.json(newData);
});

app.listen(3001, () => {
  console.log('Server is running in port 3001');
});
