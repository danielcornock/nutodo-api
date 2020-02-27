import { App } from '../app';
import express, { Router } from 'express';
import { StubCreator, ExpressAppStub } from '@danielc7150/express-utils/lib';
import { RouterFactory } from '../factories/router.factory';

describe('App', () => {
  let application: App, expressApp: express.Application;

  beforeEach(() => {
    const router: Router = StubCreator.fake('router');
    expressApp = StubCreator.create(ExpressAppStub);

    jest.spyOn(RouterFactory, 'create').mockReturnValue(router);
    jest.spyOn(express, 'json').mockReturnValue(StubCreator.fake('bodyParser'));

    application = new App(expressApp);
  });

  it('should parse the body of incoming requests', () => {
    expect(express.json).toHaveBeenCalledWith();
    expect(expressApp.use).toHaveBeenCalledWith('bodyParser');
  });

  it('should create the base api url', () => {
    expect(expressApp.use).toHaveBeenCalledWith('/api/v1', 'router');
  });

  it('should generate the routes', () => {
    expect(RouterFactory.create).toHaveBeenCalledWith();
  });
});
