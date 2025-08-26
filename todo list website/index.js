const addButton = document.querySelector(".add-button");
const todoInputForm = document.querySelector(".todo-input");
const displayContainer = document.querySelector(".container");
var todoArray = [];
var completedTodoArray = [];
var completedLabel = false;

addButton.addEventListener("click", function() {
    var todo = todoInputForm.value;
    if (!todoArray.includes(todo)) {
        addTodo(todo);
    }
    else if (todoArray.includes(todo) || todo === "") {
        alert("This item is already included in the list");
        todoInputForm.value = ""
    }
})

document.addEventListener("keydown", function(event) {
    var todo = todoInputForm.value;
    const keyPressed = event.key;
    if ((keyPressed == "Enter") && (!todoArray.includes(todo))) {
        todoArray.push(todo);
        addTodo(todo);
    }
})

function updateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleDateString();
    document.querySelector(".date-time").innerHTML = formattedTime;
}

updateTime();

setInterval(updateTime, 1000);


function addTodo(todo) {
    todoArray.push(todo);
    const newDiv = document.createElement("div");
    const newText = document.createElement("p");
    const newContent = document.createTextNode(todoArray[(todoArray.length)-1]);
    const newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.classList.add("checkboxes");
    newDiv.appendChild(newCheckbox);
    newDiv.appendChild(newText);
    newDiv.classList.add("todo-items-divs")
    newText.appendChild(newContent);
    if (completedLabel === true) {
        displayContainer.insertBefore(newDiv, document.querySelector("h3"))
    }
    else {
        displayContainer.appendChild(newDiv);
    }
    newText.classList.add("todo-items");
    todoInputForm.value = "";
    checkboxEventListener(newCheckbox, todo, newDiv);
}

function addCompletedTodo(todo) {
    completedTodoArray.push(todo);
    todoArray.splice(todoArray.indexOf(todo),1);
    const newDiv = document.createElement("div");
    const newText = document.createElement("p");
    const newContent = document.createTextNode(todo);
    newDiv.appendChild(newText);
    newDiv.classList.add("todo-items-divs", "completed-div")
    newText.appendChild(newContent);
    displayContainer.appendChild(newDiv); 
    newText.classList.add("todo-items", "completed-text");
    todoInputForm.value = "";
}

function checkboxEventListener(newCheckbox, todo, newDiv) {
    newCheckbox.addEventListener("change", function() {
        if (completedLabel === false) {
            const labelCompleted = document.createElement("h3");
            labelCompleted.innerHTML = "Completed";
            displayContainer.appendChild(labelCompleted);
            addCompletedTodo(todo);
            completedLabel = true;
        }
        else {
            addCompletedTodo(todo);
        }

        newDiv.classList.add("remove")
    })
}

//completedTodoArray[(completedTodoArray.length)-1