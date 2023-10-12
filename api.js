import {getFetchPromise} from "./main.js";

export function getComments() {
  return fetch("https://wedev-api.sky.pro/api/v2/alexander-potapov/comments", {
    method: "GET",
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Что то с сервером");
    } else {
      return response.json();
    }
  });
}

 export function postComment(firstValue, secondValue, addForm, textForLoading) {
    return fetch("https://wedev-api.sky.pro/api/v2/alexander-potapov/comments",
      {
        method: "POST",
        body: JSON.stringify({
          text: firstValue.value,
          name: secondValue.value,
          forceError: true,
        }),
      }
    )
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          firstValue.classList.add("error");
          secondValue.classList.add("error");
          throw new Error("Короткое имя");
        } else if (response.status === 500) {
          throw new Error("Что то с сервером");
        } else if (response.status === "Ошибка сервера") {
          throw new Error("Failed to fetch");
        }
      })
      .then((dataResponse) => {
        console.log(dataResponse);
        getFetchPromise();
        firstValue.value = "";
        secondValue.value = "";
        textForLoading.classList.add("hidden");
        addForm.classList.remove("hidden");
      })
      .catch((error) => {
        if (error.message === "Короткое имя") {
          alert("Имя и комментарий должны быть не короче 3 символов");
        }
        if (error.message === "Что то с сервером") {
          alert("Сервер сломался попробуй позже");
          postComment(firstValue, secondValue, addForm, textForLoading);
        }
        if (error.message === "Failed to fetch") {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
        textForLoading.classList.add("hidden");
        addForm.classList.remove("hidden");
        console.log(error);
      });
}
