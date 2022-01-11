import { renderGroups } from './groupRender';
import { renderTasks } from './taskRender';
import { renderUsers } from './userRender';
import { APP_STATE } from '../state';

export function openEditModal(event) {
  if (event.target.dataset.elType === 'edit btn') {
    event.target.nextElementSibling.style.display = 'flex';
  }
}

export function renderAll() {
  renderUsers();
  renderGroups();
  renderTasks();
}
