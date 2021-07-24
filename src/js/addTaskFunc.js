import { addTaskToStorage } from './StorageFunction';
import createTask from './createTask';

export default function addTaskEvents() {
  const addTaskButtons = [...document.querySelectorAll('.add_task')];

  addTaskButtons.forEach((el) => {
    el.addEventListener('click', (event) => {
      const col = event.target.closest('.col');
      const colName = col.querySelector('.col__title').textContent;
      const field = col.querySelector('.text_field');
      if (field.value === '') {
        alert('Не стоит сохранять пустое сообщение. Запишите пару мыслей. Мы уверены, они у Вас есть.');
        return;
      }
      const newElement = createTask(field.value);
      col.querySelector('.add_task').insertAdjacentElement('beforebegin', newElement);
      field.value = '';
      if (!localStorage[colName]) {
        const tasks = JSON.stringify([field.value]);
        localStorage[colName] = tasks;
      } else {
        addTaskToStorage(colName);
      }
    });
  });
}
