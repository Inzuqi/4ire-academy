export function newTaskTemplate (task, ownerGroup, groupColor) {
    return `
    <div class="${task.taskId}" style="display=flex" data-owner-group="${ownerGroup}">
      <div class="task" style="align-items: center; display: flex;">
        <p class="task-title">${task.title}</p>
        <p style="color: ${groupColor}">${task.groupTitle}</p>
        <p>${task.deadline}</p>
        <p>${task.taskStatus}</p>
        <button data-el-type="edit btn"  class="btn">Full view / Edit</button>
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
              <button id="${task.taskId}"class="btn" data-owner=${task.owner} data-el-type="apply changes" data-owner="${task.owner}">Apply</button>
              <button class="btn" data-el-type="close task modal">Close</button>
            </div>
          </div>
        </div>
        <button id="${task.taskId}" class="btn" data-el-type="remove task" data-owner="${task.owner}">Remove</button>
      </div>
    </div>`;
}