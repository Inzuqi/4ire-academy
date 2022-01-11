import { APP_STATE } from './state';
import { randomString, checkValue, getCurrentDate, filterArrayEl } from './utils';
import {
  sidebarControls,
  sidebar,
  btnClose,
  mainContent,
  openTaskModal,
  openGroupModal,
  taskModal,
  groupModal,
  closeTaskModal,
  closeGroupModal,
  createTask,
  taskName,
  groupName,
  color,
  addGroup,
  createGroup,
  taskList,
  deadline,
  openGroupOptions,
  groupOptionsModal,
  groupDeleteSel,
  closeGroupOptions,
  deleteGroup,
  openUserMenu,
  userMenu,
  changeUser,
  newUserName,
  createUser,
  changeUserBtn,
  getNewUserGroup,
  deleteUser,
  displayUserName,
} from './selectors';

const groupTitles = [];
let userNames = [];
let timestamps =[];
let activeUser;

function readLocalStorage() {
  if (localStorage.savedState) {
    const parsedSavedState = JSON.parse(localStorage.savedState);
    APP_STATE.groups = parsedSavedState.groups;
    APP_STATE.tasks = parsedSavedState.tasks;
    APP_STATE.users = parsedSavedState.users;
    renderTasks();
    renderGroups();
    renderUsers();
  }
}

function saveState() {
  localStorage.setItem('savedState', JSON.stringify(APP_STATE));
}

readLocalStorage();

function selectActiveUser() {
  activeUser = changeUser.value;
  console.log(changeUser);
  renderUsers();
  renderTasks();
  saveState();
}

function addUser() {
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
}

function renderUsers() {
  changeUser.innerHTML = '';
  Object.keys(APP_STATE.users).forEach((userName) => {
    const users = APP_STATE.users[userName].userName;
    const newUser = `
      <option id="${users}">${users}</option>
    `;
    changeUser.insertAdjacentHTML('beforeend', newUser);
  });
  displayUserName.innerText = `Hi there ${activeUser ?? ''}! This is your ${
    APP_STATE.users[activeUser]?.userGroupName ?? ''
  } tasktracker.`;
}

function removeUser() {
  if (!changeUser.value) {
    return;
  }
  delete APP_STATE.users[changeUser.value];
  console.log(APP_STATE.users);
  filterArrayEl(userNames, APP_STATE.users[changeUser.value]);
  renderUsers();
  saveState();
}

let isSidebarOpen = false;

const openSidebar = () => {
  sidebar.style.width = '149px';
  sidebar.style.borderRight = '1px solid #dddddd96';
  mainContent.style.paddingLeft = '150px';
  btnClose.style.display = 'block';
  isSidebarOpen = true;
};
const closeSidebar = () => {
  btnClose.style.display = 'none';
  sidebar.style.width = '0px';
  sidebar.style.border = 'none';
  mainContent.style.paddingLeft = '0px';
  isSidebarOpen = false;
};
const toggleSidebar = () => {
  if (!isSidebarOpen) {
    openSidebar();
    return;
  }
  closeSidebar();
};

function renderGroups() {
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

function renderTasks() {
  taskList.innerHTML = '';
  Object.keys(APP_STATE.tasks).forEach((taskId) => {
    const groupId = APP_STATE.tasks[taskId].groupId;
    const groupColor = APP_STATE.groups?.[groupId]?.groupColor ?? '';
    const task = APP_STATE.tasks[taskId];
    const owner = APP_STATE.tasks[taskId].owner;
    const ownerGroup = APP_STATE.users[owner].userGroupName;
    const activeUserGroup = APP_STATE.users[activeUser]?.userGroupName ?? '';
    console.log(APP_STATE);
    if (activeUserGroup !== ownerGroup) {
      return;
    }
    const newTask = `
      <div class="${task.taskId}" style="display=flex" data-owner-group="${ownerGroup}">
        <div class="task" style="align-items: center; display: flex;">
          <p class="task-title">${task.title}</p>
          <p style="color: ${groupColor}">${task.groupTitle}</p>
          <p>${task.deadline}</p>
          <p>${task.taskStatus}</p>
          <button data-el-type="edit btn" class="btn">Full view / Edit</button>
          <div class="modal" data-modal-type="task modal">
            <div class="modal-content-edit" id="task-edit-modal-content">
              <div class="full-info">
                <p class="edit-full-info">Title: ${task.title}</p>
                <p class="edit-full-info">Group: ${task.groupTitle}</p>
                <p class="edit-full-info">Deadline: ${task.deadline}</p>
                <p class="edit-full-info">Status: ${task.taskStatus}</p>
              </div>
              <div class="edit-field">
                <label for="task-title-edit">Set new task title:</label>
                <input id="task-title-edit" />
                <label for="task-deadline-edit">Set new task deadline:</label>
                <input type="datetime-local" id="task-deadline-edit" />
                <label for="task-status-edit">Set new task status:</label>
                <select id="task-status-edit">
                  <option>In progress</option>
                  <option>Finished</option>
                </select>
              </div>
              <div class="control-btn">
                <button id="${task.taskId}"class="btn" data-el-type="apply changes" data-owner="${task.owner}">Apply</button>
                <button class="btn" data-el-type="close task modal">Close</button>
              </div>
            </div>
          </div>
          <button id="${task.taskId}" class="btn" data-el-type="remove task" data-owner="${task.owner}">Remove</button>
        </div>
      </div>`;
    taskList.insertAdjacentHTML('beforeend', newTask);
  });
}

function openEditModal(event) {
  if (event.target.dataset.elType === 'edit btn') {
    event.target.nextElementSibling.style.display = 'flex';
  }
}
function getTaskEndTime (task) {
  if (task.taskStatus === "Finished") {
    timestamps.push(task[taskStatus]);
  }
  
}
function removeTask(event) {
  if (event.target.dataset.elType == 'remove task') {
    if (activeUser !== event.target.dataset.owner) {
      return;
    }
    event.target.parentNode.parentNode.remove();
    delete APP_STATE.tasks[event.target.id];
    console.log('active user: ', activeUser);
    console.log('dataset owner of target:', event.target.dataset.owner);
    saveState();
    renderTasks();
  }
}

function closeEditModal(event) {
  if (event.target.dataset.elType === 'close task modal') {
    event.target.parentNode.parentNode.parentNode.style.display = 'none';
  }
}

function editTasks(event) {
  if (event.target.dataset.elType === 'apply changes') {
    if (activeUser !== event.target.dataset.owner) {
      return;
    }
    let getChanges = event.target.parentNode.previousElementSibling.childNodes;
    let getNewTitle = getChanges[3].value 
      ? getChanges[3].value 
      : APP_STATE.tasks[event.target.id].title;
    let getNewDeadline = getChanges[7].value
      ? getChanges[7].value
      : APP_STATE.tasks[event.target.id].deadline;
    let getNewStatus = getChanges[11].value;
    APP_STATE.tasks[event.target.id].title = getNewTitle;
    APP_STATE.tasks[event.target.id].deadline = getNewDeadline;
    APP_STATE.tasks[event.target.id].taskStatus = getNewStatus;
    renderTasks();
    saveState();
  }
}

function buildGroup() {
  if (!addGroup.value) {
    return;
  }
  if (groupTitles.includes(addGroup.value)) {
    return alert('This group already exists.');
  }
  groupTitles.push(addGroup.value);
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

function buildTask() {
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
    owner: activeUser,
  };
  APP_STATE.tasks[taskId] = newTask;
  console.log('Task created: ', APP_STATE);
  taskModal.style.display = 'none';
  saveState();
  renderTasks();
}

function removeGroup() {
  const groupDelId = groupDeleteSel.options[groupDeleteSel.selectedIndex].id;
  const groupDelTitle = groupDeleteSel.options[groupDeleteSel.selectedIndex].value;
  filterArrayEl(groupTitles, groupDelTitle);

  for (obj in APP_STATE.tasks) {
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
changeUserBtn.addEventListener('click', selectActiveUser);
createUser.addEventListener('click', addUser);
deleteUser.addEventListener('click', removeUser);
sidebarControls.addEventListener('click', toggleSidebar);
btnClose.addEventListener('click', closeSidebar);
createTask.addEventListener('click', buildTask);
createGroup.addEventListener('click', buildGroup);
deleteGroup.addEventListener('click', removeGroup);
window.document.addEventListener('click', editTasks);
window.document.addEventListener('click', removeTask);
window.document.addEventListener('click', openEditModal);
window.document.addEventListener('click', closeEditModal);
openTaskModal.addEventListener('click', () => (taskModal.style.display = 'flex'));
closeTaskModal.addEventListener('click', () => (taskModal.style.display = 'none'));
openGroupModal.addEventListener('click', () => (groupModal.style.display = 'flex'));
closeGroupModal.addEventListener('click', () => (groupModal.style.display = 'none'));
openGroupOptions.addEventListener('click', () => (groupOptionsModal.style.display = 'flex'));
closeGroupOptions.addEventListener('click', () => (groupOptionsModal.style.display = 'none'));
openUserMenu.addEventListener('click', () => (userMenu.style.display = 'flex'));

/*
todo: 
--status save (when changing task status save date-time (learn how to get current date-time, store it in app_state.tasks?), remove if mistake);
--add edit button (add owner info)
--if user isn't owner, remove edit button (check current user, throw userId/username into tasks and groups)
--proper module practices. Learn how-to. 
--DL: 11.01, 19:30, 9h to go.

--diagrams???? fuck if I know


--NAMING
--code spaghetti cleanup
*/
