import express from 'express';
import { RouterFactory } from './factories/router.factory';
import { INext, IRes, ResponseFactory } from '@danielc7150/express-utils/lib';
import { ErrorController } from './config/errors/error.controller';
import { ErrorControllerFactory } from './factories/error-controller.factory';

export class App {
  public app: express.Application;
  private _errorController: ErrorController;

  constructor(app: express.Application) {
    this.app = app;
    this._errorController = ErrorControllerFactory.create(app);
    app.use(express.json());
    this._initialiseRoutes();
  }

  private _initialiseRoutes(): void {
    this.app.use('/api/v1', RouterFactory.create());
    this._errorController.handleErrors();
  }
}
