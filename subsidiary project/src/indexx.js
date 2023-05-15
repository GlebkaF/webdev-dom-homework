const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const textInputElement = document.getElementById("text-input");
const taskElements = document.querySelectorAll('.task');

let tasks = [];

// документация https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/todos/README.md
// API - инструкции о том, как разным приложениям друг с другом взаимодействовать (пульт управления сервером)

// fetch - глобальная функция, которая позволяет делать запросы в API
// запросы в API - асинхронны. Мы не знаем как долго будет выполняться запрос. Может выполняться секунды и даже минуты
const fetchPromise = fetch(
  // первый аргумент - адрес API
  'https://webdev-hw-api.vercel.app/api/todos', 
  // второй аргумент - параметры запроса
  {
    method: "GET" //GET-запрос для браузера к API. Возвращает строку в формате json (javascript object notation. Это формат представления данных в виде текстовых строк. В таком формате приложения обмениваются данными. Точно так же передать данные в API в формате обычного объекта мы не сможем: его нужно преобразовать в json. Внутри json все строчки и ключи заворачиваются в двойные кавычки)
  }

); 

// console.log(fetchPromise);
//для того, чтобы работать с асинхронным API существует специальный объект promise. Позволяет подписаться на синхронное выполнение операции и выполнить какой-либо код
// у promise есть метод then, который позволяет навесить обработчик успешного выполнения асинхронной операции
fetchPromise.then((response) => {
  // console.log(response);
  //сервер возвращает данные в формате JSON
  const jsonPromise = response.json(); //преобразует API в формат json. Метод работает асинхронно

  jsonPromise.then((responseData) => { //подписываемся на результат выполнения
    // console.log(responseData);

    tasks = responseData.todos; //кладем объект из API в локальное хранилище tasks. Массив с объектами более не используем (API в данном случае возвращает объект todos. Что возвращает API можно посмотреть по ссылке в первом параметре функции fetch)

    renderTasks();

  });
});




//TODO: Получать из хранилища данных
// const tasks = [
  // {
  //   text: 'Купить чай',
  // }, 
  // {
  //   text: 'Заварить чай',
  // },
  // {
  //   text: 'Выпить чай',
  // },
// ];


const renderTasks = () => { 
  const tasksHtml = tasks.map((task) => {
    return `
      <li class="task">
        <p class="task-text">
          ${task.text}
        </p>
        <button data-id="${task.id}" class="delete-button">Удалить</button>
      </li>`;
  }).join(''); 

  listElement.innerHTML = tasksHtml; 

  initDeleteButtonsListeners(); 
};



const initDeleteButtonsListeners = () => { 
  const deleteButtonsElements = document.querySelectorAll('.delete-button'); 

  for(const deleteButtonElement of deleteButtonsElements) { 
    deleteButtonElement.addEventListener('click', (event) => {
      event.stopPropagation();

      const id = deleteButtonElement.dataset.id; 

      //TODO: Удалять из хранилища данных
      // tasks.splice(index, 1); 

      fetch(
        "https://webdev-hw-api.vercel.app/api/todos/" + id, 
        {
          method: "DELETE",
        }).then((response) => {
      
        response.json().then((responseData) => { 
      
          tasks = responseData.todos; 
          renderTasks();
        });
      });
      renderTasks();
    });
  }

  // const tasksElements = document.querySelectorAll('.task');

};

renderTasks(); 




buttonElement.addEventListener("click", () => { 
  textInputElement.classList.remove("input-error"); 

  if (textInputElement.value === "") { 
    textInputElement.classList.add("input-error");
    return;
  }

  //TODO: Добавлять задачу в хранилище данных
  // tasks.push({ 
  //   text: textInputElement.value
  //     .replaceAll('<', '&lt')
  //     .replaceAll('>', '&gt'),
  // });

  fetch(
    'https://webdev-hw-api.vercel.app/api/todos', 
    {
      method: "POST",
      body: JSON.stringify({ //чтобы передать данные используем ключ body. Данные переводим в json с помощью метода stringify
        text: textInputElement.value //параметр text берем из элемента input
      })
    }).then((response) => {

      console.log(response);
  
    response.json().then((responseData) => { 
      console.log(responseData);
  
      tasks = responseData.todos; 
      renderTasks();
    });
  });


  renderTasks(); 

  textInputElement.value = ""; 
});



//как перевести js-строку в формат json?
// const obj = {
//   name: 'asd',
//   list: [{id: 1}, {id:2}]
// };

// const jsonObj = JSON.stringify(obj);

// console.log(jsonObj);

//обратный метод
// const objFromJson = JSON.parse(jsonObj); //спарсить это значит перевести json в формат js-строки
// console.log(objFromJson);


