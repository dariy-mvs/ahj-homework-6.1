import { removeTaskFromStorage } from './StorageFunction';
import { DnDEvent } from './DnD';

export default function createTask(message) {
  // функция для создания элемента задачи
  const taskElement = document.createElement('div');
  taskElement.className = 'task';
  taskElement.innerHTML = `<button class="task__del_btn">x</button>
  <p class="task__text">${message}</p>`;
  taskElement.querySelector('.task__del_btn').addEventListener('click', (event) => {
    const taskForDelete = event.target.closest('.task');
    const col = event.target.closest('.col');
    const colName = col.querySelector('.col__title').textContent;
    removeTaskFromStorage(taskForDelete, colName);
    taskForDelete.remove();
  });
  DnDEvent(taskElement);
  return taskElement;
}
