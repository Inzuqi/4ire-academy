import { readLocalStorage } from './state';
import { openEditModal } from './render/render';
import { renderAll } from './render/render';
import { selectActiveUser, addUser, removeUser} from './mutations/userMutation';
import { buildGroup, removeGroup} from './mutations/groupMutations';
import { buildTask, editTasks, removeTask } from './mutations/taskMutations';
import { closeEditModal } from './modals/editModal';
import { toggleSidebar, closeSidebar } from './render/sidebar';
import {
  openTaskModal,
  openGroupModal,
  taskModal,
  groupModal,
  closeTaskModal,
  closeGroupModal,
  createTask,
  createGroup,
  openGroupOptions,
  groupOptionsModal,
  closeGroupOptions,
  deleteGroup,
  openUserMenu,
  userMenu,
  createUser,
  changeUserBtn,
  deleteUser,
  sidebarControls,
  btnClose
} from './selectors';

renderAll();
readLocalStorage();

changeUserBtn.addEventListener('click', selectActiveUser);
createUser.addEventListener('click', addUser);
deleteUser.addEventListener('click', removeUser);
createTask.addEventListener('click', buildTask);
createGroup.addEventListener('click', buildGroup);
deleteGroup.addEventListener('click', removeGroup);
sidebarControls.addEventListener('click', toggleSidebar);
btnClose.addEventListener('click', closeSidebar);
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
--proper module practices. Learn how-to. 
--DL: 11.01, 19:30, 9h to go.

--diagrams???? fuck if I know


--NAMING
--code spaghetti cleanup
*/
