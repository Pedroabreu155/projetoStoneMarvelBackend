import { Request, Response } from 'express';
import User from '../models/User';
import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';

export const createUser = async (request: Request, response: Response) => {
  const { name, email, password, favoriteComics, favoriteCharacters } =
    request.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await getRepository(User).save({
    name,
    email,
    password: hashedPassword,
    favoriteComics,
    favoriteCharacters,
  });

  user.password = '';

  response.json(user);
};

export const updateUserById = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { name, email, password } = request.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await getRepository(User).update(id, {
    name,
    email,
    password: hashedPassword,
  });

  if (user.affected === 1) {
    const updatedUserCredentials = await getRepository(User).findOne(id);
    const result = {
      message: 'User updated!',
      credentials: {
        name: updatedUserCredentials?.name,
        email: updatedUserCredentials?.email,
      },
    };
    return response.json(result);
  }

  return response.status(404).json({ message: 'User not updated' });
};

export const deleteUserById = async (request: Request, response: Response) => {
  const { id } = request.params;

  const user = await getRepository(User).delete(id);
  if (user.affected === 1) {
    return response.json({ message: 'User Deleted!' });
  }

  return response.status(404).json({ message: 'User not updated' });
};

export const getUsers = async (request: Request, response: Response) => {
  const users = await getRepository(User).find();

  response.json(users);
};

export const getUserById = async (request: Request, response: Response) => {
  const id = request.params;

  const user = await getRepository(User).findOne({
    where: id,
  });

  const result = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
  };

  response.json(result);
};

export const updateFavoritesComicsByUserId = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const user = await getRepository(User).update(id, request.body);

  if (user.affected === 1) {
    const updatedFavoriteComic = await getRepository(User).findOne(id);
    return response.json(updatedFavoriteComic);
  }

  return response.status(404).json({ message: 'FavoriteComic not updated' });
};

export const updateFavoritesCharactersByUserId = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const user = await getRepository(User).update(id, request.body);

  if (user.affected === 1) {
    const updatedFavoriteCharacters = await getRepository(User).findOne(id);
    return response.json(updatedFavoriteCharacters);
  }

  return response.status(404).json({ message: 'FavoriteComic not updated' });
};

export const getFavoritesComicsByUserId = async (
  request: Request,
  response: Response
) => {
  const id = request.params;

  const user = await getRepository(User).findOne({
    where: id,
  });

  const result = {
    favoriteComics: user?.favoriteComics,
  };

  response.json(result);
};

export const getFavoritesCharactersByUserId = async (
  request: Request,
  response: Response
) => {
  const id = request.params;

  const user = await getRepository(User).findOne({
    where: id,
  });

  const result = {
    favoriteCharacters: user?.favoriteCharacters,
  };

  response.json(result);
};
