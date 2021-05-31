import express from 'express';
import './database';
import routes from './routes/routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(8080, () => console.log('Server Running on port 8080'));
