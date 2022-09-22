import feathers from './feathers.js';

import { reAuthenticate } from './shared.js';

reAuthenticate('app')
  .then(() => {
    init();
  })
  .catch(() => {
    window.location = '/login.html';
  });

async function init() {
  const { user } = await feathers.get('authentication');

  document.getElementById(
    'user'
  ).textContent = `${user.last_name} ${user.first_name}`;
}
