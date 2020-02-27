import express from 'express';
import { RouterFactory } from './factories/router.factory';

export class App {
  public app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
    app.use(express.json());
    this._initialiseRoutes();
  }

  private _initialiseRoutes(): void {
    this.app.use('/api/v1', RouterFactory.create());
  }
}
