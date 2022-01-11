import { sidebarControls, btnClose, mainContent, sidebar } from '../selectors';

let isSidebarOpen = false;
const openSidebar = () => {
  sidebar.style.width = '149px';
  sidebar.style.borderRight = '1px solid #dddddd96';
  mainContent.style.paddingLeft = '150px';
  btnClose.style.display = 'block';
  isSidebarOpen = true;
};
export const closeSidebar = () => {
  btnClose.style.display = 'none';
  sidebar.style.width = '0px';
  sidebar.style.border = 'none';
  mainContent.style.paddingLeft = '0px';
  isSidebarOpen = false;
};
export const toggleSidebar = () => {
  if (!isSidebarOpen) {
    openSidebar();
    return;
  }
  closeSidebar();
};