const formsInputElement = document.querySelector(".add-form");
const commentEditText = document.querySelectorAll("comment-edit-text");

export function getComments() {
  return fetch(
        'https://wedev-api.sky.pro/api/v1/evgeniya-ko/comments',
        {
          method: "GET",
        })
        .then((response) => {
        return response.json();//const jsonPromise = response.json();
        });
}

export function postComment({name, text}) {
  return fetch('https://wedev-api.sky.pro/api/v1/evgeniya-ko/comments', {
      method: "POST",
      body: JSON.stringify({
        name: name,
        text: text,
        forceError: false,
      }),
    })
        .then((response) => {
          console.log(response);
          if (nameInputElement.value.length < "3" || textInputElement.value.length < "3") {
          alert("Имя и комментарий должны быть не короче 3 символов");
            throw new Error('Ошибка');
          }
            if (response.status === 500) {
            throw new Error("Сервер упал");
          }
          console.log("Время: " + (Date.now() - startAt));
          return response;
        })
        .then((response) => {
          return response.json();
        });
}


