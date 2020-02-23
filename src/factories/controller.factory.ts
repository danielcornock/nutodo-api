import { TodoController } from '../collections/todos/controller/todo.controller';

export class ControllerFactory {
  static create(controller: string): any {
    switch (controller) {
      case 'todo':
        return new TodoController();
    }
  }
}
