import { App } from '../app';
import express, { Router } from 'express';
import { StubCreator, ExpressAppStub } from '@danielc7150/express-utils';
import { RouterFactory } from '../factories/router.factory';
import { ErrorControllerFactory } from '../factories/error-controller.factory';
import { ErrorController } from '../config/errors/error.controller';
import { ErrorControllerStub } from '../config/errors/error.controller.stub';
import { GlobalMiddleware } from '../config/middleware/global/global-middleware';

describe('App', () => {
  let application: App, expressApp: express.Application, errorController: ErrorController;

  beforeEach(() => {
    const router: Router = StubCreator.fake('router');
    errorController = StubCreator.create(ErrorControllerStub);
    expressApp = StubCreator.create(ExpressAppStub);

    jest.spyOn(ErrorControllerFactory, 'create').mockReturnValue(errorController);
    jest.spyOn(RouterFactory, 'create').mockReturnValue(router);
    jest.spyOn(GlobalMiddleware, 'create');

    application = new App(expressApp);
  });

  it('should initialise the global app middleware', () => {
    expect(GlobalMiddleware.create).toHaveBeenCalledWith(expressApp);
  });

  it('should create the base api url', () => {
    expect(expressApp.use).toHaveBeenCalledWith('/api/v1', 'router');
  });

  it('should generate the routes', () => {
    expect(RouterFactory.create).toHaveBeenCalledWith();
  });

  it('should handle errors thrown within the app', () => {
    expect(errorController.handleErrors).toHaveBeenCalledWith();
  });
});
