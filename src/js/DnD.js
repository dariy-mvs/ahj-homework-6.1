import { addTaskToStorage, removeTaskFromStorage } from './StorageFunction';

export function DnDEvent(elem) {
  const task = elem;
  let previousColName;
  let nextColName;
  let elemBelow;
  let taskHeight;
  let currentDroppable = null;
  let appendPlace = 'beforebegin';
  let taskBelow;
  task.ondragstart = function () {
    return false;
  };
  task.onmousedown = function (event) {
    let shiftX;
    let shiftY;
    function moveAt(pageX, pageY) {
      task.style.left = `${pageX - shiftX}px`;
      task.style.top = `${pageY - shiftY}px`;
    }
    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
      task.hidden = true;
      elemBelow = document.elementFromPoint(e.pageX, e.pageY);
      if (elemBelow.closest('.col')) {
        nextColName = elemBelow.closest('.col').querySelector('.col__title').textContent;
      }
      task.hidden = false;
      taskBelow = elemBelow.closest('.task');
      if (taskBelow) {
        if (currentDroppable !== taskBelow) {
          if (currentDroppable) {
            // логика обработки процесса "вылета" из droppable
            currentDroppable.style.marginTop = '10px';
            currentDroppable.style.marginBottom = '0';
          }
          currentDroppable = taskBelow;
          if (currentDroppable) {
            // логика обработки процесса, когда мы "влетаем" в элемент droppable
            const yCoordBelow = e.pageY - taskBelow.getBoundingClientRect().top;
            if (yCoordBelow < (taskBelow.getBoundingClientRect().top / 2)) {
              currentDroppable.style.marginTop = `${taskHeight + 10}px`;
              appendPlace = 'beforebegin';
            } else {
              currentDroppable.style.marginBottom = `${taskHeight}px`;
              appendPlace = 'afterend';
            }
          }
        }
      }
    }
    if (!event.target.classList.contains('task__del_btn')) {
      // (1) отследить нажатие
      previousColName = task.closest('.col').querySelector('.col__title').textContent;
      // (2) подготовить к перемещению:
      // разместить поверх остального содержимого и в абсолютных координатах
      shiftX = event.clientX - task.getBoundingClientRect().left;
      shiftY = event.clientY - task.getBoundingClientRect().top;
      taskHeight = task.offsetHeight;
      task.style.position = 'absolute';
      task.style.zIndex = 1000;
      task.style.cursor = 'grabbing';
      // переместим в body, чтобы task был точно не внутри position:relative
      document.body.append(task);
      // и установим абсолютно спозиционированный task под курсор
      // передвинуть task под координаты курсора

      moveAt(event.pageX, event.pageY);

      // (3) перемещать по экрану
      document.addEventListener('mousemove', onMouseMove);

      // (4) положить мяч, удалить более ненужные обработчики событий
      task.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        if (elemBelow.closest('.task')) {
          elemBelow.closest('.task').insertAdjacentElement(appendPlace, task);
          removeTaskFromStorage(task, previousColName);
          addTaskToStorage(nextColName);
        } else if (elemBelow.closest('.col') && currentDroppable) {
          currentDroppable.insertAdjacentElement(appendPlace, task);
          removeTaskFromStorage(task, previousColName);
          addTaskToStorage(nextColName);
        } else if (elemBelow.closest('.col')) {
          elemBelow.closest('.col').querySelector('.add_task').insertAdjacentElement('beforebegin', task);
          removeTaskFromStorage(task, previousColName);
          addTaskToStorage(nextColName);
        }
        task.onmouseup = null;
        task.style.position = 'static';
        task.style.zIndex = 0;
        task.style.cursor = 'auto';
        [...document.querySelectorAll('.task')].forEach((el) => {
          const element = el;
          element.style.marginBottom = '0';
          element.style.marginTop = '10px';
        });
      };
    }
  };
}

export default function DnD() {
  // перетаскивание задачи
  const tasks = [...document.querySelectorAll('.task')];
  tasks.forEach((el) => {
    DnDEvent(el);
  });
}
