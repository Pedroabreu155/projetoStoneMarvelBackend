import express from 'express';
import './database';
import routes from './routes/routes';
import { port } from './configs';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Server Running on port: ${port}`));
