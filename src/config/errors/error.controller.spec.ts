import express from 'express';
import { ErrorController } from './error.controller';
import { ExpressAppStub, StubCreator, ResponseFactory, Logger, InternalServerErrorException, HttpException } from '@danielc7150/express-utils/lib';

describe('ErrorController', () => {
  let errorController: ErrorController, expressApp: express.Application;

  beforeEach(() => {
    expressApp = StubCreator.create(ExpressAppStub);
    jest.spyOn(ResponseFactory, 'error').mockImplementation(() => null);
    errorController = new ErrorController(expressApp);
  });

  describe('when handling the errors', () => {
    let errorCallback: jest.Mock;

    beforeEach(() => {
      errorController.handleErrors();
      errorCallback = (expressApp.use as jest.Mock).mock.calls[0][0];
    });

    it('should catch errors in the app', () => {
      expect(expressApp.use).toHaveBeenCalledWith(expect.any(Function));
    });

    describe('when an operational error is thrown', () => {
      beforeEach(() => {
        errorCallback({ statusCode: 404 }, 'req', 'res', 'next');
      });

      it('should create a response with the thrown error', () => {
        expect(ResponseFactory.error).toHaveBeenCalledWith('res', { statusCode: 404 });
      });
    });

    describe('when a non-operational error is thrown', () => {
      beforeEach(() => {
        jest.spyOn(Logger, 'console').mockImplementation(() => null);
        (ResponseFactory.error as jest.Mock).mockClear();
        errorCallback('error', 'req', 'res', 'next');
      });

      it('should throw an internal server error exception', () => {
        const responseArgs: Array<any> = (ResponseFactory.error as jest.Mock).mock.calls[0];

        expect(responseArgs[0]).toBe('res');
        expect(responseArgs[1]).toBeInstanceOf(Error);
      });

      it('should log the error', () => {
        expect(Logger.console).toHaveBeenCalledWith('error');
      });
    });
  });
});
