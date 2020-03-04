import express, { Router } from 'express';
import { StubCreator, ExpressAppStub, ExpressRouterStub, RouterService } from '@danielc7150/express-utils';
import { AppRouter } from '../router';
import { RouterFactory } from '../factories/router.factory';

describe('AppRouter', () => {
  let router: AppRouter, expressRouterStub: RouterService;

  beforeEach(() => {
    expressRouterStub = StubCreator.create(ExpressRouterStub);

    jest.spyOn(expressRouterStub, 'use');
    jest.spyOn(RouterFactory, 'create').mockReturnValue(StubCreator.fake('router'));

    router = new AppRouter(expressRouterStub);
  });

  it('should create the todo routes', () => {
    expect(expressRouterStub.use).toHaveBeenCalledWith('/todos', 'router');
  });
});
