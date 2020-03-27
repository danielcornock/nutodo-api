import { ITodo } from '../interfaces/todo.interface';

export class TodoResponse {
  public title: string;
  public completed: boolean;
  public category: string;
  public id: string;

  constructor(data: ITodo) {
    this.id = data.id;
    this.title = data.title;
    this.completed = data.completed;
    this.category = data.category;
  }
}
