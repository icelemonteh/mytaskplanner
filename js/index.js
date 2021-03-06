// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);
// console.log(taskManager); // for testing
// console.log(taskManager.tasks.length); // for testing

// testing inserting a new task into tasks array
// taskManager.addTask("name1", "description1", "assignedT person1", "20/02/2023");
// taskManager.addTask("name2", "description2", "assignedT person2", "20/02/2024", "in progress");

// console.log(taskManager.tasks); // returns tasks [{}]

// to print the name of tasks with index 0
// console.log(taskManager.tasks[0].name); // returns name1



// testing createTaskHtml
const taskHtml = createTaskHtml();
// console.log(taskHtml);

// Finding and Display the Date Object
const dateElement = document.querySelector("#date-element");
let today = new Date();
const [month, day, year] = [today.getMonth() + 1, today.getDate(), today.getFullYear()];
let dateString = `Current Date: ${day}/${month}/${year}`;
dateElement.innerHTML = dateString;

// Load the tasks from localStorage
taskManager.load();
// Render the loaded tasks to the page
taskManager.render();

// capitalise first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Validating form

const editTaskForm = document.getElementById('editTaskForm'); 
const addToListTaskForm = document.getElementById('addToListTaskForm'); 
const addListTaskNameEl = document.getElementById('listTaskName');
const addListTaskDescriptionEl = document.getElementById('listTaskDescription');
const addListAssignedToEl = document.getElementById('listAssignedTo');
const addListTaskDueDateEl = document.getElementById('listTaskDueDate');
const addListTaskStatusEl = document.getElementById('listTaskStatus');
const addListTaskPriorityEl = document.getElementById('listTaskPriority');
const editTaskNameEl = document.getElementById('editTaskName');
const editTaskDescriptionEl = document.getElementById('editTaskDescription');
const editAssignedToEl = document.getElementById('editAssignedTo');
const editTaskListNameEl = document.getElementById('editTaskListName');
const editTaskDueDateEl = document.getElementById('editTaskDueDate');
const editTaskStatusEl = document.getElementById('editTaskStatus');
const editTaskPriorityEl = document.getElementById('editTaskPriority');
const tasksListHtml = document.getElementById('tasksList');
const buttonIconsEl = document.getElementsByClassName('button-icons');
const deleteTaskModalEl = document.getElementById('deleteTaskModal');
const errorMsgEl = document.getElementById("errorMsg");

// The following isRequired() function returns true if the input argument is empty:
const isRequired = value => value === '' ? false : true; // ternary operator - if empty, return false & if not empty, return true

// The following isBetween() function returns false if the length argument is not between min and max argument:
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// The following isMinLength() function returns false if the length argument is not more than the min argument:
const isMinLength = (length, min) => length < min ? false : true;

// The following isMaxLength() function returns false if the length argument is more than the max argument:
const isMaxLength = (length, max) => length > max ? false : true;

// The following isPast() function returns false if date has passed
const isPast = (firstDate, secondDate) => firstDate > secondDate ? false : true;

// showError functions to show error / success
// The following showError() function highlights the border of the input field and displays an error message if the input field is invalid:
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}








// console.log(taskManager.tasks)

// VALIDATING ADD TO LIST FORM
const addListCheckTaskName = () => {
    let valid = false;
    const min = 5;
    const max = 30;
    const taskName = addListTaskNameEl.value.trim();

    if(!isRequired(taskName)) {
        showError(addListTaskNameEl, 'Task name cannot be empty.');
    } else if (!isBetween(taskName.length, min, max)) {
        showError(addListTaskNameEl, `Task name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(addListTaskNameEl);
        valid = true;
    }
    return valid;
};

const addListCheckTaskDescription = () => {
    let valid = false;
    const min = 5;
    const taskDescription = addListTaskDescriptionEl.value.trim();

    if(!isRequired(taskDescription)) {
        showError(addListTaskDescriptionEl, 'Description cannot be empty.');
    } else if (!isMinLength(taskDescription.length, min)) {
        showError(addListTaskDescriptionEl, `Description must be more than ${min} characters.`)
    } else {
        showSuccess(addListTaskDescriptionEl);
        valid = true;
    }
    return valid;
};

const addListCheckAssignedTo = () => {
    let valid = false;
    const min = 5;
    const max = 30;
    const taskAssignedTo = addListAssignedToEl.value.trim();

    if(!isRequired(taskAssignedTo)) {
        showError(addListAssignedToEl, 'Name cannot be empty.');
    } else if (!isBetween(taskAssignedTo.length, min, max)) {
        showError(addListAssignedToEl, `Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(addListAssignedToEl);
        valid = true;
    }
    return valid;
};


const addListCheckDueDate = () => {
    let valid = false;
    const newTaskDueDate = addListTaskDueDateEl.value;
    
    // Getting today's date for comparison & reformatting it to yyyy-mm-dd
    let todayDate = new Date();
    let dd = String(todayDate.getDate()).padStart(2, '0');
    let mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = todayDate.getFullYear();
    todayDate = yyyy + '-' + mm + '-' + dd;

    if(!isRequired(newTaskDueDate)) {
        showError(addListTaskDueDateEl, 'Due date cannot be empty.');
    } else if (!isPast(todayDate, newTaskDueDate)) {
        showError(addListTaskDueDateEl, `Due date cannot be in the past.`)
    } else {
        showSuccess(addListTaskDueDateEl);
        valid = true;
    }
    return valid;
};

const addListCheckStatus = () => {
    let valid = false;
    const taskStatus = addListTaskStatusEl.value.trim();

    if(!isRequired(taskStatus)) {
        showError(addListTaskStatusEl, 'Please select an option.');
    } else {
        showSuccess(addListTaskStatusEl);
        valid = true;
    }
    return valid;
};

const addListValidateTaskForm = function() {

    // validate form
    let isTaskNameValid = addListCheckTaskName(),
        isTaskDescriptionValid = addListCheckTaskDescription(),
        isAssignedToValid = addListCheckAssignedTo(),
        isDueDateValid = addListCheckDueDate(),
        isStatusValid = addListCheckStatus();
    

    // submit to server if the form is valid
    let isFormValid = isTaskNameValid && 
        isTaskDescriptionValid && isAssignedToValid &&
        isDueDateValid && isStatusValid;


    if(isFormValid) {
        addToListTaskForm.submit();
    }
};

// Resetting form's error message and border colour
addToListTaskForm.addEventListener('reset', function() {
    
    addListTaskNameEl.parentElement.querySelector('small').innerText = '';
    addListTaskNameEl.parentElement.classList.remove('error', 'success');
    
    addListTaskDescriptionEl.parentElement.querySelector('small').innerText = '';
    addListTaskDescriptionEl.parentElement.classList.remove('error', 'success');
    
    addListAssignedToEl.parentElement.querySelector('small').innerText = '';
    addListAssignedToEl.parentElement.classList.remove('error', 'success');
    
    addListTaskDueDateEl.parentElement.querySelector('small').innerText = '';
    addListTaskDueDateEl.parentElement.classList.remove('error', 'success');
    
    addListTaskStatusEl.parentElement.querySelector('small').innerText = '';
    addListTaskStatusEl.parentElement.classList.remove('error', 'success');
    
});

addToListTaskForm.addEventListener('submit', function(event) {
    // prevent the form from submitting
    event.preventDefault();

    

    // validate form
    let isTaskNameValid = addListCheckTaskName(),
        isTaskDescriptionValid = addListCheckTaskDescription(),
        isAssignedToValid = addListCheckAssignedTo(),
        isDueDateValid = addListCheckDueDate(),
        isStatusValid = addListCheckStatus();
    
    // submit to server if the form is valid
    let isFormValid = isTaskNameValid && 
        isTaskDescriptionValid && isAssignedToValid &&
        isDueDateValid && isStatusValid;

    if(isFormValid) {
        // addNewTaskForm.submit(); // commented out to prevent form from being submitted
        // Getting the values of the inputs
        const name = capitalizeFirstLetter(addListTaskNameEl.value);
        const description = capitalizeFirstLetter(addListTaskDescriptionEl.value);
        const assignedTo = capitalizeFirstLetter(addListAssignedToEl.value);
        const dueDate = capitalizeFirstLetter(addListTaskDueDateEl.value);
        let status = capitalizeFirstLetter(addListTaskStatusEl.value);
        const priority = capitalizeFirstLetter(addListTaskPriorityEl.value);

        // Adding task to the taskManager
        taskManager.addTask(name, description, assignedTo, dueDate, status, priority);
        
        // saving tasks persistently on local storage
        taskManager.save()

        taskManager.render();


        console.log(taskManager.tasks); // to check tasks
        // console.log(tasksListHtml.innerHTML); // to check HTML for tasksList

        // Clear form
        addListTaskNameEl.value = '';
        addListTaskDescriptionEl.value = '';
        addListAssignedToEl.value = '';
        addListTaskDueDateEl.value = '';
        addListTaskStatusEl.value = ''; 
        addListTaskPriorityEl.value = '';

        // reset border colour to red
        addListTaskNameEl.parentElement.classList.remove('error', 'success');
        
        addListTaskDescriptionEl.parentElement.classList.remove('error', 'success');
        
        addListAssignedToEl.parentElement.classList.remove('error', 'success');
        
        addListTaskDueDateEl.parentElement.classList.remove('error', 'success');
        
        addListTaskStatusEl.parentElement.classList.remove('error', 'success');
        
        // close modal form
        $('#addToListModal').modal('hide'); // or $('#IDModal').modal('toggle');
    }
});

tasksListHtml.onclick = checkboxDeleteFunction;
let task;
function checkboxDeleteFunction(event) {
    if (event.target.classList.contains('done-checkbox')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        // console.log(parentTask)
        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);
        // console.log(taskId)
        // Get the task from the TaskManager using the taskId
        const task = taskManager.getTaskById(taskId);
        // console.log(task)
        // Update the task status to 'Done'
        
        task.status = 'Done';
        // console.log(task);

        console.log(taskManager.tasks); // to check tasks

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();

        // console.log(parentTask); // to check on parentTask
    }

    // document.getElementById('deleteButton').addEventListener('click', function() {
    // Check if a "Delete" button was clicked
    if (event.target.classList.contains("delete-button")) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        // console.log(parentTask);

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);
        // console.log(taskId);

        // Delete the task
        taskManager.deleteTask(taskId);

        console.log(taskManager.tasks); // to check tasks

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }
    

    document.getElementById('saveButton').addEventListener('click', function() {
        if (event.target.classList.contains("edit-button")) {
            const parentTask = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                // console.log(parentTask)
                // Get the taskId of the parent Task.
            const taskId = Number(parentTask.dataset.taskId);
            console.log(taskId);
            // Get the task from the TaskManager using the taskId
            const task = taskManager.getTaskById(taskId);
            console.log(task);
            // Updating task element values
            let isTaskNameValid = editCheckTaskName(),
                isTaskDescriptionValid = editCheckTaskDescription(),
                isAssignedToValid = editCheckAssignedTo(),
                isDueDateValid = editCheckDueDate(),
                isStatusValid = editListCheckStatus();
            

            // submit to server if the form is valid
            let isFormValid = isTaskNameValid && 
                isTaskDescriptionValid && isAssignedToValid
                && isDueDateValid && isStatusValid;


            if(isFormValid) {
                // editTaskForm.submit();
                task.name = capitalizeFirstLetter(editTaskNameEl.value);
                task.description = capitalizeFirstLetter(editTaskDescriptionEl.value);
                task.assignedTo = capitalizeFirstLetter(editAssignedToEl.value);
                task.dueDate = capitalizeFirstLetter(editTaskDueDateEl.value);
                task.status = capitalizeFirstLetter(editTaskStatusEl.value);
                task.priority = capitalizeFirstLetter(editTaskPriorityEl.value);

                console.log(taskManager.tasks); // to check tasks

                // Save the tasks to localStorage
                taskManager.save();

                // Render the tasks
                taskManager.render();

                editTaskForm.submit();
            }
        
        }
    });

};




// VALIDATING EDIT FORM
const editCheckTaskName = () => {
    let valid = false;
    const min = 5;
    const max = 30;
    const taskName = editTaskNameEl.value.trim();

    if(!isRequired(taskName)) {
        showError(editTaskNameEl, 'Task name cannot be empty.');
    } else if (!isBetween(taskName.length, min, max)) {
        showError(editTaskNameEl, `Task name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(editTaskNameEl);
        valid = true;
    }
    return valid;
};

const editCheckTaskDescription = () => {
    let valid = false;
    const min = 5;
    const taskDescription = editTaskDescriptionEl.value.trim();

    if(!isRequired(taskDescription)) {
        showError(editTaskDescriptionEl, 'Description cannot be empty.');
    } else if (!isMinLength(taskDescription.length, min)) {
        showError(editTaskDescriptionEl, `Description must be more than ${min} characters.`)
    } else {
        showSuccess(editTaskDescriptionEl);
        valid = true;
    }
    return valid;
};

const editCheckAssignedTo = () => {
    let valid = false;
    const min = 5;
    const max = 30;
    const taskAssignedTo = editAssignedToEl.value.trim();

    if(!isRequired(taskAssignedTo)) {
        showError(editAssignedToEl, 'Name cannot be empty.');
    } else if (!isBetween(taskAssignedTo.length, min, max)) {
        showError(editAssignedToEl, `Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(editAssignedToEl);
        valid = true;
    }
    return valid;
};

const editCheckListName = () => {
    let valid = false;
    const newListName = editTaskListNameEl.value.trim();

    if(!isRequired(newListName)) {
        showError(editTaskListNameEl, 'List name cannot be empty.');
    } else {
        showSuccess(editTaskListNameEl);
        valid = true;
    }
    return valid;
};

const editCheckDueDate = () => {
    let valid = false;
    const newTaskDueDate = editTaskDueDateEl.value;
    
    // Getting today's date for comparison & reformatting it to yyyy-mm-dd
    let todayDate = new Date();
    let dd = String(todayDate.getDate()).padStart(2, '0');
    let mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = todayDate.getFullYear();
    todayDate = yyyy + '-' + mm + '-' + dd;

    if(!isRequired(newTaskDueDate)) {
        showError(editTaskDueDateEl, 'Due date cannot be empty.');
    } else if (!isPast(todayDate, newTaskDueDate)) {
        showError(editTaskDueDateEl, `Due date cannot be in the past.`)
    } else {
        showSuccess(editTaskDueDateEl);
        valid = true;
    }
    return valid;
};

const editListCheckStatus = () => {
    let valid = false;
    const taskStatus = editTaskStatusEl.value.trim();

    if(!isRequired(taskStatus)) {
        showError(editTaskStatusEl , 'Please select an option.');
    } else {
        showSuccess(editTaskStatusEl);
        valid = true;
    }
    return valid;
};


const editValidateTaskForm = function() {

    // validate form
    let isTaskNameValid = editCheckTaskName(),
        isTaskDescriptionValid = editCheckTaskDescription(),
        isAssignedToValid = editCheckAssignedTo(),
        isDueDateValid = editCheckDueDate(),
        isStatusValid = editListCheckStatus();
    

    // submit to server if the form is valid
    let isFormValid = isTaskNameValid && 
        isTaskDescriptionValid && isAssignedToValid
        && isDueDateValid && isStatusValid;


    if(isFormValid) {
        task.name = capitalizeFirstLetter(editTaskNameEl.value);
        task.description = capitalizeFirstLetter(editTaskDescriptionEl.value);
        task.assignedTo = capitalizeFirstLetter(editAssignedToEl.value);
        task.dueDate = capitalizeFirstLetter(editTaskDueDateEl.value);
        task.status = capitalizeFirstLetter(editTaskStatusEl.value);
        task.priority = capitalizeFirstLetter(editTaskPriorityEl.value);

        console.log(taskManager.tasks); // to check tasks

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();

    }
};

// Resetting form's error message and border colour
editTaskForm.addEventListener('reset', function() {
    
    editTaskNameEl.parentElement.querySelector('small').innerText = '';
    editTaskNameEl.parentElement.classList.remove('error', 'success');
    
    editTaskDescriptionEl.parentElement.querySelector('small').innerText = '';
    editTaskDescriptionEl.parentElement.classList.remove('error', 'success');
    
    editAssignedToEl.parentElement.querySelector('small').innerText = '';
    editAssignedToEl.parentElement.classList.remove('error', 'success');
    
    
    editTaskDueDateEl.parentElement.querySelector('small').innerText = '';
    editTaskDueDateEl.parentElement.classList.remove('error', 'success');
    
    editTaskStatusEl.parentElement.querySelector('small').innerText = '';
    editTaskStatusEl.parentElement.classList.remove('error', 'success');
    
});




editTaskForm.addEventListener('submit', function(event) {
    // prevent the form from submitting
    event.preventDefault();

    
    // editValidateTaskForm();
    // validate form
    let isTaskNameValid = editCheckTaskName(),
        isTaskDescriptionValid = editCheckTaskDescription(),
        isAssignedToValid = editCheckAssignedTo(),
        isDueDateValid = editCheckDueDate(),
        isStatusValid = editListCheckStatus();
    

    // submit to server if the form is valid
    let isFormValid = isTaskNameValid && 
        isTaskDescriptionValid && isAssignedToValid
        && isDueDateValid && isStatusValid;


    if(isFormValid) {
        // editTaskForm.submit();
        location.reload(true);
    }

    
    
});


// OPTIONAL: Debounce technique - To ensure that time-consuming tasks do not fire so often, that it stalls the performance of the web page.
const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};



// Add to List Task Form input check
// Passing the input event handler to the debounce() function to debounce it:
addToListTaskForm.addEventListener('input', debounce(function (event) {
    switch (event.target.id) {
        case 'listTaskName':
            addListCheckTaskName();
            break;
        case 'listTaskDescription':
            addListCheckTaskDescription();
            break;
        case 'listAssignedTo':
            addListCheckAssignedTo();
            break;
        case 'listTaskDueDate':
            addListCheckDueDate();
            break;
        case 'listTaskStatus':
            addListCheckStatus();
            break;
    }
}));

// Edit Task Form input check
// Passing the input event handler to the debounce() function to debounce it:
editTaskForm.addEventListener('input', debounce(function (event) {
    switch (event.target.id) {
        case 'editTaskName':
            editCheckTaskName();
            break;
        case 'editTaskDescription':
            editCheckTaskDescription();
            break;
        case 'editAssignedTo':
            editCheckAssignedTo();
            break;
        case 'editTaskDueDate':
            editCheckDueDate();
            break;
        case 'editTaskStatus':
            editListCheckStatus();
            break;    
    }
}));


