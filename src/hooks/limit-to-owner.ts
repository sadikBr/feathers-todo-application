// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook } from '@feathersjs/feathers';
import { setField } from 'feathers-hooks-common';

export default (): Hook => {
  return setField({
    from: 'params.user._id',
    as: 'params.query.owner_id',
  });
};
