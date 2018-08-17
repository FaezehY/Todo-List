

var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position){
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position]; //saving a refrence to the specific todo that we are interested in,which it save us to type it in 2 places
    todo.completed = !todo.completed; //we grap the todo.completed which is a boolean value, and we want to change the value to the oposite of what it is.
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    //get number of completed todos
    this.todos.forEach(function(todo){
      if (todo.completed === true){
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo){
      //case 1: if everything true, make everything false
      if (completedTodos === totalTodos) {
        todo.completed = false;
      }else {
        todo.completed = true;
      }
    });
  }
};

//we want the methods on this object to handel different events

var handler = {
  addTodo: function(){
   var addTodoTextInput =  document.getElementById('addTodoTextInput');
   todoList.addTodo(addTodoTextInput.value);
   addTodoTextInput.value = '';
   view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
    toggleCompleted: function() {
    var deleteTodoPositionInput = document.getElementById('togglecompletedPositionInput');
    todoList.toggleCompleted(togglecompletedPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = '';
    view.displayTodos();
  },
    toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  }
};

//its responsible to what user sees
var view = {
  displayTodos: function() {
    //to grab the unordered list we created
    var todoUl = document.querySelector('ul');
    //at the beginning we want to make sure it start from zero
    todoUl.innerHTML = '';

    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li');
      //combine the representation of the todo if its completed or not.
      var todoTextWithCompletion = '';
      
      if(todo.completed === true) {
        todoTextWithCompletion = '(X) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      //id is the property that i can access the element id.
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    //access and add an event listener just to the unordered list so we need to get a reference to that. grab the unordered list
    var todoUl = document.querySelector('ul');
    //here we add the eventListener that we want to wait for the click event.
    //addEventListener will run callback function.addEventListener is the higher order function.
    //when it runs the call back function its gonna pass in an event object, so we need to add a parameter in callback function.
    todoUl.addEventListener('click', function(event) {
      //console.log(event.target.parentNode.id);
      //get the element that was clicked on
      var elementClicked = event.target;
      //check if elementClicked is the a delete button
      if (elementClicked.className === 'deleteButton') {
        handler.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();


