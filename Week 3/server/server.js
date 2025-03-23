const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('client'));

const compliments = [
  "you are amazing!",
  "you have a brilliant mind!",
  "you bring positivity wherever you go!",
  "you’re a great problem solver!",
  "you shine bright like a diamond!"
];

app.post('/api/compliment', (req, res) => {
  const { name } = req.body;
  const random = compliments[Math.floor(Math.random() * compliments.length)];
  const message = `Hello ${name}, ${random}`;
  res.json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
