import feathers from './feathers.js';
import { login } from './utils/auth.js';

feathers
  .reAuthenticate()
  .then(() => {
    window.location = '/';
  })
  .catch(() => {
    document.getElementById('login').style.display = 'flex';

    document
      .getElementById('login-form')
      .addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const userInfo = {
          email: formData.get('email'),
          password: formData.get('password'),
        };

        login(userInfo, () => {
          window.location = '/';
        });
      });
  });
