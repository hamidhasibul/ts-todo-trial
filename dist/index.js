"use strict";
const todoForm = document.querySelector("#todoForm");
const btn = document.querySelector(".btn");
const todoInput = document.querySelector(".todoInput");
const todoList = document.querySelector("#todoList");
// Read from localStorage
const readTodoStore = () => {
    const todoStore = localStorage.getItem("todoList");
    if (!todoStore)
        return [];
    return JSON.parse(todoStore);
};
// Render Todo Item
const renderTodo = (todo) => {
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
const todoArr = readTodoStore();
todoArr.forEach(renderTodo);
readTodoStore();
const saveTodo = () => {
    localStorage.setItem("todoList", JSON.stringify(todoArr));
};
const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
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
