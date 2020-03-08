import { UserService } from '../service/user.service';
import { IReq, IRes, ResponseFactory } from '@danielc7150/express-utils';
import { IUser } from '../interfaces/user.interface';

export class UserController {
  private readonly _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  public async googleAuthentication(req: IReq, res: IRes): Promise<void> {
    const googleRes: any = await this._userService.validateGoogleCredentials(req.body.authToken);

    let user: IUser | undefined = await this._userService.fetchUser(googleRes.user_id);

    if (!user) {
      user = await this._userService.createUser(googleRes.user_id, googleRes.email);
    }

    ResponseFactory.successCreate(res, {
      name: 'user',
      data: { user }
    });
  }
}
