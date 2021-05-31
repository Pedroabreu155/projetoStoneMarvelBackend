import { Router, Request, Response } from 'express';
import {
  createUser,
  getUserById,
  getUsers,
  getFavoritesComicsByUserId,
  getFavoritesCharactersByUserId,
  addFavoritesComicsByUserId,
  addFavoritesCharactersByUserId,
} from '../controllers/UserController';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
});

routes.post('/users', createUser);
routes.get('/users', getUsers);
routes.get('/users/:id', getUserById);
routes.get('/users/favorites-comics/:id', getFavoritesComicsByUserId);
routes.get('/users/favorites-characters/:id', getFavoritesCharactersByUserId);
routes.put('/users/edit-favorite-comics/:id', addFavoritesComicsByUserId);
routes.put('/users/edit-favorite-characters/:id', addFavoritesCharactersByUserId);

export default routes;
