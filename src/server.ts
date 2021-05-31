import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

app.listen(8080, () => console.log('Server Running on port 8080'));
