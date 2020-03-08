import { TodoService } from './todo.service';
import { StubCreator, NotFoundException } from '@danielc7150/express-utils';
import { DatabaseConnectionStub, KnexStub } from '@danielc7150/express-utils';
import { ITodo } from '../interfaces/todo.interface';
import { DatabaseConnection } from '@danielc7150/express-utils';
import Knex from 'knex';

describe('TodoService', () => {
  let todoService: TodoService, db: DatabaseConnection, query: jest.Mock, queryBuilder: Knex;

  beforeEach(() => {
    db = StubCreator.create(DatabaseConnectionStub);
    query = StubCreator.fake(db.query);
    queryBuilder = StubCreator.create(KnexStub);

    todoService = new TodoService(db);
  });

  describe('when getting all todos', () => {
    let result: Array<ITodo>;

    beforeEach(async () => {
      (query as jest.Mock).mockReturnValue(['todo1', 'todo2']);
      result = await todoService.getAll();
    });

    it('should create the query', () => {
      expect(query).toHaveBeenCalledWith('todos');
    });

    it('should return the found todos', () => {
      expect(result).toEqual(['todo1', 'todo2']);
    });
  });

  describe('when creating a todo', () => {
    let result: ITodo;

    beforeEach(async () => {
      (query as jest.Mock).mockReturnValue(queryBuilder);
      (queryBuilder.returning as jest.Mock).mockReturnThis();
      (queryBuilder.insert as jest.Mock).mockReturnValue(['todo']);

      result = await todoService.create({ title: 'todo' } as ITodo);
    });

    it('should create the query', () => {
      expect(query).toHaveBeenCalledWith('todos');
      expect(queryBuilder.returning).toHaveBeenCalledWith('*');
      expect(queryBuilder.insert).toHaveBeenCalledWith({ title: 'todo' });
    });

    it('should return the created todo', () => {
      expect(result).toEqual('todo');
    });
  });

  describe('when updating a todo', () => {
    let result: ITodo;

    beforeEach(async () => {
      (query as jest.Mock).mockReturnValue(queryBuilder);
      (queryBuilder.where as jest.Mock).mockReturnThis();
      (queryBuilder.update as jest.Mock).mockReturnThis();
      (queryBuilder.returning as jest.Mock).mockReturnValue(['todo']);

      result = await todoService.update('id', { title: 'todo' } as ITodo);
    });

    it('should create the query', () => {
      expect(query).toHaveBeenCalledWith('todos');
      expect(queryBuilder.where).toHaveBeenCalledWith({ id: 'id' });
      expect(queryBuilder.update).toHaveBeenCalledWith({ title: 'todo' });
      expect(queryBuilder.returning).toHaveBeenCalledWith('*');
    });

    it('should return the updated todo', () => {
      expect(result).toBe('todo');
    });
  });

  describe('when getting one todo', () => {
    let result: ITodo | void, error: any;

    beforeEach(() => {
      (query as jest.Mock).mockReturnValue(queryBuilder);
      (queryBuilder.where as jest.Mock).mockReturnThis();
    });

    describe('when a todo is found', () => {
      beforeEach(async () => {
        (queryBuilder.first as jest.Mock).mockReturnValue('todo');

        result = await todoService.getOne('id');
      });

      it('should create the query', () => {
        expect(query).toHaveBeenCalledWith('todos');
        expect(queryBuilder.where).toHaveBeenCalledWith({ id: 'id' });
        expect(queryBuilder.first).toHaveBeenCalledWith();
      });

      it('should return the result', () => {
        expect(result).toBe('todo');
      });
    });
    describe('when no todo can be found', () => {
      beforeEach(async () => {
        (queryBuilder.first as jest.Mock).mockReturnValue(null);

        result = await todoService.getOne('id').catch((e) => {
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
        todoService.deleteOne('id');
      });

      it('should create the query', () => {
        expect(query).toHaveBeenCalledWith('todos');
        expect(queryBuilder.where).toHaveBeenCalledWith({ id: 'id' });
        expect(queryBuilder.delete).toHaveBeenCalledWith();
      });
    });

    describe('when a todo is not deleted', () => {
      let error: any;
      beforeEach(() => {
        (queryBuilder.delete as jest.Mock).mockReturnValue(0);
        todoService.deleteOne('id').catch((e) => {
          error = e;
        });
      });

      it('should throw an error', () => {
        expect(error).toBeInstanceOf(NotFoundException);
      });
    });
  });
});
