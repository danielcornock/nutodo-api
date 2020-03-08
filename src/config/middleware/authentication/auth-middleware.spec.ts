import { AuthMiddleware } from './auth-middleware';
import { UserServiceStub } from '../../../collections/users/service/user.service.stub';
import { StubCreator, IReq, IRes, ReqStub, ResStub, UnauthorisedException } from '@danielc7150/express-utils';
import { UserService } from '../../../collections/users/service/user.service';

describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware, userService: UserService, req: IReq, res: IRes, next: jest.Mock;

  beforeEach(() => {
    req = StubCreator.create(ReqStub);
    res = StubCreator.create(ResStub);
    next = jest.fn();
    userService = StubCreator.create(UserServiceStub);
    authMiddleware = new AuthMiddleware(userService);
  });

  describe('when authenticating', () => {
    describe('when an authentication token is provided', () => {
      beforeEach(() => {
        req.headers = { authorization: 'token' };
      });

      describe('when the token is valid', () => {
        beforeEach(() => {
          (userService.validateGoogleCredentials as jest.Mock).mockResolvedValue({ user_id: 'user_id' });
        });

        describe('when there is a matching user', () => {
          beforeEach(async () => {
            (userService.fetchUser as jest.Mock).mockResolvedValue('user');
            await authMiddleware.authenticate(req, res, next);
          });

          it('should validate the user credentials', () => {
            expect(userService.validateGoogleCredentials).toHaveBeenCalledWith('token');
          });

          it('should fetch the user', () => {
            expect(userService.fetchUser).toHaveBeenCalledWith('user_id');
          });

          it('should attach the user to the request object', () => {
            expect((req as any).user).toBe('user');
          });

          it('should continue to the next middleware', () => {
            expect(next).toHaveBeenCalledWith();
          });
        });

        describe('when there is no matching user', () => {
          beforeEach(async () => {
            (userService.fetchUser as jest.Mock).mockResolvedValue(undefined);
            await authMiddleware.authenticate(req, res, next);
          });

          it('should throw an unauthorised exception', () => {
            expect(next.mock.calls[0][0]).toBeInstanceOf(UnauthorisedException);
          });
        });
      });
    });

    describe('when no authentication token is provided', () => {
      beforeEach(() => {
        req.headers = {};
        authMiddleware.authenticate(req, res, next);
      });

      it('should throw an unauthorised exception', () => {
        expect(next.mock.calls[0][0]).toBeInstanceOf(UnauthorisedException);
      });
    });
  });
});
