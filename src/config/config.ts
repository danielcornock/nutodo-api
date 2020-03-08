import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

export const port: string = process.env.PORT as string;

export const localUrl: string = 'http://localhost:3400';

export const env: string = process.env.ENV as string;

export const getWorkingUrl: () => string = () => {
  return localUrl;
};
