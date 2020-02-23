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
    todoController = new TodoControllerStub();
    todoRoutes = new TodoRoutes(expressRouter, todoController);
  });

  it('should assign the routes', () => {
    expect(expressRouter.get).toHaveBeenCalledWith('/', expect.any(Function));
  });

  describe('when getting all todos', () => {
    beforeEach(() => {
      (expressRouter.get as jest.Mock).mock.calls[0][1](reqMock, resMock);
    });

    it('should respond with todo', () => {
      expect(todoController.getAll).toHaveBeenCalledWith(reqMock, resMock);
    });
  });
});
