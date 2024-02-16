
    import {sanitizeHtml} from './sanitizeHtml.js';

    const buttonElement = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const textInputElement = document.getElementById("text-input");

    let tasks = [];

    const fetchAndRenderTasks = () => {
      fetch("https://webdev-hw-api.vercel.app/api/todos", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
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
              ${sanitizeHtml(task.text)}
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

          fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
            method: "DELETE",
          })
            .then((response) => {
              return response.json();
            })
            .then(() => {
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

      fetch("https://webdev-hw-api.vercel.app/api/todos", {
        method: "POST",
        body: JSON.stringify({
          text: textInputElement.value,
        }),
      })
        .then((response) =>{
          return response.json();
        })
        .then(() => {
          return fetchAndRenderTasks();
        })
        .then(() => {
          buttonElement.disabled = false;
          buttonElement.textContent = "Добавить";
          textInputElement.value = "";
        });

      renderTasks();
    });