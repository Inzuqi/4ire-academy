import { groupName, groupDeleteSel } from "../selectors";
import { APP_STATE } from "../state"; 

export function renderGroups() {
    groupName.innerHTML = '<option value="No group">No group</option>';
    groupDeleteSel.innerHTML = '';
    Object.keys(APP_STATE.groups).forEach((groupId) => {
      const group = APP_STATE.groups[groupId];
      const newOption = `
        <option id="${groupId}" class="${group.groupColor}">${group.groupTitle}</option>;
        `;
      groupName.insertAdjacentHTML('beforeend', newOption);
      groupDeleteSel.insertAdjacentHTML('beforeend', newOption);
    });
  }
  