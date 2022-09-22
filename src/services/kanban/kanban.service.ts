// Initializes the `kanban` service on path `/kanban`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Kanban } from './kanban.class';
import createModel from '../../models/kanban.model';
import hooks from './kanban.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    kanban: Kanban & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/kanban', new Kanban(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('kanban');

  service.hooks(hooks);
}
