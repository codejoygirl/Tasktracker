import React, { useState } from "react";
import "./App.css";
const TaskTracker = () => {
  const [todoInput, setTodoInput] = useState("");

  //   const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  function addTodo() {
    console.log("dog: ", todoInput)
    const todoText = todoInput.trim();
    if (todoText === "") {
      alert("Please enter a task.");
      return;
    }

    const todoObj = { text: todoText, completed: false };

    console.log(todoObj)
    addTodoToUI(todoObj);
    saveTask(todoObj);
    setTodoInput("")
    updateStats();
    updateProfileCompletedTasks();
  }

  function addTodoToUI(todoObj) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = todoObj.text;
    if (todoObj.completed) {
      span.classList.add("completed");
    }
    li.appendChild(span);

    const completeBtn = document.createElement("button");
    completeBtn.textContent = todoObj.completed ? "Undo" : "Complete";
    completeBtn.classList.add("complete-btn");
    completeBtn.addEventListener("click", () => toggleComplete(todoObj, li));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(todoObj, li));

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  }

  function toggleComplete(todoObj, li) {
    todoObj.completed = !todoObj.completed;
    updateLocalStorage();
    const span = li.querySelector("span");
    span.classList.toggle("completed");
    li.querySelector(".complete-btn").textContent = todoObj.completed
      ? "Undo"
      : "Complete";
    updateStats();
    updateProfileCompletedTasks();
    showCompletedTasks();
  }

  function deleteTask(todoObj, li) {
    li.remove();
    deleteFromLocalStorage(todoObj);
    updateStats();
    updateProfileCompletedTasks();
    showCompletedTasks();
  }

  function saveTask(todoObj) {
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    tasks.push(todoObj);
    localStorage.setItem("todos", JSON.stringify(tasks));
  }

  function updateLocalStorage() {
    const tasks = [];
    todoList.querySelectorAll("li").forEach((li) => {
      const text = li.querySelector("span").textContent;
      const completed = li
        .querySelector("span")
        .classList.contains("completed");
      tasks.push({ text, completed });
    });
    localStorage.setItem("todos", JSON.stringify(tasks));
  }

  function deleteFromLocalStorage(todoObj) {
    let tasks = JSON.parse(localStorage.getItem("todos")) || [];
    tasks = tasks.filter((task) => task.text !== todoObj.text);
    localStorage.setItem("todos", JSON.stringify(tasks));
  }

  function showCompletedTasks() {
    const completedList = document.getElementById("completed-tasks-list");
    completedList.innerHTML = ""; // clear before rendering

    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    tasks
      .filter((task) => task.completed)
      .forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        completedList.appendChild(li);
      });
  }

  function updateStats() {
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    document.getElementById("total-tasks").textContent = totalTasks;
    document.getElementById("completed-tasks").textContent = completedTasks;
    document.getElementById("pending-tasks").textContent = pendingTasks;
  }

  function updateProfileCompletedTasks() {
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    const completedTasks = tasks.filter((task) => task.completed).length;
    document.getElementById("completed-tasks-profile").textContent =
      completedTasks;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    tasks.forEach(addTodoToUI);
    updateStats();
    updateProfileCompletedTasks();
    showCompletedTasks();
  });
  return (
    <>
      <nav>
        <div class="logo">Task Tracker</div>
        <ul class="nav-links">
          <li>
            <a href="#dashboard">Dashboard</a>
          </li>
          <li>
            <a href="#todos">Todo List</a>
          </li>
          <li>
            <a href="#completed">Completed Tasks</a>
          </li>
          <li>
            <a href="#profile">Profile</a>
          </li>
        </ul>
      </nav>

      <section id="dashboard" class="dashboard-section">
        <h2>Dashboard</h2>
        <div class="stats">
          <div class="stat-box">
            <h3>Total Tasks</h3>
            <p id="total-tasks">0</p>
          </div>
          <div class="stat-box">
            <h3>Completed Tasks</h3>
            <p id="completed-tasks">0</p>
          </div>
          <div class="stat-box">
            <h3>Pending Tasks</h3>
            <p id="pending-tasks">0</p>
          </div>
        </div>
      </section>

      <section id="todos">
        <h2>Todo List</h2>
        <input
          type="text"
          id="todo-input"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add Task</button>
        <ul id="todo-list"></ul>
      </section>

      <section id="completed">
        <h2>Completed Tasks</h2>
        <ul id="completed-tasks-list"></ul>
      </section>

      <section id="profile" class="profile-section">
        <h2>Your Profile</h2>
        <div class="profile-info">
          <p>
            Name: <strong>Egbu Joy</strong>
          </p>
          <p>
            Email: <strong>joyegbu@gmail.com</strong>
          </p>
          <p>
            Total Tasks Completed:{" "}
            <strong id="completed-tasks-profile">0</strong>
          </p>
        </div>
      </section>
    </>
  );
};

export default TaskTracker;
