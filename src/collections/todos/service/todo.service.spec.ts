import {
  DatabaseConnection,
  DatabaseConnectionStub,
  KnexStub,
  NotFoundException,
  StubCreator,
} from '@danielc7150/express-utils';
import Knex from 'knex';

import { TodoResponse } from '../data-objects/todo-response';
import { ITodo } from '../interfaces/todo.interface';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let todoService: TodoService, db: DatabaseConnection, query: jest.Mock, queryBuilder: Knex;

  beforeEach(() => {
    db = StubCreator.create(DatabaseConnectionStub);
    query = StubCreator.fake(db.query);
    queryBuilder = StubCreator.create(KnexStub);

    todoService = new TodoService(db);
  });

  describe('when getting all todos', () => {
    let result: Array<TodoResponse>;

    beforeEach(async () => {
      (query as jest.Mock).mockReturnValue(queryBuilder);
      (queryBuilder.where as jest.Mock).mockReturnValue([
        { id: '1', title: 'title', category: 'week', completed: true }
      ]);
      result = await todoService.getAll('userId');
    });

    it('should create the query', () => {
      expect(query).toHaveBeenCalledWith('todos');
    });

    it('should return the found todos', () => {
      expect(result).toEqual([{ id: '1', title: 'title', category: 'week', completed: true }]);
    });
  });

  describe('when creating a todo', () => {
    let result: TodoResponse;

    beforeEach(async () => {
      (query as jest.Mock).mockReturnValue(queryBuilder);
      (queryBuilder.returning as jest.Mock).mockReturnThis();
      (queryBuilder.insert as jest.Mock).mockReturnValue([
        {
          id: '1',
          title: 'title',
          category: 'week',
          completed: true
        }
      ]);

      result = await todoService.create({ title: 'title', category: 'week', completed: true } as ITodo, 'userId');
    });

    it('should create the query', () => {
      expect(query).toHaveBeenCalledWith('todos');
      expect(queryBuilder.returning).toHaveBeenCalledWith('*');
      expect(queryBuilder.insert).toHaveBeenCalledWith({
        title: 'title',
        category: 'week',
        completed: true,
        user: 'userId'
      });
    });

    it('should return the created todo', () => {
      expect(result).toEqual({
        id: '1',
        title: 'title',
        category: 'week',
        completed: true
      });
    });
  });

  describe('when updating a todo', () => {
    let result: TodoResponse;

    beforeEach(async () => {
      (query as jest.Mock).mockReturnValue(queryBuilder);
      (queryBuilder.where as jest.Mock).mockReturnThis();
      (queryBuilder.update as jest.Mock).mockReturnThis();
      (queryBuilder.returning as jest.Mock).mockReturnValue([
        {
          id: '1',
          title: 'title',
          category: 'week',
          completed: true
        }
      ]);

      result = await todoService.update(
        'id',
        { id: 'id', title: 'title', category: 'week', completed: true } as ITodo,
        'userId'
      );
    });

    it('should create the query', () => {
      expect(query).toHaveBeenCalledWith('todos');
      expect(queryBuilder.where).toHaveBeenCalledWith({ id: 'id', user: 'userId' });
      expect(queryBuilder.update).toHaveBeenCalledWith({
        title: 'title',
        category: 'week',
        completed: true,
        user: 'userId'
      });
      expect(queryBuilder.returning).toHaveBeenCalledWith('*');
    });

    it('should return the updated todo', () => {
      expect(result).toEqual({ category: 'week', completed: true, id: '1', title: 'title' });
    });
  });

  describe('when getting one todo', () => {
    let result: TodoResponse | void, error: any;

    beforeEach(() => {
      (query as jest.Mock).mockReturnValue(queryBuilder);
      (queryBuilder.where as jest.Mock).mockReturnThis();
    });

    describe('when a todo is found', () => {
      beforeEach(async () => {
        (queryBuilder.first as jest.Mock).mockReturnValue({
          category: 'week',
          completed: true,
          id: '1',
          title: 'title'
        });

        result = await todoService.getOne('id', 'userId');
      });

      it('should create the query', () => {
        expect(query).toHaveBeenCalledWith('todos');
        expect(queryBuilder.where).toHaveBeenCalledWith({ id: 'id', user: 'userId' });
        expect(queryBuilder.first).toHaveBeenCalledWith();
      });

      it('should return the result', () => {
        expect(result).toEqual({ category: 'week', completed: true, id: '1', title: 'title' });
      });
    });

    describe('when no todo can be found', () => {
      beforeEach(async () => {
        (queryBuilder.first as jest.Mock).mockReturnValue(null);

        result = await todoService.getOne('id', 'userId').catch((e) => {
          error = e;
        });
      });

      it('should throw a not found exception', () => {
        expect(error).toBeInstanceOf(NotFoundException);
      });
    });
  });

  describe('when deleting a todo', () => {
    beforeEach(() => {
      (query as jest.Mock).mockReturnValue(queryBuilder);
      (queryBuilder.where as jest.Mock).mockReturnThis();
    });

    describe('when a todo is deleted', () => {
      beforeEach(() => {
        (queryBuilder.delete as jest.Mock).mockReturnValue(1);
        todoService.deleteOne('id', 'userId');
      });

      it('should create the query', () => {
        expect(query).toHaveBeenCalledWith('todos');
        expect(queryBuilder.where).toHaveBeenCalledWith({ id: 'id', user: 'userId' });
        expect(queryBuilder.delete).toHaveBeenCalledWith();
      });
    });

    describe('when a todo is not deleted', () => {
      let error: any;
      beforeEach(() => {
        (queryBuilder.delete as jest.Mock).mockReturnValue(0);
        todoService.deleteOne('id', 'userId').catch((e) => {
          error = e;
        });
      });

      it('should throw an error', () => {
        expect(error).toBeInstanceOf(NotFoundException);
      });
    });
  });
});
