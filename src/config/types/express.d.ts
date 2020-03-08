import express from 'express';
import { IUser } from 'src/collections/users/interfaces/user.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user: IUser;
  }
}
