import express, { Router } from 'express';
import { BaseRoutes } from '@danielc7150/express-utils/lib';
import { RouterFactory } from './factories/router.factory';

export class AppRouter extends BaseRoutes {
  constructor(router: Router) {
    super(router);
    this._setRoutes();
  }

  private _setRoutes(): void {
    this.router.use('/todos', RouterFactory.create('todo'));
  }
}
