// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const user = context.params.user;

    if (user) {
      const user_id = user._id;
      context.data.owner_id = user_id;

      return context;
    }

    return context;
  };
};
