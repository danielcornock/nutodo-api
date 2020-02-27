import { TodoService } from './todo.service';
import { Pool } from 'pg';
import { StubCreator } from '@danielc7150/express-utils/lib';
import { PoolStub } from '../../../config/database/database-connection.stub';
import { ITodo } from '../interfaces/todo.interface';

describe('TodoService', () => {
  let todoService: TodoService, db: Pool;

  beforeEach(() => {
    db = StubCreator.create(PoolStub);
    todoService = new TodoService(db);
  });

  describe('when getting all todos', () => {
    let result: Array<ITodo>;

    beforeEach(async () => {
      (db.query as jest.Mock).mockResolvedValue({ rows: ['todo1', 'todo2'] });
      result = await todoService.getAll();
    });

    it('should request the data', () => {
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM todos');
    });

    it('should return the found todos', () => {
      expect(result).toEqual(['todo1', 'todo2']);
    });
  });

  describe('when creating a todo', () => {
    let result: ITodo;

    beforeEach(async () => {
      (db.query as jest.Mock).mockResolvedValue({ rows: ['todo1'] });
      result = await todoService.create({ title: 'todo' } as ITodo);
    });

    it('should attempt to post the data', () => {
      expect(db.query).toHaveBeenCalledWith('INSERT INTO todos (title) VALUES ($1) RETURNING *', ['todo']);
    });

    it('should return the created todo', () => {
      expect(result).toEqual('todo1');
    });
  });
});
