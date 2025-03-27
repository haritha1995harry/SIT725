const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Data = require('./models/dataModel');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/sit725db');

app.get('/api/data', async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

app.post('/api/data', async (req, res) => {
  const { name, message } = req.body;
  const newData = new Data({ name, message });
  await newData.save();
  res.json({ message: 'Saved!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
