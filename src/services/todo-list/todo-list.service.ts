// Initializes the `todo-list` service on path `/todo-list`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { TodoList } from './todo-list.class';
import createModel from '../../models/todo-list.model';
import hooks from './todo-list.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'todo-list': TodoList & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/todo-list', new TodoList(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('todo-list');

  service.hooks(hooks);
}
