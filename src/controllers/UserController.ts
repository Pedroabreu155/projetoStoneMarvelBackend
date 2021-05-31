import { Request, Response } from 'express';
import User from '../models/User';
import * as bcrypt from 'bcrypt';
import { getConnection, getRepository } from 'typeorm';

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

  response.json(user);
};

export const findUsers = async (request: Request, response: Response) => {
  const users = await getRepository(User).find();

  response.json(users);
};

export const findUserById = async (request: Request, response: Response) => {
  const id = request.params;

  const user = await getRepository(User).findOne({
    where: id,
  });

  response.json(user);
};

export const getFavoritesByUserId = async (
  request: Request,
  response: Response
) => {
  const id = request.params;

  const user = await getRepository(User).findOne({
    where: id,
  });

  const result = {
    favoriteCharacters: user?.favoriteCharacters,
    favoriteComics: user?.favoriteComics,
  };

  response.json(result);
};
