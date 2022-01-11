import { APP_STATE, saveState } from '../state';
import { renderUsers } from '../render/userRender';
import { renderTasks } from '../render/taskRender';
import { filterArrayEl } from '../utils';
import { changeUser, newUserName, userNames, getNewUserGroup, userCreateNotif } from '../selectors';

export function removeUser() {
  if (!changeUser.value) {
    return;
  }
  delete APP_STATE.users[changeUser.value];
  console.log(APP_STATE.users);
  renderUsers();
  saveState();
}

export function selectActiveUser() {
  APP_STATE.activeUser = changeUser.value;
  console.log(changeUser);
  renderUsers();
  renderTasks();
  saveState();
}

export function addUser() {
   const userNames = Object.values(APP_STATE.users).map( (i) => i.userName )
  if (!newUserName.value) {
    return;
  }
  if (userNames.includes(newUserName.value)) {
    return alert('This user already exists.');
  }
  userNames.push(newUserName.value);
  const newUser = {
    userName: newUserName.value,
    userGroupName: getNewUserGroup.value,
  };
  APP_STATE.users[newUserName.value] = newUser;
  renderUsers();
  saveState();
  console.log(userCreateNotif);
  userCreateNotif.innerText = `User ${newUserName.value} created!`;
}
