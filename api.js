const formsInputElement = document.querySelector(".add-form");
const commentEditText = document.querySelectorAll("comment-edit-text");

const host = "https://wedev-api.sky.pro/api/v2/evgeniya-ko/comments";

export function getComments() {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    return response.json();
  });
}

export function postComment({ name, text }) {
  if (name < 3 || text < 3) {
    throw new Error("Ошибка");
  }
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      text: text,
      forceError: false,
    }),
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      console.log(response);
      if (response.status === 500) {
        throw new Error("Сервер упал");
      }
      if (response.status === 400) {
        alert("Имя и комментарий должны быть не короче 3 символов");
        throw new Error("Неверные данные ввода");
      }
      return response;
    })
    .then((response) => {
      return response.json();
    });
}
