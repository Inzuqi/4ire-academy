export const APP_STATE = {
  groups: {},
  tasks: {},
  users: {},
  activeUser: '',
};

export function readLocalStorage() {
  if (localStorage.savedState) {
    const { groups, tasks, users, activeUser } = JSON.parse(localStorage.savedState);
    APP_STATE.groups = groups;
    APP_STATE.tasks = tasks;
    APP_STATE.users = users;
    APP_STATE.activeUser = activeUser;
  }
}

export function saveState() {
  localStorage.setItem('savedState', JSON.stringify(APP_STATE));
}
