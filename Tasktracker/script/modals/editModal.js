export function closeEditModal(event) {
    if (event.target.dataset.elType === 'close task modal') {
      event.target.parentNode.parentNode.parentNode.style.display = 'none';
    }
  }
  