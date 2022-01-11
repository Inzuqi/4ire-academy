import { changeUser, displayUserName } from "../selectors";
import { APP_STATE } from "../state";

export function renderUsers() {
    changeUser.innerHTML = '';
    Object.keys(APP_STATE.users).forEach((userName) => {
      const users = APP_STATE.users[userName].userName;
      const newUser = `
          <option id="${users}">${users}</option>
        `;
      changeUser.insertAdjacentHTML('beforeend', newUser);
    });
    displayUserName.innerText = `Hi there ${APP_STATE.activeUser ?? ''}! This is your ${
      APP_STATE.users[APP_STATE.activeUser]?.userGroupName ?? ''
    } tasktracker.`;
  }
  