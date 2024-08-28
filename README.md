
# [Module 5] Task Master: Manage Your Project Tasks Efficiently
TaskMaster is your ultimate project management ally. With a sleek, dynamic interface, powered by jQuery and Day.js, TaskMaster makes organizing tasks a breeze. Drag, drop, and conquer your to-do list effortlessly. Love TaskMaster? Show your support!

### What I Learned From This Project
This project enhanced my skills in using jQuery for dynamic HTML and CSS updates, working with the Day.js library for date manipulations, and implementing client-side storage solutions using localStorage.

## Project Overview
Task Master is a project management tool designed to help team members organize and track the progress of their tasks efficiently. The main features include adding tasks, managing their states of progress, and tracking deadlines.

### Details 
The main tasks and objectives of the project included developing a responsive user interface, integrating the Day.js library for handling dates, and ensuring persistent storage of tasks using localStorage. Key functionalities involved creating, updating, deleting, and dragging tasks across different progress states.

## Requirements
- The project must be fully responsive.
- Use jQuery for dynamic updates.
- Integrate the Day.js library.
- Implement localStorage for task persistence.
- Provide a user-friendly interface for managing tasks.

<details>
  <summary>Agile Project Management Considerations</summary>

### 1. User Story:
    AS A project team member with multiple tasks to organize
    I WANT a task board 
    SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly

### 2. Acceptance Criteria:
    GIVEN a task board to manage a project
    WHEN I open the task board
    THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
    WHEN I view the task board for the project
    THEN each task is color-coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
    WHEN I click on the button to define a new task
    THEN I can enter the title, description, and deadline date for the new task into a modal dialog
    WHEN I click the save button for that task
    THEN the properties for that task are saved in localStorage
    WHEN I drag a task to a different progress column
    THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
    WHEN I click the delete button for a task
    THEN the task is removed from the task board and will not be added back after refreshing
    WHEN I refresh the page
    THEN the saved tasks persist

### 3. Mockup:
    The design mockup features a clean, minimalist interface with columns representing different task progress states. Tasks are color-coded based on their deadlines, and the modal dialog allows for easy task creation and editing.

![Mockup](/assets/img/mockup.gif)

### 4. Instructions for Submission:
    Submit the GitHub repository link and the URL of the deployed application. Ensure all documentation is up to date.
</details>

## Submission

GitHub repo
- https://github.com/iggys4ur/mod-05_task-master/

Deployed Application
- https://iggys4ur.github.io/mod-05_task-master/

---

## Installation
Follow these steps to install and run the project locally.

```bash
git clone https://github.com/iggys4ur/task-master <PATH_TO_DESTINATION_DIRECTORY>
```

## Usage
Visit the [Deployed Application](https://iggys4ur.github.io/mod-05_task-master/), and start managing your tasks. Use the drag-and-drop feature to update task progress and the modal dialog to create or edit tasks.

<details>
  <summary>Screenshot(s) of the web app pages</summary>
<p>&nbsp;</p>
<p>Main dashboard displaying the task list and navigation menu.</p>

![alt text](./assets/images/screenshot1.png)
<p>&nbsp;</p>
<p>Task creation modal where users can add new tasks with priority and deadline options.</p>

![alt text](./assets/images/screenshot2.png)
</details>
&nbsp;

## Credits
Special thanks to the following resources and individuals for their support and guidance.
- [Stack Overflow](https://stackoverflow.com/)
- [Reddit](https://reddit.com/)
- [GitHub Community Discussions](https://github.com/orgs/community/discussions/)
- [W3Schools HTML](https://w3schools.com/html/)
- [W3Schools CSS](https://w3schools.com/css/)
- [GitHub Documentation](https://docs.github.com/en)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- [jQuery Documentation](https://api.jquery.com/)
- [Day.js Documentation](https://day.js.org/docs/en/installation/installation)

## License

This project is licensed under the MIT License. For more information, read the LICENSE file.

---

