import { Router, Request, Response } from 'express';
import { login } from '../controllers/AuthController';
import {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  resetPassword,
  deleteUserById,
  getFavoritesComicsByUserId,
  getFavoritesCharactersByUserId,
  updateFavoritesComicsByUserId,
  updateFavoritesCharactersByUserId,
} from '../controllers/UserController';

import { auth } from '../middlewares/authMiddleware';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
});

routes.post('/signup', createUser);
routes.get('/users', getUsers);
routes.post('/login', login);
routes.post('/reset-password', resetPassword);

//Authenticated Routes//
routes.get('/users/:id', auth, getUserById);
routes.put('/users/edit-user/:id', auth, updateUserById);
routes.delete('/users/delete-user/:id', auth, deleteUserById);
routes.get('/users/favorites-comics/:id', auth, getFavoritesComicsByUserId);
routes.get('/users/favorites-characters/:id', auth, getFavoritesCharactersByUserId);
routes.put('/users/edit-favorite-comics/:id', auth, updateFavoritesComicsByUserId);
routes.put(
  '/users/edit-favorite-characters/:id',
  updateFavoritesCharactersByUserId
);

export default routes;
