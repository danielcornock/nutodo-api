import { BaseRoutes, RouterService, IReq, IRes, INext } from '@danielc7150/express-utils';
import { AuthMiddleware } from '../middleware/authentication/auth-middleware';

export abstract class GuardedRoutes<T> extends BaseRoutes<T> {
  private readonly _authMiddleware: AuthMiddleware;

  constructor(routerService: RouterService, controller: T, authMiddleware: AuthMiddleware) {
    super(routerService, controller);
    this._authMiddleware = authMiddleware;
    this.router.middleware((req: IReq, res: IRes, next: INext) => this._authMiddleware.authenticate(req, res, next));
  }
}
