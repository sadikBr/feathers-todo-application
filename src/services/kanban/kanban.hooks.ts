import * as authentication from '@feathersjs/authentication';
import linkToUser from '../../hooks/link-to-user';
import limitToOwner from '../../hooks/limit-to-owner';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [limitToOwner()],
    get: [limitToOwner()],
    create: [linkToUser()],
    update: [limitToOwner(), linkToUser()],
    patch: [limitToOwner()],
    remove: [limitToOwner()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
