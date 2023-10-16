import { getTodos, postTodo } from "./api.js";
import { deleteTodo } from "./api.js";
const buttonElement = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const textInputElement = document.getElementById("text-input");

    let tasks = [];

    const fetchAndRenderTasks = () => {
        getTodos().then((responseData) => {
          tasks = responseData.todos;
          renderTasks();
          return true;
        });
    };
    
    const renderTasks = () => {
      const tasksHtml = tasks
        .map((task) => {
          return `
          <li class="task">
            <p class="task-text">
              ${task.text}
              <button data-id="${task.id}" class="button delete-button">Удалить</button>
            </p>
          </li>`;
        })
        .join("");

      listElement.innerHTML = tasksHtml;
      const deleteButtons = document.querySelectorAll(".delete-button");

      for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation();
          const id = deleteButton.dataset.id;
            deleteTodo({id}).then(() => {
              fetchAndRenderTasks();
            });
        });
      }
    };

    fetchAndRenderTasks();

    buttonElement.addEventListener("click", () => {
      if (textInputElement.value === "") {
        return;
      }

      buttonElement.disabled = true;
      buttonElement.textContent = "Элемент добавлятся...";

    postTodo({
        text : textInputElement.value
    }).then(() => {
          return fetchAndRenderTasks();
        })
        .then(() => {
          buttonElement.disabled = false;
          buttonElement.textContent = "Добавить";
          textInputElement.value = "";
        });

      renderTasks();
    });