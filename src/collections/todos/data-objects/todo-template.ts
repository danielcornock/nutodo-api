import { ITodo } from '../interfaces/todo.interface';

export const todoTemplate: Omit<ITodo, 'id' | 'user'> = {
  title: '',
  completed: false,
  category: 'backlog'
};
