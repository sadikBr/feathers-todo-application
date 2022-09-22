import feathers from './feathers.js';

import { logout } from './utils/auth.js';

export function reAuthenticate(elementId) {
  return feathers
    .reAuthenticate()
    .then(() => {
      document.getElementById(elementId).style.display = 'block';

      init();
    })
    .catch((error) => {
      throw error;
    });
}

function init() {
  document.getElementById('logout-btn').addEventListener('click', () => {
    logout();
  });
}
