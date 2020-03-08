import { BaseRoutes, RouterService, IReq, IRes } from '@danielc7150/express-utils';
import { UserController } from '../controller/user.controller';

export class UserRoutes extends BaseRoutes<UserController> {
  constructor(router: RouterService, userController: UserController) {
    super(router, userController);
    this._assignRoutes();
  }

  private _assignRoutes(): void {
    this.router.post('/google', (req: IReq, res: IRes) => this.controller.googleAuthentication(req, res));
  }
}
