// Модуль main.js
import { authUser, getTodos, postTodo } from "./api.js";
import { renderAuth } from "./renderAuth.js";
import { renderTasks } from "./renderTasks.js";

export let tasks = [];

export const fetchAndRenderTasks = () => {
  getTodos().then((responseData) => {
    tasks = responseData.todos;
    renderTasks({ tasks, fetchAndRenderTasks, authUser });
    return true;
  });
};

renderAuth( {fetchAndRenderTasks} );

// buttonAuth.addEventListener("click", () => {

// })