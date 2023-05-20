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

  // fetch("https://webdev-hw-api.vercel.app/api/todos", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     text: textInputElement.value,
  //   }),
  // }).then((response) => {
  //   response.json().then((responseData) => {
  //     // tasks = responseData.todos;

  //     fetch("https://webdev-hw-api.vercel.app/api/todos", {
  //       method: "GET",
  //     }).then((response) => {
  //       response.json().then((responseData) => {
  //         tasks = responseData.todos;
  //         renderTasks();
  //       });
  //     });
  //   });
  // });

  //пример (аналогичный код)

  // fetch("https://webdev-hw-api.vercel.app/api/todos", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     text: textInputElement.value,
  //   }),
  //  })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((responseData) => { //работает с responseData от возвращенного в предыдущем промисе response.json();
  //     return fetch("https://webdev-hw-api.vercel.app/api/todos", {
  //        method: "GET",
  //      });
  //    })
  //   .then((response) => { //аналогично
  //     return response.json();
  //    })
  //    .then((responseData) => {
  //       tasks = responseData.todos;
  //       renderTasks();
  //       //если вернуть здесь, к примеру, текст, а в следующем then цепочки передать data, то console.log(data) отработает c этим самым текстом
  //   });
  //





    // const startAt = Date.now();
    // console.log('Начинаем делать запрос');
  
    // fetch("https://webdev-hw-api.vercel.app/api/todos", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     text: textInputElement.value,
    //   }),
    //  })
    //  .then((response) => { 
    //   console.log('Время: ' + (Date.now() - startAt));//после каждого шага выполнения запроса выводим время выполнения и возвращаем response, чтобы цепочка не сломалась
    //   return response;
    //  })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((response) => {
    //     console.log('Время: ' + (Date.now() - startAt));//после каждого шага выполнения запроса возвращаем response , чтобы цепочка не сломалась
    //     return response;
    //    })
    //   .then((responseData) => {
    //     return fetch("https://webdev-hw-api.vercel.app/api/todos", {
    //        method: "GET",
    //      });
    //    })
    //    .then((response) => {
    //     console.log('Время: ' + (Date.now() - startAt));//после каждого шага выполнения запроса возвращаем response , чтобы цепочка не сломалась
    //     return response;
    //    })
    //   .then((response) => {
    //     return response.json();
    //    })
    //    .then((response) => {
    //     console.log('Время: ' + (Date.now() - startAt));//после каждого шага выполнения запроса возвращаем response , чтобы цепочка не сломалась
    //     return response;
    //    })
    //    .then((responseData) => {
    //       tasks = responseData.todos;
    //       renderTasks();
    //   });



  


    // const startAt = Date.now();
    // console.log('Начинаем делать запрос');

    // buttonElement.disabled = true; //выключаем кнопку перед выполнением запроса
    // buttonElement.textContent = 'Элемент добавляется...';
  
    // fetch("https://webdev-hw-api.vercel.app/api/todos", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     text: textInputElement.value,
    //   }),
    //  })
    //  .then((response) => { 
    //   console.log('Время: ' + (Date.now() - startAt));
    //   return response;
    //  })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((response) => {
    //     console.log('Время: ' + (Date.now() - startAt));
    //     return response;
    //    })
    //   .then((responseData) => {
    //     return fetch("https://webdev-hw-api.vercel.app/api/todos", {
    //        method: "GET",
    //      });
    //    })
    //    .then((response) => {
    //     console.log('Время: ' + (Date.now() - startAt));
    //     return response;
    //    })
    //   .then((response) => {
    //     return response.json();
    //    })
    //    .then((response) => {
    //     console.log('Время: ' + (Date.now() - startAt));
    //     return response;
    //    })
    //    .then((responseData) => {
    //       tasks = responseData.todos;
    //       renderTasks();
    //   })
    //   .then((data) => {
    //     buttonElement.disabled = false; //в последнем промисе цепочки снова включаем кнопку и возвращаем ее исходное название "добавить"
    //     buttonElement.textContent = 'Добавить';
    //   });






    const startAt = Date.now();
    console.log('Начинаем делать запрос');

    buttonElement.disabled = true;
    buttonElement.textContent = 'Элемент добавляется...';
  
    fetch("https://webdev-hw-api.vercel.app/api/todos", {
      method: "POST",
      body: JSON.stringify({
        text: textInputElement.value,
      }),
     })
     .then((response) => { 
      console.log('Время: ' + (Date.now() - startAt));
      return response;
     })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log('Время: ' + (Date.now() - startAt));
        return response;
       })
       .then(() => {
        return fetchAndRenderTasks();
       })
       //написали функцию fetchAndRenderTasks() и удалили все промисы отвечающие за преобразование и рендер
      .then((data) => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Добавить';
      });

  renderTasks();

  textInputElement.value = "";
});