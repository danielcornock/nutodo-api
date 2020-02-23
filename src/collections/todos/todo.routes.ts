import { BaseRoutes } from '@danielc7150/express-utils/lib';
import { Router } from 'express';

export class TodoRoutes extends BaseRoutes {
  constructor(router: Router) {
    super(router);
    this._assignRoutes();
  }

  private _assignRoutes(): void {
    this.router.get('/', (_req, res) => {
      res.send('todo');
    });
  }
}
