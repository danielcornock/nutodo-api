import express from 'express';
import { ErrorController } from '../config/errors/error.controller';

export class ErrorControllerFactory {
  static create(app: express.Application): ErrorController {
    return new ErrorController(app);
  }
}
