import { renderError } from './utils/errors.js';
import { todoList, todos } from './services.js';
import { reAuthenticate } from './shared.js';

const todoListsWrapper = document.querySelector('.todo-lists');
let parent_id;

reAuthenticate('todo-list')
  .then(() => {
    init();
  })
  .catch(() => {
    window.location = '/login.html';
  });

function renderTask(task) {
  const header = document.getElementById('header-to-remove');

  if (header) header.remove();

  const taskElement = document.createElement('div');
  taskElement.classList.add('task');

  taskElement.innerHTML = `
    <input type='checkbox' value='${task.completed}' />
    <h4>${task.text}</h4>
    <div>
      <button><i class="fa-solid fa-pen-to-square"></i></button>
      <button><i class="fa-solid fa-trash-can"></i></button>
    </div>
  `;

  document.getElementById('todo-list-tasks').appendChild(taskElement);
}

function populateTodoListTasks(todoList) {
  // remove the create task button from the page
  const container = document.getElementById('todo-list-tasks-container');
  const button = container.querySelector('.create-task-button');
  if (button) {
    button.remove();
  }
  const { tasks } = todoList;

  document.getElementById(
    'todo-list-tasks'
  ).innerHTML = `<h3>TodoList: ${todoList.title} <span class='todo-list-tasks-delete-btn'>Delete</span></h3>`;

  document.getElementById('todo-list-tasks').innerHTML +=
    '<div id="header-to-remove">There are no tasks created yet.</div>';

  if (tasks.length !== 0) {
    for (let i = 0; i < tasks.length; i++) {
      const taskId = tasks[i];

      todos
        .get({
          _id: taskId,
        })
        .then(renderTask)
        .catch(error => alert(error.message));
    }
  }

  // Append a button to create new Tasks
  const createTaskButton = document.createElement('button');
  createTaskButton.classList.add('create-task-button');
  createTaskButton.textContent = 'Create New Task ...';
  document
    .getElementById('todo-list-tasks-container')
    .appendChild(createTaskButton);

  // Task Creation modal event handlers
  createTaskButton.addEventListener('click', () => {
    document.querySelector('.task-modal').classList.add('show-task-modal');
  });
}

function addSelectedClass(element) {
  document
    .querySelectorAll(
      '#todo-list .container .todo-lists-container .todo-lists h5'
    )
    .forEach((list) => list.classList.remove('selected'));

  element.classList.add('selected');
}

function createEventHandlersAndHandleUpdates(element) {
  // Handling click on todo list to fetch its content
  element.addEventListener('click', () => {
    const todoListId = element.getAttribute('id');

    parent_id = todoListId;

    todoList
      .get({ _id: todoListId })
      .then((response) => {
        addSelectedClass(element);
        populateTodoListTasks(response);
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  // Handling double click to update todo list title
  element.addEventListener('dblclick', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input autofocus type="text" value="${element.textContent}" name="new-todo-list-title" style="width: 100%; height: 100%; background: transparent; color: whitesmoke; font-size: 2vmin; border: none; outline: none;" />
    `;
    element.innerHTML = '';
    element.appendChild(form);

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      todoList
        .patch(element.getAttribute('id'), {
          title: formData.get('new-todo-list-title').trim(),
        })
        .then((response) => {
          element.textContent = formData.get('new-todo-list-title');
          populateTodoListTasks(response);
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  });
}

function createListElement(todoList) {
  const listElement = document.createElement('h5');
  listElement.textContent = todoList.title;
  listElement.id = todoList._id;

  createEventHandlersAndHandleUpdates(listElement);

  todoListsWrapper.appendChild(listElement);
}

function renderTodoLists(toInsert) {
  if (toInsert.hasOwnProperty('length')) {
    todoListsWrapper.textContent = '';
    toInsert.forEach((list) => {
      createListElement(list);
    });
  } else {
    createListElement(toInsert);
  }
}

async function init() {
  // Get and Render all todo-lists on page load.
  const { data: todoLists } = await todoList.find({});
  renderTodoLists(todoLists);

  // handle todo-list creation
  document.getElementById('modal-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    todoList
      .create({
        title: formData.get('title').trim(),
      })
      .then(() => {
        event.target.reset();
        document.querySelector('.modal').classList.remove('show');
      })
      .catch((error) => {
        renderError('modal-errors', error);
      });
  });

  // handle task creation
  document
    .getElementById('task-modal-form')
    .addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      todos
        .create({
          parent_id,
          text: formData.get('text').trim(),
        })
        .then((response) => {
          todoList
            .patch(parent_id, {
              $push: {
                tasks: response._id,
              },
            })
            .then(() => {
              event.target.reset();
              document
                .querySelector('.task-modal')
                .classList.remove('show-task-modal');
            })
            .catch((error) => {
              renderError('task-modal-errors', error.message);
            });
        })
        .catch((error) => {
          renderError('task-modal-errors', error);
        });
    });

  // Listen for socket events and re-render the page accordingly
  todoList.on('created', renderTodoLists);
  todos.on('created', renderTask);

  // Modal specific events
  document.getElementById('new-todo-list-btn').addEventListener('click', () => {
    document.querySelector('.modal').classList.add('show');
  });
  document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.querySelector('.modal').classList.remove('show');
  });
  document
    .getElementById('close-task-modal-btn')
    .addEventListener('click', () => {
      document.querySelector('.task-modal').classList.remove('show-task-modal');
    });
}
