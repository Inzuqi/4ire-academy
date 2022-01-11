const sidebarControls = document.querySelector('.img');
const sidebar = document.querySelector('.sidebar');
const btnClose = document.querySelector('.btn-close');
const mainContent = document.querySelector('.main');
const openTaskModal = document.querySelector('#task-options');
const openGroupModal = document.querySelector('#group-create');
const taskModal = document.querySelector('#entities-tasks-modal');
const groupModal = document.querySelector('#entities-group-creation-modal');
const closeTaskModal = document.querySelector('#task-modal-close');
const closeGroupModal = document.querySelector('#group-modal-close');
const createTask = document.querySelector('#task-add-btn');
const taskName = document.querySelector('#taskname');
const groupName = document.querySelector('#selected-group');
const color = document.querySelector('#group-colors');
const addGroup = document.querySelector('#groupname');
const createGroup = document.querySelector('#group-add-btn');
const taskList = document.querySelector('.tasks');
const deadline = document.querySelector('#deadline');
const openGroupOptions = document.querySelector('#group-options');
const groupOptionsModal = document.querySelector('#group-options-modal');
const groupDeleteSel = document.querySelector('#groups-deletion');
const closeGroupOptions = document.querySelector('#group-options-modal-close');
const deleteGroup = document.querySelector('#group-del-btn');

const openUserMenu = document.querySelector('#user-menu');
const displayUserName = document.querySelector('#userNameDisplay');
const userMenu = document.querySelector('#user-modal');
const changeUser = document.querySelector('#change-user');
const currentUserGroup = document.querySelector('#curr-user-group');
const changeUserBtn = document.querySelector('#select-user-btn');
const newUserName = document.querySelector('#new-user');
const getNewUserGroup = document.querySelector('#select-user-group');
const createUser = document.querySelector('#user-create');
const deleteUser = document.querySelector('#delete-user-btn');

export {
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
  currentUserGroup,
  newUserName,
  createUser,
  changeUserBtn,
  getNewUserGroup,
  deleteUser,
  displayUserName
};
