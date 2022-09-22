import feathers from '../feathers.js';

import { users } from '../services.js';
import { renderError } from './errors.js';

export function logout() {
  feathers.logout().then(() => {
    window.location = '/login.html';
  });
}

export function login(userInfo, callback) {
  feathers
    .authenticate({
      strategy: 'local',
      ...userInfo,
    })
    .then(callback)
    .catch((error) => {
      renderError('errors', error);
    });
}

export function register(event) {
  const formData = new FormData(event.target);

  const userInfo = {
    first_name: formData.get('first-name'),
    last_name: formData.get('last-name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  users
    .create(userInfo)
    .then(() => {
      login(
        {
          email: userInfo.email,
          password: userInfo.password,
        },
        () => {
          window.location = '/';
        }
      );
    })
    .catch((error) => renderError('errors', error));
}
