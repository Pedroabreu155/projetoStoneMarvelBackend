import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import * as bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await getRepository(User).findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return response.status(401).json({ message: 'Authenticaton Failed!' });
  }

  bcrypt.compare(password, user.password, (error, result) => {
    if (error) {
      return response.status(401).json({ message: 'Authenticaton Failed!' });
    } else if (result) {
      const userId = user.id;
      const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
        expiresIn: 60 * 60, //this is equal 1hour '1h'
      });

      return response
        .status(200)
        .json({ message: 'Authenticated!', name: user.name, id: user.id, token });
    } else {
      return response.status(401).json({ message: 'Authenticaton Failed!' });
    }
  });
};
