const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const textInputElement = document.getElementById("text-input");

let tasks = [];

const fetchAndRenderTasks = () => {
    return fetch("https://webdev-hw-api.vercel.app/api/todos", {
      method: "GET",
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      tasks = responseData.todos;
      renderTasks();
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

      fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
        method: "DELETE",
      }).then((response) => {
        response.json().then((responseData) => {
          tasks = responseData.todos;
          renderTasks();
        });
      });
    });
  }
};

fetchAndRenderTasks();
renderTasks();

buttonElement.addEventListener("click", () => {
  if (textInputElement.value === "") {
    return;
  }

    buttonElement.disabled = true;
    buttonElement.textContent = 'Элемент добавляется...';
  
    fetch("https://webdev-hw-api.vercel.app/api/todos/with-error", { //в данном конкретном случае адрес с api с параметром with-error может возвращать ошибку с кодом 500. Код 500 говорит о том, что сервер сломался
      method: "POST",
      body: JSON.stringify({
        text: textInputElement.value,
      }),
     })
      .then((response) => {
        console.log(response); //можем в объекете посмотреть статус запроса. Если код 500 - ошибка
        if(response.status === 500) { //проверяем статус запроса на предмет ошибки с кодом 500. Либо можно вернуть response.json() с условием response.status === 201, а в остальных случаях с else обрабатывать ошибку (например, может быть код 400, когда есть ошибка в отправке данных на сервер);
          //сюда пишем код, который обработает ошибку
          // throw new Error('Сервер упал'); //вбрасываем ошибку. Когда кидаем ошибку, то прерываем цепочку промисов и попадаем сразу в catch
          return Promise.reject('Сервер упал'); //либо создаем отклоненный промис. Работает аналогично вброшенной ошибке. Точно так же идем сразу в catch
        } else {
          return response.json();
        }
      })
       .then(() => {
        return fetchAndRenderTasks();
       })
      .then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Добавить';
        textInputElement.value = ""; //инпут обнуляем только тогда, когда отрабатывает промис
      })
      .catch((error) => { //если хотя бы один из промисов "ломается", вызываем catch и обрабатываем ошибку. Отрабатывает только когда промис отклоняется. Если сломается хоть один промис, то не отработает вся цепочка. Но сценарий, когда после цепочки промисов есть только один catch, отрабатывает, только, когда идет отклонение от fetch, то есть у пользователя сломался интернет. Catch привязывается только к цепочке промисов, которая расположена выше него. После catch возможна новая цепочка then, которая так же что-то может возвращать
        buttonElement.disabled = false; //включаем кнопку
        buttonElement.textContent = 'Добавить';
        alert("Кажется, что-то пошло не так. Попробуйте позже");
        //TODO: отправлять в систему сбора ошибок
        console.warn(error); //выводим ошибку в консоль
      })
      // .then(() => { //then отрабатывает после catch
      //   throw new Error('Some error'); //в любом из промисов можно вбросить сообщение с ошибкой
      // });

  renderTasks();

});