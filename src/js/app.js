import createTask from './createTask';
import delTaskEvent from './delTaskEvent';
import addTaskEvents from './addTaskFunc';
import DnD from './DnD';

document.addEventListener('DOMContentLoaded', () => {
  function printTasks(colName, className) {
    if (localStorage[colName]) {
      const tasks = JSON.parse(localStorage[colName]);
      tasks.forEach((el) => {
        const element = createTask(el);
        const sel = `.${className}`;
        const col = document.querySelector(sel);
        col.querySelector('.add_task').insertAdjacentElement('beforebegin', element);
      });
    }
  }
  printTasks('TODO', 'todo');
  printTasks('IN PROGRESS', 'in-progress');
  printTasks('DONE', 'done');

  addTaskEvents();
  delTaskEvent();
  DnD();
});

// const notTrello = document.querySelector('.not-trello');
