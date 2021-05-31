import { Router, Request, Response } from 'express';
import {
  createUser,
  findUserById,
  findUsers,
} from '../controllers/UserController';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
});

routes.post('/users', createUser);
routes.get('/users', findUsers);
routes.get('/users/:id', findUserById);

export default routes;
