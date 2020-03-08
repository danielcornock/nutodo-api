import { BaseRoutes, RouterService } from '@danielc7150/express-utils';
import { RouterFactory } from './factories/router.factory';

export class AppRouter extends BaseRoutes<void> {
  constructor(router: RouterService) {
    super(router);
    this._setRoutes();
  }

  private _setRoutes(): void {
    this.router.use('/todos', RouterFactory.create('todo'));
    this.router.use('/auth', RouterFactory.create('user'));
  }
}
