import { taskList } from "../selectors";
import { APP_STATE } from "../state";
import { newTaskTemplate } from './htmlTemplates/taskTemplate';

export function renderTasks() {
    taskList.innerHTML = '';
    Object.keys(APP_STATE.tasks).forEach((taskId) => {
      const groupId = APP_STATE.tasks[taskId].groupId;
      const groupColor = APP_STATE.groups?.[groupId]?.groupColor ?? '';
      const task = APP_STATE.tasks[taskId];
      const owner = task.owner;
      const ownerGroup = APP_STATE.users[owner]?.userGroupName;
      const activeUserGroup = APP_STATE.users[APP_STATE.activeUser]?.userGroupName ?? '';
      console.log(APP_STATE);
      if (activeUserGroup !== ownerGroup) {
        return;
      }
      taskList.insertAdjacentHTML('beforeend', newTaskTemplate(task, ownerGroup, groupColor));
    });
  }
