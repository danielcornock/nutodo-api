import {
  ExpressAppStub,
  InternalServerErrorException,
  Logger,
  ResponseFactory,
  ResponseFactoryStub,
  StubCreator,
} from '@danielc7150/express-utils';
import express from 'express';

import { ErrorController } from './error.controller';

describe('ErrorController', () => {
  let errorController: ErrorController, expressApp: express.Application, responseFactory: ResponseFactory;

  beforeEach(() => {
    expressApp = StubCreator.create(ExpressAppStub);
    responseFactory = StubCreator.create(ResponseFactoryStub);
    jest.spyOn(ResponseFactory, 'create').mockReturnValue(responseFactory);
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
        expect(responseFactory.error).toHaveBeenCalledWith('res', { statusCode: 404 });
      });
    });

    describe('when a non-operational error is thrown', () => {
      beforeEach(() => {
        jest.spyOn(Logger, 'console').mockImplementation(() => null);
        (responseFactory.error as jest.Mock).mockClear();
        errorCallback('error', 'req', 'res', 'next');
      });

      it('should throw an internal server error exception', () => {
        const responseArgs: Array<any> = (responseFactory.error as jest.Mock).mock.calls[0];

        expect(responseArgs[0]).toBe('res');
        expect(responseArgs[1]).toBeInstanceOf(InternalServerErrorException);
      });

      it('should log the error', () => {
        expect(Logger.console).toHaveBeenCalledWith('error');
      });
    });
  });
});
