import './config/env'
import 'reflect-metadata'
import express from 'express';
import './database/index';
import routes from './routes/routes';

const app = express();

const port = process.env.PORT

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Server Running on port: ${port}`));
