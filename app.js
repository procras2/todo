// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
// Add a todo
function addTodo(event){
	// Prevent form from submitting
	event.preventDefault();
	// Create Todo div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	// Create li
	const newTodo = document.createElement('li');
	// Add value of form text input to the newTodo
	newTodo.innerText = todoInput.value;
	// Add classlist
	newTodo.classList.add('todo-item');
	// Add the element we just created to dom
	todoDiv.appendChild(newTodo);


	//Add todo to localStorage
	saveLocalTodos(todoInput.value);

	// Add checkmark button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	// Add class to completedButton
	completedButton.classList.add("complete-btn");
	// Append to the div
	todoDiv.appendChild(completedButton);
	
	// Add trash button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	// Add class to trashButton
	trashButton.classList.add("trash-btn");
	// Append to the div
	todoDiv.appendChild(trashButton);

	// Append to the list
	todoList.appendChild(todoDiv);

	// Clear Todo Input Value to blank it.
	todoInput.value = "";
}

// Box options on todo
function deleteCheck(e){
	const item = e.target;
	// Delete the todo
	if(item.classList[0] === 'trash-btn'){
		// We clicked on trash button so delete it
		const todo = item.parentElement;
		// Add animation
		todo.classList.add('fall');
		// Remove todo from localStorage
		removeLocalTodos(todo);
		// Add specialevent listener to execute at end of animation
		todo.addEventListener('transitionend', function(){
			todo.remove()
		});
	}
	// Check mark the todo
	if(item.classList[0] === 'complete-btn'){
		// We clicked on trash button so delete it
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
	
}

// Now to handle the filtering of the todos

function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function(todo){
		switch(e.target.value) {
			case "all":
				// Show all the todos
				todo.style.display = 'flex';
				break;
			case "completed":
				// Show completed todos
				if(todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case "uncompleted":
				// Show uncompleted todos
				if(!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}

	});
}

// Function to save local todos to local storage on the brower
// Need to call this when you insert a todo
function saveLocalTodos(todo){
	// Check if I already have todos in local storage
	// Create variable to point to the todos
	let todos;

	if(localStorage.getItem('todos') === null){
		// We don't have any stored so create storage and store them.
		// Create empty array
		todos = [];
	} else {
		// We do have some stored so note that we have some
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	// Add the todo to the array
	todos.push(todo);
	// Now put todos back into localStorage
	// Note use or todos and not 'todos' as we are pointing to the array
	localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to update webpage from localStorage
// We call this from DOMContentLoaded event in an eventlistener
function getTodos() {
	// Check if I already have todos in local storage
	// Create variable to point to the todos
	let todos;

	if(localStorage.getItem('todos') === null){
		// We don't have any stored so create storage and store them.
		// Create empty array
		todos = [];
	} else {
		// We do have some stored so note that we have some
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.forEach(function(todo){
		// Same as the code when we input a todo;

		// Create Todo div
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		// Create li
		const newTodo = document.createElement('li');
		// Add value of local Storage text input to the newTodo
		newTodo.innerText = todo;
		// Add classlist
		newTodo.classList.add('todo-item');
		// Add the element we just created to dom
		todoDiv.appendChild(newTodo);

		// Add checkmark button
		const completedButton = document.createElement('button');
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		// Add class to completedButton
		completedButton.classList.add("complete-btn");
		// Append to the div
		todoDiv.appendChild(completedButton);

		// Add trash button
		const trashButton = document.createElement('button');
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		// Add class to trashButton
		trashButton.classList.add("trash-btn");
		// Append to the div
		todoDiv.appendChild(trashButton);

		// Append to the list
		todoList.appendChild(todoDiv);

	});
}

// Function to delete todo from localStorage
// This will be called when we click on delete
// This will delete the first todo in the list that has the text
// So if we have two identical todos the wrong one may be deleted!
// So what if they are the same?
function removeLocalTodos(todo) {
	// Check if I already have todos in local storage
	// Create variable to point to the todos
	let todos;

	if(localStorage.getItem('todos') === null){
		// We don't have any stored so create storage and store them.
		// Create empty array
		todos = [];
	} else {
		// We do have some stored so note that we have some
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	
	// We will get the index of the todo and delete that particular one.
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
}
