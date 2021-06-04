import { Request, Response } from 'express';
import User from '../models/User';
import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
const jwt = require('jsonwebtoken');
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';

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

  const userId = user.id;
  const token = await jwt.sign({ userId }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60, //this is equal 1hour '1h'
  });

  const createdUser = {
    id: userId,
    name: user.name,
    email: user.email,
  };

  response.json({ createdUser, token });
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

export const resetPassword = async (request: Request, response: Response) => {
  const { email } = request.body;

  const user = await getRepository(User).findOne({
    where: {
      email,
    },
  });

  if (user) {
    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const newPassword = crypto.randomBytes(4).toString('hex'); //creating a random new string

    transport
      .sendMail({
        from: 'MasterComics <e377b16e3f-90c160@inbox.mailtrap.io>',
        to: email,
        subject: 'Sua nova senha para acessar o App',
        html: `
          <h1>Sua nova senha chegou!</h1>
          <br/>
          <p>Sua senha é:<b> ${newPassword}</b></p>
          <br/>
          <p>Após acessar o aplicativo, sugerimos que mude sua senha!</p>
          <br/>
          <p>Link para o app: <a href="https://master-comics.herokuapp.com/">Master Comics</a></p>
        `,
      })
      .then(async () => {
        const password = await bcrypt.hash(newPassword, 10);

        getRepository(User).update(user.id, {
          password,
        });
      })
      .then(() => {
        return response.status(200).json({ message: 'Email sended!' });
      })
      .catch(() => {
        return response.status(404).json({ message: 'fail to send Email!' });
      });
  } else {
    response.status(404).json({ message: 'User not found!' });
  }
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
  users.map(user => {
    user.password = '';
  });
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
    const result = {
      message: 'Favorites updated!',
      updated: {
        comics: updatedFavoriteComic?.favoriteComics,
      },
    };
    return response.json(result);
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

    const result = {
      message: 'Favorites updated!',
      updated: {
        characters: updatedFavoriteCharacters?.favoriteCharacters,
      },
    };

    return response.json(result);
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
