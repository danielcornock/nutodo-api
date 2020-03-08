import express from 'express';
import { RouterFactory } from './factories/router.factory';
import { ErrorController } from './config/errors/error.controller';
import { ErrorControllerFactory } from './factories/error-controller.factory';
import { GlobalMiddleware } from './config/middleware/global-middleware';

export class App {
  public app: express.Application;
  private _errorController: ErrorController;

  constructor(app: express.Application) {
    this.app = app;
    this._errorController = ErrorControllerFactory.create(app);
    GlobalMiddleware.create(app);
    this._initialiseRoutes();
  }

  private _initialiseRoutes(): void {
    this.app.use('/api/v1', RouterFactory.create());
    this._errorController.handleErrors();
  }
}
