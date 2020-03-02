import { TodoController } from './todo.controller';
import { IReq, IRes, ReqStub, ResStub, StubCreator, INext, ResponseFactory } from '@danielc7150/express-utils/lib';
import { TodoService } from '../service/todo.service';
import { TodoServiceStub } from '../service/todo.service.stub';

describe('TodoController', () => {
  let controller: TodoController, req: IReq, res: IRes, next: INext, todoService: TodoService;

  beforeEach(() => {
    req = StubCreator.create(ReqStub);
    res = StubCreator.create(ResStub);
    next = jest.fn();
    todoService = StubCreator.create(TodoServiceStub);
    controller = new TodoController(todoService);
  });

  describe('when getting all todos', () => {
    beforeEach(() => {
      (todoService.getAll as jest.Mock).mockResolvedValue([{ id: 1 }]);
      jest.spyOn(ResponseFactory, 'successFind');
      controller.getAll(req, res, next);
    });

    it('should fetch the todos from the service', () => {
      expect(todoService.getAll).toHaveBeenCalledWith();
    });

    it('should return the todos', () => {
      expect(ResponseFactory.successFind).toHaveBeenCalledWith(res, {
        data: { todos: [{ id: 1 }] },
        name: 'todos'
      });
    });
  });

  describe('when creating a todo', () => {
    beforeEach(() => {
      (todoService.create as jest.Mock).mockResolvedValue({ id: 2 });
      jest.spyOn(ResponseFactory, 'successCreate');
      req.body = { id: 2 };
      controller.create(req, res, next);
    });

    it('should create the new todo', () => {
      expect(todoService.create).toHaveBeenCalledWith(req.body);
    });

    it('should return the created todo', () => {
      expect(ResponseFactory.successCreate).toHaveBeenCalledWith(res, {
        data: { todo: { id: 2 } },
        name: 'todo'
      });
    });
  });

  describe('when getting one todo', () => {
    beforeEach(() => {
      (todoService.getOne as jest.Mock).mockResolvedValue('todo');
      jest.spyOn(ResponseFactory, 'successFind');
      req.params.id = 'id';
      controller.getOne(req, res, next);
    });

    it('should fetch the todo', () => {
      expect(todoService.getOne).toHaveBeenCalledWith('id');
    });

    it('should return the found todo', () => {
      expect(ResponseFactory.successFind).toHaveBeenCalledWith(res, {
        data: { todo: 'todo' },
        name: 'todo'
      });
    });
  });

  describe('when deleting a todo', () => {
    beforeEach(() => {
      (todoService.deleteOne as jest.Mock).mockResolvedValue(null);
      jest.spyOn(ResponseFactory, 'successDelete');
      req.params.id = 'id';
      controller.deleteOne(req, res, next);
    });

    it('should delete the todo', () => {
      expect(todoService.deleteOne).toHaveBeenCalledWith('id');
    });

    it('should respond with a 204', () => {
      expect(ResponseFactory.successDelete).toHaveBeenCalledWith(res);
    });
  });

  describe('when updating a todo', () => {
    beforeEach(() => {
      (todoService.update as jest.Mock).mockResolvedValue('todo');
      jest.spyOn(ResponseFactory, 'successCreate');
      req.params.id = 'id';
      controller.update(req, res, next);
    });

    it('should update the todo', () => {
      expect(todoService.update).toHaveBeenCalledWith('id', req.body);
    });

    it('should return the created todo', () => {
      expect(ResponseFactory.successCreate).toHaveBeenCalledWith(res, {
        data: { todo: 'todo' },
        name: 'todo'
      });
    });
  });
});
