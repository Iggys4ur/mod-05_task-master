$(document).ready(function () {
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    const deletedTasks = JSON.parse(localStorage.getItem("deleted")) || [];

    // Prompt user for username on page load
    let currentUser = prompt("Please enter your username:");

    if (!currentUser) {
        currentUser = "Guest"; // Default username if none is provided
    }

    // Function to generate a UUID
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Initialize draggable feature
    function initDraggable() {
        $(".task-column").sortable({
            connectWith: ".task-column",
            placeholder: "task-placeholder",
            start: function (event, ui) {
                ui.item.addClass("dragging");
            },
            stop: function (event, ui) {
                ui.item.removeClass("dragging");
                updateTaskStatus(ui.item);
            }
        }).disableSelection();
        $("#deleted").sortable("disable"); // Disable dragging in/out of the Deleted column
    }

    // Function to update task status
    function updateTaskStatus(item) {
        const taskId = item.data("id");
        const newStatus = item.closest(".task-column").attr("id");
        taskList.forEach(task => {
            if (task.id === taskId) {
                task.status = newStatus;
            }
        });
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
    }

    // Function to render the task list
    function renderTaskList() {
        $("#to-do, #in-progress, #done, #deleted").empty();
        taskList.forEach(task => {
            const taskCard = createTaskCard(task);
            $("#" + task.status).append(taskCard);
        });
        deletedTasks.forEach(task => {
            const taskCard = createTaskCard(task);
            $("#deleted").append(taskCard);
        });
    }

    // Function to create a task card
    function createTaskCard(task) {
        task.notes = task.notes || [];
        task.edits = task.edits || [];
        task.deadlineUpdates = task.deadlineUpdates || [];

        const taskFootnote = `
            <div class="task-footnote">
                Created by: ${task.createdBy}<br>
                @ ${task.createdAt}
            </div>
        `;

        let ribbons = "";
        if (task.status === "done") {
            ribbons += `
                <div class="ribbon-completed">
                    Completed by:<br>
                    ${task.completedBy}<br>
                    @ ${task.completedAt}
                </div>
            `;
        }
        if (task.status === "deleted") {
            ribbons += `
                <div class="ribbon-deleted">
                    Deleted by:<br>
                    ${task.deletedBy}<br>
                    @ ${task.deletedAt}
                </div>
            `;
        }

        let noteHTML = "";
        task.notes.forEach(note => {
            noteHTML += `
                <div class="task-note">
                    <strong>Note:</strong> ${note.title}: ${note.content}
                    <div class="task-footnote">
                        Note added by: ${note.username}<br>
                        @ ${note.timestamp}
                    </div>
                </div>
            `;
        });

        let deadlineHTML = "";
        task.deadlineUpdates.forEach(update => {
            deadlineHTML += `
                <div class="task-deadline-update">
                    <strong>DL UPDATE:</strong> ${update.oldDeadline} -> ${update.newDeadline}<br>
                    Reason: ${update.reason}
                    <div class="task-footnote">
                        Deadline updated by: ${update.username}<br>
                        @ ${update.timestamp}
                    </div>
                </div>
            `;
        });

        const card = $(`
            <div class="task-card" data-id="${task.id}">
                ${ribbons}
                <h5>Task: ${task.title}</h5>
                <p>Description: ${task.description}</p>
                <p>Deadline: ${task.deadline}</p>
                ${taskFootnote}
                ${noteHTML}
                ${deadlineHTML}
                <div class="task-buttons"></div>
            </div>
        `);

        const buttonsContainer = card.find('.task-buttons');

        if (task.status === "to-do") {
            buttonsContainer.append(`
                <button class="edit-btn btn btn-primary btn-sm">Edit</button>
                <button class="start-btn btn btn-success btn-sm">Start</button>
                <button class="delete-btn btn btn-danger btn-sm">Delete</button>
            `);

            card.find('.edit-btn').on('click', function () {
                $('#edit-task-title').val(task.title);
                $('#edit-task-desc').val(task.description);
                $('#edit-task-deadline').val(task.deadline);
                const myModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
                myModal.show();
                $('#saveEditTaskButton').off('click').on('click', function () {
                    task.title = $('#edit-task-title').val();
                    task.description = $('#edit-task-desc').val();
                    task.deadline = $('#edit-task-deadline').val();
                    task.edits.push({
                        oldContent: `Task: ${task.title}, Description: ${task.description}, Deadline: ${task.deadline}`,
                        username: currentUser,
                        timestamp: dayjs().format('MM/DD/YYYY HH:mm:ss')
                    });
                    localStorage.setItem("tasks", JSON.stringify(taskList));
                    myModal.hide();
                    renderTaskList();
                });
            });

            card.find('.start-btn').on('click', function () {
                task.status = "in-progress";
                localStorage.setItem("tasks", JSON.stringify(taskList));
                renderTaskList();
            });
        } else if (task.status === "in-progress") {
            buttonsContainer.append(`
                <button class="add-note-btn btn btn-info btn-sm">Add Note</button>
                <button class="update-deadline-btn btn btn-warning btn-sm">Update Deadline</button>
                <button class="complete-btn btn btn-success btn-sm">Complete</button>
                <button class="delete-btn btn btn-danger btn-sm">Delete</button>
            `);

            card.find('.add-note-btn').on('click', function () {
                const noteTitle = prompt("Enter note title:");
                const noteContent = prompt("Enter note content:");
                if (noteTitle && noteContent) {
                    task.notes.push({
                        title: noteTitle,
                        content: noteContent,
                        username: currentUser,
                        timestamp: dayjs().format('MM/DD/YYYY HH:mm:ss')
                    });
                    localStorage.setItem("tasks", JSON.stringify(taskList));
                    renderTaskList();
                }
            });

            card.find('.update-deadline-btn').on('click', function () {
                const newDeadline = prompt("Enter new deadline (MM/DD/YYYY):");
                const reason = prompt("Reason for changing deadline:");
                if (newDeadline && reason) {
                    task.deadlineUpdates.push({
                        oldDeadline: task.deadline,
                        newDeadline: newDeadline,
                        reason: reason,
                        username: currentUser,
                        timestamp: dayjs().format('MM/DD/YYYY HH:mm:ss')
                    });
                    task.deadline = newDeadline;
                    localStorage.setItem("tasks", JSON.stringify(taskList));
                    renderTaskList();
                }
            });

            card.find('.complete-btn').on('click', function () {
                task.status = "done";
                task.completedBy = currentUser;
                task.completedAt = dayjs().format('MM/DD/YYYY HH:mm:ss');
                localStorage.setItem("tasks", JSON.stringify(taskList));
                renderTaskList();
            });
        } else if (task.status === "done") {
            buttonsContainer.append(`
                <button class="delete-btn btn btn-danger btn-sm">Delete</button>
            `);
        }

        card.find('.delete-btn').on('click', function () {
            task.status = "deleted";
            task.deletedBy = currentUser;
            task.deletedAt = dayjs().format('MM/DD/YYYY HH:mm:ss');
            deletedTasks.push(task);
            taskList.splice(taskList.findIndex(t => t.id === task.id), 1);
            localStorage.setItem("tasks", JSON.stringify(taskList));
            localStorage.setItem("deleted", JSON.stringify(deletedTasks));
            renderTaskList();
        });

        return card;
    }

    // Event handler for adding a new task
    $('#addTaskButton').on('click', function () {
        const myModal = new bootstrap.Modal(document.getElementById('addTaskModal'));
        myModal.show();

        $('#saveTaskButton').off('click').on('click', function () {
            const title = $('#task-title').val();
            const description = $('#task-desc').val();
            const deadline = $('#task-deadline').val();

            if (title && description && deadline) {
                const newTask = {
                    id: generateUUID(),
                    title,
                    description,
                    deadline,
                    status: "to-do",
                    createdBy: currentUser,
                    createdAt: dayjs().format('MM/DD/YYYY HH:mm:ss'),
                    notes: [],  // Initialize as empty array
                    edits: [],  // Initialize as empty array
                    deadlineUpdates: []  // Initialize as empty array
                };
                taskList.push(newTask);
                localStorage.setItem("tasks", JSON.stringify(taskList));
                myModal.hide();
                renderTaskList();
            } else {
                alert("Please fill in all fields.");
            }
        });
    });

    // Initial render and setup
    renderTaskList();
    initDraggable();
});
