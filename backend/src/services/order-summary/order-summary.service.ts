// Initializes the `orderSummary` service on path `/order-summary`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { OrderSummary } from './order-summary.class';
import createModel from './order-summary.model';
import hooks from './order-summary.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'order-summary': OrderSummary & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/order-summary', new OrderSummary(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('order-summary');

  service.hooks(hooks);
}
