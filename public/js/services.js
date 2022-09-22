import feathers from './feathers.js';

const todos = feathers.service('todos');
const users = feathers.service('users');
const todoList = feathers.service('todo-list');
const kanban = feathers.service('kanban');
const categories = feathers.service('categories');

export { todos, users, todoList, kanban, categories };
