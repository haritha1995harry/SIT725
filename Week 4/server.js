const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = 3000;
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'task4db';

let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(MONGO_URL, { useUnifiedTopology: true })
  .then(client => {
    console.log('✅ Connected to MongoDB');
    db = client.db(DB_NAME);
  })
  .catch(error => console.error('❌ MongoDB connection failed:', error));

app.post('/api/data', (req, res) => {
  const data = req.body;
  db.collection('messages').insertOne(data)
    .then(result => res.json({ success: true }))
    .catch(error => res.status(500).json({ error }));
});

app.get('/api/data', (req, res) => {
  db.collection('messages').find().toArray()
    .then(items => res.json(items))
    .catch(error => res.status(500).json({ error }));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
