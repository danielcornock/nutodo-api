export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
  user: string;
  category: 'week' | 'month' | 'backlog' | 'history';
}
