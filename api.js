export let token;

export const setToken = (newToken) => {
  token = newToken;
}
export function getComments() {
  return fetch("https://wedev-api.sky.pro/api/v2/stas/comments",
{
  method: "GET",
  
}).then((response) => {
  return response.json();
})
}

export function postComment({ text, name, addEventButton }) {
  // const formElement = document.querySelector (".add-form");
  // const nameInputElement = document.getElementById("name-input");
  // const commentInputElement = document.getElementById("comment-input");

  return fetch("https://wedev-api.sky.pro/api/v2/stas/comments",
{
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    text: text,
    name: name,
    forceError: false
  })
}).then((response) => {

  // if (response.status === 400) {

  //   let saveName = nameInputElement.value;
  //   let saveComment = commentInputElement.value;
  //   formElement.innerHTML = `<input
  //       id="name-input"
  //       type="text"
  //       class="add-form-name"
  //       placeholder="Введите ваше имя"
  //       value = ${saveName}
  //     />
  //     <textarea
  //       id="comment-input"
  //       type="textarea"
  //       class="add-form-text"
  //       placeholder="Введите ваш коментарий"
  //       rows="4"
  //     >${saveComment}</textarea>
  //     <div class="add-form-row">
  //       <button id="add-button" class="add-form-button">Написать</button>
  //     </div>`;
  //     addEventButton();

  //     throw new Error("Имя и комментарий должны быть не короче 3 символов");
  // } 

  // if (response.status === 500) {
  //   let saveName = nameInputElement.value;
  //   let saveComment = commentInputElement.value;
  //   formElement.innerHTML = `<input
  //       id="name-input"
  //       type="text"
  //       class="add-form-name"
  //       placeholder="Введите ваше имя"
  //       value=${saveName}
  //     />
  //     <textarea
  //       id="comment-input"
  //       type="textarea"
  //       class="add-form-text"
  //       placeholder="Введите ваш коментарий"
  //       rows="4"
  //     >${saveComment}</textarea>
  //     <div class="add-form-row">
  //       <button id="add-button" class="add-form-button">Написать</button>
  //     </div>`;
  //     addEventButton();

  //     throw new Error("Сервер сломался, попробуй позже");
  //     return  formElement.innerHTML = "";
  // }

  // formElement.innerHTML = 'Комментарий загружается';

  return response.json();

})
}

export function login({login, password}) {
  const userURL = "https://wedev-api.sky.pro/api/user/login";

  return fetch(userURL, {
  method: "POST",
  body: JSON.stringify({
    login,
    password,
  })
}).then((response) => {
  return response.json();
});
}

export function postRegistration({login, name, password}) {
  const userURL = "https://wedev-api.sky.pro/api/user";

  return fetch(userURL, {
  method: "POST",
  body: JSON.stringify({
    login,
    name,
    password,
  })
}).then((response) => {
  if (response.status === 201) {
    return response.json()
  } else if (response.status === 400) {
    throw Error("Пользователь уже существует")
  } else {
    throw Error("Ошибка")
  }
});
}
