import { getTodos, postTodo } from "./api.js";
import { renderTasks } from "./renderTasks.js";

const buttonElement = document.getElementById("add-button");
const textInputElement = document.getElementById("text-input");

let tasks = [];

const fetchAndRenderTasks = () => {
  getTodos().then((responseData) => {
    tasks = responseData.todos;
    renderTasks({ tasks, fetchAndRenderTasks });
    return true;
  });
};

fetchAndRenderTasks();

buttonElement.addEventListener("click", () => {
  if (textInputElement.value === "") {
    return;
  }

  buttonElement.disabled = true;
  buttonElement.textContent = "Элемент добавляется...";

  postTodo({
    text: textInputElement.value,
  })
    .then(() => {
      return fetchAndRenderTasks();
    })
    .then(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Добавить";
      textInputElement.value = "";
    });

  renderTasks({ tasks, fetchAndRenderTasks });
});