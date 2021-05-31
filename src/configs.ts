import { config } from 'dotenv';
import assert from 'assert';

config();

const { PORT } = process.env;

assert(PORT, 'PORT required');

export const port = PORT;
