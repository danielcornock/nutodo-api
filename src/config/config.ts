import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

export const port: string = process.env.PORT as string;
