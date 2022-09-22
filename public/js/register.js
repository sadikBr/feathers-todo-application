import feathers from './feathers.js';
import { register } from './utils/auth.js';

feathers
  .reAuthenticate()
  .then(() => {
    window.location = '/';
  })
  .catch(() => {
    document.getElementById('register').style.display = 'flex';

    document
      .getElementById('register-form')
      .addEventListener('submit', (event) => {
        event.preventDefault();

        register(event);
      });
  });
