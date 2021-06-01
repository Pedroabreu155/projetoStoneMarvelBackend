import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

export const auth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authenticateHeader = request.headers.authorization;

  if (!authenticateHeader) {
    return response.status(401).json({ message: 'Request without Token!' });
  }

  //Auth header return this message: Bearer tokenjksfbsaudfbyhd
  //we split just to catch only token
  const [, token] = authenticateHeader.split(' ');

  try {
    await jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid Token' });
  }
};
