const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        createTask(inputBox.value);
        inputBox.value = ''; // Clear the input box after adding the task
        saveData();
    }
}

function createTask(taskText, isChecked = false) {
    let li = document.createElement("li");
    li.classList.add('list-group-item', 'fade-in');
    li.innerHTML = taskText;
    if (isChecked) {
        li.classList.add("checked");
    }
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00D7"; // Unicode for the '×' symbol
    li.appendChild(span);

    li.addEventListener('click', function () {
        li.classList.toggle('checked');
        saveData();
    });

    span.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent the li click event from being triggered
        li.classList.add('fade-out');
        setTimeout(() => {
            li.remove();
            saveData();
        }, 500); // Match this to the duration of the fade-out animation
    });
}

function saveData() {
    let tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.childNodes[0].nodeValue, // Extract task text
            checked: li.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task.text, task.checked));
}

showTask();
