import { INext, IReq, IRes, UnauthorisedException } from '@danielc7150/express-utils';
import { IUser } from 'src/collections/users/interfaces/user.interface';
import { UserService } from 'src/collections/users/service/user.service';

export class AuthMiddleware {
  private readonly _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  public async authenticate(req: IReq, _res: IRes, next: INext): Promise<void> {
    const token: string | undefined = req.headers.authorization;

    if (!token) {
      return next(new UnauthorisedException());
    }

    const googleRes: any = await this._userService.validateGoogleCredentials(token);

    const user: IUser | undefined = await this._userService.fetchUser(googleRes.user_id);

    if (!user) {
      return next(new UnauthorisedException('This user no longer exists!'));
    }

    req.user = user;

    next();
  }
}
