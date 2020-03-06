import { UserService } from './user.service';
import { DatabaseConnection, DatabaseConnectionStub, StubCreator, UnauthorisedException, KnexStub } from '@danielc7150/express-utils';
import Axios from 'axios';
import { OAuthCallbacks } from '../constants/oauth-callbacks.constant';
import Knex = require('knex');
import { IUser } from '../interfaces/user.interface';

describe('UserService', () => {
  let userService: UserService, db: DatabaseConnection, query: jest.Mock, queryParams: Knex;

  beforeEach(() => {
    db = StubCreator.create(DatabaseConnectionStub);
    query = StubCreator.fake(db.query);
    queryParams = StubCreator.create(KnexStub);
    query.mockReturnValue(queryParams);
    userService = new UserService(db);
  });

  describe('when validating google user credentials', () => {
    let result: any, axiosSpy: any;

    beforeEach(() => {
      axiosSpy = jest.spyOn(Axios, 'get');
    });

    describe('when the credentials can be validated', () => {
      beforeEach(() => {
        axiosSpy.mockResolvedValue({ data: 'data' });

        result = userService.validateGoogleCredentials('token');
      });

      it('should attempt to validate the google auth token', () => {
        expect(Axios.get).toHaveBeenCalledWith(OAuthCallbacks.GOOGLE + 'token');
      });

      it('should return the decrypted information', async () => {
        expect(await result).toBe('data');
      });
    });

    describe('when the credentials are invalid', () => {
      beforeEach(() => {
        axiosSpy.mockRejectedValue('err');

        result = userService.validateGoogleCredentials('token');
      });

      it('should throw an unauthorised error', () => {
        result.catch((e: any) => {
          expect(e).toBeInstanceOf(UnauthorisedException);
        });
      });
    });
  });

  describe('when fetching a user', () => {
    let result: IUser | undefined;

    beforeEach(async () => {
      (queryParams.where as jest.Mock).mockReturnThis();
      (queryParams.first as jest.Mock).mockReturnValue('user');

      result = await userService.fetchUser('userId');
    });

    it('should build the query', () => {
      expect(query).toHaveBeenCalledWith('users');
      expect(queryParams.where).toHaveBeenCalledWith({ id: 'userId' });
      expect(queryParams.first).toHaveBeenCalledWith();
    });

    it('should return the found user', () => {
      expect(result).toBe('user');
    });
  });

  describe('when creating a user', () => {
    let result: IUser;

    beforeEach(async () => {
      (queryParams.insert as jest.Mock).mockReturnThis();
      (queryParams.returning as jest.Mock).mockReturnValue(['user']);

      result = await userService.createUser('id', 'email');
    });

    it('should build the query', () => {
      expect(query).toHaveBeenCalledWith('users');
      expect(queryParams.insert).toHaveBeenCalledWith({ id: 'id', email: 'email' });
      expect(queryParams.returning).toHaveBeenCalledWith('*');
    });

    it('should return the found user', () => {
      expect(result).toBe('user');
    });
  });
});
