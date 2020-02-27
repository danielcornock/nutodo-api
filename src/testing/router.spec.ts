import express, { Router } from 'express';
import { StubCreator, ExpressAppStub, ExpressRouterStub } from '@danielc7150/express-utils/lib';
import { AppRouter } from '../router';
import { RouterFactory } from '../factories/router.factory';

describe('AppRouter', () => {
  let router: AppRouter, expressRouterStub: Router;

  beforeEach(() => {
    const nestedRoutes: Router = StubCreator.fake('router');

    expressRouterStub = StubCreator.create(ExpressRouterStub);
    jest.spyOn(expressRouterStub, 'use');

    jest.spyOn(RouterFactory, 'create').mockReturnValue(nestedRoutes);

    router = new AppRouter(expressRouterStub);
  });

  it('should create the todo routes', () => {
    expect(expressRouterStub.use).toHaveBeenCalledWith('/todos', 'router');
  });
});
