import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Server running properly 🚀');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});