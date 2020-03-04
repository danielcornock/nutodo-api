import { GlobalMiddleware } from './global-middleware';
import express from 'express';
import { ExpressAppStub, StubCreator } from '@danielc7150/express-utils';

describe('GlobalMiddleware', () => {
  let globalMiddleware: GlobalMiddleware, expressApp: express.Application;

  beforeEach(() => {
    expressApp = StubCreator.create(ExpressAppStub);
    globalMiddleware = new GlobalMiddleware(expressApp);
  });

  it('should initialise CORS', () => {
    expect(expressApp.use).toHaveBeenCalledWith(expect.any(Function));
  });
});
