import { Router, Request, Response } from 'express';
import {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
  getFavoritesComicsByUserId,
  getFavoritesCharactersByUserId,
  updateFavoritesComicsByUserId,
  updateFavoritesCharactersByUserId,
} from '../controllers/UserController';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
});

routes.post('/users', createUser);
routes.get('/users', getUsers);
routes.get('/users/:id', getUserById);
routes.put('/users/edit-user/:id', updateUserById);
routes.delete('/users/delete-user/:id', deleteUserById);
routes.get('/users/favorites-comics/:id', getFavoritesComicsByUserId);
routes.get('/users/favorites-characters/:id', getFavoritesCharactersByUserId);
routes.put('/users/edit-favorite-comics/:id', updateFavoritesComicsByUserId);
routes.put('/users/edit-favorite-characters/:id', updateFavoritesCharactersByUserId);

export default routes;
