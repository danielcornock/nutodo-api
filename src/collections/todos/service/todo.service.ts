import { Pool, QueryResult } from 'pg';
import { ITodo } from '../interfaces/todo.interface';

export class TodoService {
  private readonly _db: Pool;

  constructor(db: Pool) {
    this._db = db;
  }

  public async getAll(): Promise<Array<ITodo>> {
    const result: QueryResult = await this._db.query('SELECT * FROM todos');

    return result.rows;
  }

  public async create(todo: ITodo): Promise<ITodo> {
    const result: QueryResult = await this._db.query('INSERT INTO todos (title) VALUES ($1) RETURNING *', [todo.title]);

    return result.rows[0];
  }
}
