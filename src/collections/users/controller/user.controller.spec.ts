import { IReq, IRes, ReqStub, ResponseFactory, ResponseFactoryStub, ResStub, StubCreator } from '@danielc7150/express-utils';

import { UserService } from '../service/user.service';
import { UserServiceStub } from '../service/user.service.stub';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController, userService: UserService, req: IReq, res: IRes, responseFactory: ResponseFactory;

  beforeEach(() => {
    userService = StubCreator.create(UserServiceStub);
    responseFactory = StubCreator.create(ResponseFactoryStub);
    jest.spyOn(ResponseFactory, 'create').mockReturnValue(responseFactory);

    userController = new UserController(userService);
    req = StubCreator.create(ReqStub);
    res = StubCreator.create(ResStub);
  });

  describe('when signing in with google', () => {
    beforeEach(() => {
      (userService.validateGoogleCredentials as jest.Mock).mockResolvedValue({ user_id: 'user_id', email: 'email' });
      req.body.authToken = 'authToken';
    });

    describe('when a user already exists', () => {
      beforeEach(async () => {
        (userService.fetchUser as jest.Mock).mockResolvedValue('user');
        await userController.googleAuthentication(req, res);
      });

      it('should validate the user credentials', () => {
        expect(userService.validateGoogleCredentials).toHaveBeenCalledWith('authToken');
      });

      it('should fetch the user details', () => {
        expect(userService.fetchUser).toHaveBeenCalledWith('user_id');
      });

      it('should respond with the user', () => {
        expect(responseFactory.successCreate).toHaveBeenCalledWith(res, {
          name: 'user',
          data: { user: 'user' }
        });
      });
    });

    describe('when it is a new user', () => {
      beforeEach(async () => {
        (userService.fetchUser as jest.Mock).mockResolvedValue(undefined);
        (userService.createUser as jest.Mock).mockResolvedValue('user');
        await userController.googleAuthentication(req, res);
      });

      it('should create a new user', () => {
        expect(userService.createUser).toHaveBeenCalledWith('user_id', 'email');
      });

      it('should respond with the user', () => {
        expect(responseFactory.successCreate).toHaveBeenCalledWith(res, {
          name: 'user',
          data: { user: 'user' }
        });
      });
    });
  });
});
