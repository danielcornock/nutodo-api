export class TodoRequest {
  public readonly title: string;
  public readonly completed: boolean;
  public readonly category: string;

  constructor(data: TodoRequest) {
    this.title = data.title;
    this.completed = data.completed;
    this.category = data.category;
  }
}
