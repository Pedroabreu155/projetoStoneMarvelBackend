import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express';
import './database';
import routes from './routes/routes';

dotenv.config()

const app = express();

const port = process.env.PORT

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Server Running on port: ${port}`));
