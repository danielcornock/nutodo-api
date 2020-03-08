import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { IReq, IRes, ExpressRouterStub, StubCreator, ReqStub, ResStub, ResponseFactory } from '@danielc7150/express-utils';
import { UserServiceStub } from '../service/user.service.stub';

describe('UserController', () => {
  let userController: UserController, userService: UserService, req: IReq, res: IRes;

  beforeEach(() => {
    userService = StubCreator.create(UserServiceStub);
    userController = new UserController(userService);

    jest.spyOn(ResponseFactory, 'successCreate');

    req = StubCreator.create(ReqStub);
    res = StubCreator.create(ResStub);
  });

  describe('when signing in with google', () => {
    beforeEach(() => {
      (userService.validateGoogleCredentials as jest.Mock).mockResolvedValue({ user_id: 'user_id', email: 'email' });
      req.body.authToken = 'authToken';
    });

    describe('when a user already exists', () => {
      beforeEach(() => {
        (userService.fetchUser as jest.Mock).mockResolvedValue('user');
        userController.googleAuthentication(req, res);
      });

      it('should validate the user credentials', () => {
        expect(userService.validateGoogleCredentials).toHaveBeenCalledWith('authToken');
      });

      it('should fetch the user details', () => {
        expect(userService.fetchUser).toHaveBeenCalledWith('user_id');
      });

      it('should respond with the user', () => {
        // TODO - Find out why passing 'res' into here does not pass
        expect(ResponseFactory.successCreate).toHaveBeenCalledWith(expect.any(Object), {
          name: 'user',
          data: { user: 'user' }
        });
      });
    });
  });
});
