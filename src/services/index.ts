import { Application } from '../declarations';
import users from './users/users.service';
import todos from './todos/todos.service';
import todoList from './todo-list/todo-list.service';
import kanban from './kanban/kanban.service';
import categories from './categories/categories.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(todos);
  app.configure(todoList);
  app.configure(kanban);
  app.configure(categories);
}
