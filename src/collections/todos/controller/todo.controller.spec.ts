import { IReq, IRes, ReqStub, ResponseFactory, ResponseFactoryStub, ResStub, StubCreator } from '@danielc7150/express-utils';

import { TodoRequest } from '../data-objects/todo-request';
import { TodoService } from '../service/todo.service';
import { TodoServiceStub } from '../service/todo.service.stub';
import { TodoController } from './todo.controller';

describe('TodoController', () => {
  let controller: TodoController, req: IReq, res: IRes, todoService: TodoService, responseFactory: ResponseFactory;

  beforeEach(() => {
    req = StubCreator.create(ReqStub);
    (req as any).user.id = 'userId';
    res = StubCreator.create(ResStub);
    responseFactory = StubCreator.create(ResponseFactoryStub);
    todoService = StubCreator.create(TodoServiceStub);
    jest.spyOn(ResponseFactory, 'create').mockReturnValue(responseFactory);
    controller = new TodoController(todoService);
  });

  describe('when getting all todos', () => {
    let mockTodo: TodoRequest;

    beforeEach(() => {
      mockTodo = { category: 'week', completed: true, title: 'todo' };
      (todoService.getAll as jest.Mock).mockResolvedValue([mockTodo]);
      controller.getAll(req, res);
    });

    it('should fetch the todos from the service', () => {
      expect(todoService.getAll).toHaveBeenCalledWith('userId');
    });

    it('should return the todos', () => {
      expect(responseFactory.successFind).toHaveBeenCalledWith(res, {
        data: { todos: [mockTodo] },
        name: 'todos'
      });
    });
  });

  describe('when creating a todo', () => {
    let mockTodo: TodoRequest;

    beforeEach(() => {
      mockTodo = { category: 'week', completed: true, title: 'todo' };
      (todoService.create as jest.Mock).mockResolvedValue(mockTodo);
      req.body = mockTodo;
      controller.create(req, res);
    });

    it('should create the new todo', () => {
      expect(todoService.create).toHaveBeenCalledWith(req.body, 'userId');
    });

    it('should return the created todo', () => {
      expect(responseFactory.successCreate).toHaveBeenCalledWith(res, {
        data: { todo: mockTodo },
        name: 'todo'
      });
    });
  });

  describe('when getting one todo', () => {
    beforeEach(() => {
      (todoService.getOne as jest.Mock).mockResolvedValue('todo');
      req.params.id = 'id';
      controller.getOne(req, res);
    });

    it('should fetch the todo', () => {
      expect(todoService.getOne).toHaveBeenCalledWith('id', 'userId');
    });

    it('should return the found todo', () => {
      expect(responseFactory.successFind).toHaveBeenCalledWith(res, {
        data: { todo: 'todo' },
        name: 'todo'
      });
    });
  });

  describe('when deleting a todo', () => {
    beforeEach(() => {
      (todoService.deleteOne as jest.Mock).mockResolvedValue(null);
      req.params.id = 'id';
      controller.deleteOne(req, res);
    });

    it('should delete the todo', () => {
      expect(todoService.deleteOne).toHaveBeenCalledWith('id', 'userId');
    });

    it('should respond with a 204', () => {
      expect(responseFactory.successDelete).toHaveBeenCalledWith(res);
    });
  });

  describe('when updating a todo', () => {
    beforeEach(() => {
      (todoService.update as jest.Mock).mockResolvedValue('todo');
      req.params.id = 'id';
      controller.update(req, res);
    });

    it('should update the todo', () => {
      expect(todoService.update).toHaveBeenCalledWith('id', req.body, 'userId');
    });

    it('should return the created todo', () => {
      expect(responseFactory.successCreate).toHaveBeenCalledWith(res, {
        data: { todo: 'todo' },
        name: 'todo'
      });
    });
  });
});
