$(document).ready(function () {
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to generate a UUID
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Initialize draggable feature
    function initDraggable() {
        $(".card-body").sortable({
            connectWith: ".card-body",
            placeholder: "task-placeholder",
            start: function (event, ui) {
                ui.item.addClass("dragging");
            },
            stop: function (event, ui) {
                ui.item.removeClass("dragging");
                updateTaskStatus(ui.item);
            }
        }).disableSelection();
    }

    // Function to update task status
    function updateTaskStatus(item) {
        const taskId = item.data("id");
        const newStatus = item.closest(".card-body").attr("id");
        taskList.forEach(task => {
            if (task.id === taskId) {
                task.status = newStatus.replace("Column", "");
            }
        });
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
    }

    // Function to render the task list
    function renderTaskList() {
        $("#todoColumn, #inProgressColumn, #completedColumn, #deletedColumn").empty();
        taskList.forEach(task => {
            const taskCard = createTaskCard(task);
            $("#" + task.status + "Column").append(taskCard);
        });
    }

    // Function to create a task card
    function createTaskCard(task) {
        const taskFootnote = `
            <div class="task-footnote">
                Created by: ${task.createdBy}<br>
                @ ${task.createdAt}
            </div>
        `;

        let ribbon = "";
        if (task.status === "completed") {
            ribbon = `
                <div class="ribbon-completed">
                    Completed by:<br>
                    ${task.completedBy}<br>
                    @ ${task.completedAt}
                </div>
            `;
        } else if (task.status === "deleted") {
            ribbon = `
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
                    ${note.title}: ${note.content}
                    <div class="task-footnote">
                        Note added by: ${note.username}<br>
                        @ ${note.timestamp}
                    </div>
                </div>
            `;
        });

        let editHTML = "";
        task.edits.forEach(edit => {
            editHTML += `
                <div class="task-edit">
                    Old Versions (Click to reveal)
                    <details>
                        <summary>${edit.oldContent}</summary>
                    </details>
                    Edited by: ${edit.username}<br>
                    @ ${edit.timestamp}
                </div>
            `;
        });

        let deadlineHTML = "";
        task.deadlineUpdates.forEach(update => {
            deadlineHTML += `
                <div class="task-deadline-update">
                    DL UPDATE: ${update.oldDeadline} -> ${update.newDeadline}<br>
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
                ${ribbon}
                <h5>Task: ${task.title}</h5>
                <p>Description: ${task.description}</p>
                <p>Deadline: ${task.deadline}</p>
                ${taskFootnote}
                ${noteHTML}
                ${editHTML}
                ${deadlineHTML}
                <div class="task-buttons">
                    <button class="edit-btn btn btn-primary btn-sm">Edit</button>
                    <button class="start-btn btn btn-success btn-sm">Start</button>
                    <button class="delete-btn btn btn-danger btn-sm">Delete</button>
                </div>
            </div>
        `);

        if (task.status === "deleted") {
            card.find(".edit-btn, .start-btn, .delete-btn").remove(); // Remove buttons for deleted tasks
        }

        card.find('.delete-btn').on('click', function () {
            const username = prompt("Enter your username:");
            if (!username) {
                alert("Username is required.");
                return;
            }
            task.status = "deleted";
            task.deletedBy = username;
            task.deletedAt = dayjs().format('MM/DD/YYYY HH:mm:ss');
            renderTaskList();
            localStorage.setItem("tasks", JSON.stringify(taskList));
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
            const username = prompt("Enter your username:");

            if (title && description && deadline && username) {
                const newTask = {
                    id: generateUUID(),
                    title,
                    description,
                    deadline,
                    status: "todo",
                    createdBy: username,
                    createdAt: dayjs().format('MM/DD/YYYY HH:mm:ss'),
                    notes: [],
                    edits: [],
                    deadlineUpdates: []
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
