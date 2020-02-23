import { TodoRoutes } from './todo.routes';
import { Router } from 'express';
import { StubCreator, ExpressRouterStub, ResStub, ReqStub } from '@danielc7150/express-utils/lib';
import { IReq, IRes } from '@danielc7150/express-utils';

describe('TodoRoutes', () => {
  let todoRoutes: TodoRoutes, expressRouter: Router, resMock: IRes, reqMock: IReq;

  beforeEach(() => {
    resMock = StubCreator.create(ResStub);
    reqMock = StubCreator.create(ReqStub);
    expressRouter = StubCreator.create(ExpressRouterStub);
    todoRoutes = new TodoRoutes(expressRouter);
  });

  it('should assign the routes', () => {
    expect(expressRouter.get).toHaveBeenCalledWith('/', expect.any(Function));
  });

  describe('when getting all todos', () => {
    beforeEach(() => {
      (expressRouter.get as jest.Mock).mock.calls[0][1](reqMock, resMock);
    });

    it('should respond with todo', () => {
      expect(resMock.send).toHaveBeenCalledWith('todo');
    });
  });
});
