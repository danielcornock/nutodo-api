import { TodoRequest } from './todo-request';

export class TodoDBInsert extends TodoRequest {
  public readonly user: string;

  constructor(todo: TodoRequest, userId: string) {
    super(todo);
    this.user = userId;
  }
}
