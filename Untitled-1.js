fetch("https://webdev-hw-api.vercel.app/api/todos", {
  method: "POST",
  body: JSON.stringify({
    text: textInputElement.value,
  }),
})
  .then((response) => {
    // Этот код сработает после того, как завершится промис от fetch POST
    // На вход эта функция-обработчик получает ответ от сервера
    return response.json();
  })
  .then((responseData) => {
    // Этот код сработает после того, как завершится промис от response.json()
    // На вход эта функция-обработчик получает JSON-данные из ответа
    return fetch("https://webdev-hw-api.vercel.app/api/todos", {
      method: "GET",
    });
  })
  .then((response) => {
    // Этот код сработает после того, как завершится промис от fetch POST
    return response.json();
  })
  .then((responseData) => {
    // Этот код сработает после того, как завершится промис от response.json() из предыдущего then
    tasks = responseData.todos;
    renderTasks();
  });