import { reAuthenticate } from './shared.js';

reAuthenticate('kanban')
  .then(() => {
    init();
  })
  .catch(() => {
    window.location = '/login.html';
  });

function init() {
  console.log('This is the KanBan page.');
}
