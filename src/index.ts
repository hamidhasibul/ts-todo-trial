const todoForm = document.querySelector("#todoForm");
const btn = document.querySelector(".btn");
const todoInput = document.querySelector(".todoInput") as HTMLInputElement;
const todoList = document.querySelector("#todoList");

interface Todo {
  description: string;
  completed: boolean;
}

// Read from localStorage

const readTodoStore = (): Todo[] => {
  const todoStore = localStorage.getItem("todoList");

  if (!todoStore) return [];

  return JSON.parse(todoStore);
};

// Render Todo Item

const renderTodo = (todo: Todo): void => {
  const listItemValue = todo.description;
  const listItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    saveTodo();
  });

  listItem.append(listItemValue);
  listItem.append(checkbox);
  todoList?.append(listItem);
};

const todoArr: Todo[] = readTodoStore();

todoArr.forEach(renderTodo);

readTodoStore();

const saveTodo = (): void => {
  localStorage.setItem("todoList", JSON.stringify(todoArr));
};

const handleSubmit = (e: Event): void => {
  e.preventDefault();

  const newTodo: Todo = {
    description: todoInput.value,
    completed: false,
  };
  todoArr.push(newTodo);

  //   Setting to localStorage
  saveTodo();
  //   Rebndering UI
  renderTodo(newTodo);
  todoInput.value = "";
};

todoForm?.addEventListener("submit", handleSubmit);
