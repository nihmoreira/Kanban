document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('add-task-form');
    const titleInput = document.getElementById('task-title');
    const columns = document.querySelectorAll('.tasks');

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const taskTitleText = titleInput.value.trim();
        if (taskTitleText === '') return;

        const newTask = document.createElement('div');
        newTask.id = 'task-' + new Date().getTime(); 
        newTask.className = 'task';
        newTask.setAttribute('draggable', 'true');

        const taskTitleElement = document.createElement('h4');
        taskTitleElement.innerText = taskTitleText;
        newTask.appendChild(taskTitleElement);

        newTask.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            
            e.target.classList.add('is-dragging');
        });

        newTask.addEventListener('dragend', (e) => {
            e.target.classList.remove('is-dragging');
        });

        document.getElementById('new-tasks-list').appendChild(newTask);
        form.reset();
        updateTaskCounts();
    });

    columns.forEach(column => {
        column.addEventListener('dragover', (evento) => {
            evento.preventDefault(); // Permite o drop.
        });

        column.addEventListener('drop', (evento) => {
            evento.preventDefault();
            
            const taskId = evento.dataTransfer.getData('text/plain');
            const draggedTask = document.querySelector(`#${taskId}`);

            if (draggedTask) {
                column.appendChild(draggedTask);
            }
            
            updateTaskCounts();
        });
    });

    function updateTaskCounts() {
        const allColumns = document.querySelectorAll('.kanban-column');
        allColumns.forEach(column => {
            const taskCount = column.querySelectorAll('.task').length;
            const countElement = column.querySelector('.task-count');
            countElement.textContent = (`${taskCount}`);

        });
    }

    updateTaskCounts();

});
