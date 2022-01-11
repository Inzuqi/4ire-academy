import { addGroup, groupModal } from '../selectors';
import { APP_STATE, readLocalStorage, saveState } from '../state';
import { groupDeleteSel, color, groupOptionsModal } from '../selectors';
import { randomString } from '../utils';
import { renderGroups } from '../render/groupRender';
import { renderTasks } from '../render/taskRender';

export function buildGroup() {
  if (!addGroup.value) {
    return;
  }
  const groupTitles = Object.values(APP_STATE.groups).map((i) => i.groupTitle);
  if (groupTitles.includes(addGroup.value)) {
    return alert('This group already exists.');
  }
  const groupId = randomString();
  const newGroup = {
    groupId,
    groupColor: color.value,
    groupTitle: addGroup.value,
  };
  console.log(groupId);
  APP_STATE.groups[groupId] = newGroup;

  console.log('Group created: ', APP_STATE);
  groupModal.style.display = 'none';
  saveState();
  renderGroups();
}

export function removeGroup() {
  const groupDelId = groupDeleteSel.options[groupDeleteSel.selectedIndex].id;
  for (const obj in APP_STATE.tasks) {
    if (APP_STATE.tasks[obj].groupId === groupDelId) {
      delete APP_STATE.tasks[APP_STATE.tasks[obj].taskId];
    }
  }
  delete APP_STATE.groups[groupDelId];
  groupDeleteSel.removeChild;
  console.log(APP_STATE);
  saveState();
  renderGroups();
  renderTasks();
  groupOptionsModal.style.display = 'none';
}
