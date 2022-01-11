import { APP_STATE, saveState } from '../state';
import { taskName, groupName, deadline, taskModal } from '../selectors';
import { renderTasks } from '../render/taskRender'
import { randomString, checkValue } from '../utils';

export function removeTask(event) {
  if (event.target.dataset.elType == 'remove task') {
    if (APP_STATE.activeUser !== event.target.dataset.owner) {
      return;
    }
    event.target.parentNode.parentNode.remove();
    delete APP_STATE.tasks[event.target.id];
    saveState();
    renderTasks();
  }
}

export function buildTask() {
  if (!taskName.value) {
    return;
  }
  let taskId = randomString();
  let newTask = {
    taskId: taskId,
    title: taskName.value,
    groupTitle: groupName.options[groupName.selectedIndex].value,
    groupId: groupName.options[groupName.selectedIndex].id,
    taskStatus: 'New',
    deadline: checkValue(deadline.value),
    owner: APP_STATE.activeUser,
  };
  APP_STATE.tasks[taskId] = newTask;
  taskModal.style.display = 'none';
  saveState();
  renderTasks();
}

export function editTasks(event) {
  if (event.target.dataset.elType === 'apply changes') {
    if (APP_STATE.activeUser !== event.target.dataset.owner) {
      return;
    }
    const getChanges = event.target.parentNode.previousElementSibling.childNodes;
    const getNewTitle = getChanges[3].value ?? APP_STATE.tasks[event.target.id].title;

    const getNewDeadline = getChanges[7].value ?? APP_STATE.tasks[event.target.id].deadline;

    const getNewStatus = getChanges[11].value;

    APP_STATE.tasks[event.target.id].title = getNewTitle;
    APP_STATE.tasks[event.target.id].deadline = getNewDeadline;
    APP_STATE.tasks[event.target.id].taskStatus = getNewStatus;
    renderTasks();
    saveState();
  }
}
