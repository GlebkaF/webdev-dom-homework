const buttonElement = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const textInputElement = document.getElementById("text-input");

    // TODO: Получать из хранилища данных
    let tasks = [];

    // Запросы в API - асинхронные, мы не знаем как долго будет выполняться запрос
    // Запрос может выполняться секунды и даже минуты
    // fetch - запускает запрос в api
    const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/todos", {
      method: "GET"
    });

    // подписываемся на успешное завершение запроса с помощью then
    fetchPromise.then((response) => {
      // Запускаем преобразовываем "сырые" данные от API в json формат
      const jsonPromise = response.json();

      // Подписываемся на результат преобразования
      jsonPromise.then((responseData) => {
        // получили данные и рендерим их в приложении
        tasks = responseData.todos;
        renderTasks();
      });
    });

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

          // подписываемся на успешное завершение запроса с помощью then
          fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
            method: "DELETE"
          }).then((response) => {
            response.json().then((responseData) => {
              // получили данные и рендерим их в приложении
              tasks = responseData.todos;
              renderTasks();
            });
          });

          renderTasks();
        });
      }
    };

    renderTasks();

    buttonElement.addEventListener("click", () => {
      if (textInputElement.value === "") {
        return;
      }

      // подписываемся на успешное завершение запроса с помощью then
      fetch("https://webdev-hw-api.vercel.app/api/todos", {
        method: "POST",
        body: JSON.stringify({
          text: textInputElement.value
        })
      }).then((response) => {
        response.json().then((responseData) => {
          // получили данные и рендерим их в приложении
          tasks = responseData.todos;
          renderTasks();
        });
      });

      renderTasks();

      textInputElement.value = "";
    });