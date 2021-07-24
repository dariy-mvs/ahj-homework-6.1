import { removeTaskFromStorage } from './StorageFunction';

export default function delTaskEvent() {
  const deleteTaskButtons = [...document.querySelectorAll('.task__del_btn')];

  deleteTaskButtons.forEach((el) => {
    el.addEventListener('click', (event) => {
      // удаление задачи
      const taskForDelete = event.target.closest('.task');
      const col = event.target.closest('.col');
      const colName = col.querySelector('.col__title').textContent;
      removeTaskFromStorage(taskForDelete, colName);
      taskForDelete.remove();
    });
  });
}
