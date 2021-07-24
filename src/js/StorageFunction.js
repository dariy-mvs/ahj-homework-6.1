// функция для удаления задачи из localStorage
export function removeTaskFromStorage(elem, colName) {
  const taskText = elem.querySelector('.task__text').textContent;
  const tasks = JSON.parse(localStorage[colName]);
  const taskIndex = tasks.indexOf(taskText);
  tasks.splice(taskIndex, 1);
  localStorage[colName] = JSON.stringify(tasks);
}

// функция для добавления задачи в localStorage
export function addTaskToStorage(colName) {
  const col = [...document.querySelectorAll('.col')].find((el) => el.querySelector('.col__title').textContent === colName);
  const taskTexts = [...col.querySelectorAll('.task__text')].map((el) => el.textContent);
  const taskString = JSON.stringify(taskTexts);
  localStorage[colName] = taskString;
}
