import { TodoRoutes } from './todo.routes';
import { Router } from 'express';
import { StubCreator, ExpressRouterStub, ResStub, ReqStub } from '@danielc7150/express-utils/lib';
import { IReq, IRes } from '@danielc7150/express-utils';
import { TodoController } from '../controller/todo.controller';
import { TodoControllerStub } from '../controller/todo.controller.stub';

describe('TodoRoutes', () => {
  let todoRoutes: TodoRoutes, expressRouter: Router, resMock: IRes, reqMock: IReq, todoController: TodoController, nextMock: jest.Mock;

  beforeEach(() => {
    resMock = StubCreator.create(ResStub);
    reqMock = StubCreator.create(ReqStub);
    nextMock = jest.fn();
    expressRouter = StubCreator.create(ExpressRouterStub);
    todoController = StubCreator.create(TodoControllerStub);
    todoRoutes = new TodoRoutes(expressRouter, todoController);
  });

  it('should mount the routes', () => {
    expect(expressRouter.get).toHaveBeenCalledWith('/', expect.any(Function));
  });

  describe('when assigning the routes', () => {
    beforeEach(() => {
      (expressRouter.get as jest.Mock).mock.calls[0][1](reqMock, resMock);
      (expressRouter.post as jest.Mock).mock.calls[0][1](reqMock, resMock);
    });

    it('should assign the routes', () => {
      expect(todoController.getAll).toHaveBeenCalledWith(reqMock, resMock);
      expect(todoController.create).toHaveBeenCalledWith(reqMock, resMock);
    });
  });
});
