

//переменные для работы

const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
let myDate = new Date();
let originalComment = document.getElementById("comment-original");


//GET запрос в API
export function getComments() {
  return fetch('https://wedev-api.sky.pro/api/v1/:Tatyana-JSc2/comments', {
    method: "GET"
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер упал.");
    } else if (response.status !== 200) {
      throw new Error("Отсутствует интернет");
    } else {
      return response.json();
    };
  });
}


//POST запрос в API
export function postComments(/*name,date,text,likesCounter,itLikes, original,answer,isLikeLoading,forceError*/) {
  return fetch('https://wedev-api.sky.pro/api/v1/:Tatyana-JSc2/comments', {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: myDate.getDate() + ":" + (myDate.getMonth() + 1) +
        ":" + myDate.getFullYear() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(),
      text: commentInputElement.value.replace(originalComment, '').replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      likesCounter: 0,
      itLikes: false,
      original: `${commentInputElement.value.includes(originalComment) ? originalComment : ''}`,
      answer: '',
      isLikeLoading: false,

    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Введенные имя или комментарий короче 3-х знаков");
    } else if (response.status === 500) {
      throw new Error("Сервер упал.");
    } else if (response.status !== 201) {
      throw new Error("Отсутствует интернет");
    } else {
      return response.json();
    };
  });
}


//запрос из функции buttonClick до разделения на модули

/*fetch('https://wedev-api.sky.pro/api/v1/:Tatyana-JSc2/comments', {
    method: "POST",
    body: JSON.stringify
      ({
        name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        date: myDate.getDate() + ":" + (myDate.getMonth() + 1) +
          ":" + myDate.getFullYear() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(),
        text: commentInputElement.value.replace(originalComment, '').replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        likesCounter: 0,
        itLikes: false,
        original: `${commentInputElement.value.includes(originalComment) ? originalComment : ''}`,
        answer: '',
        isLikeLoading: false,
        forceError: true,
      })
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Введенные имя или комментарий короче 3-х знаков");
    } else if (response.status === 500) {
      throw new Error("Сервер упал.");
    } else if (response.status !== 201) {
      throw new Error("Отсутствует интернет");
    } else {
      return response.json();
    };
  }).then(() => {
    return fetchPromise();
  }).then((data) => {
    DeleteButtonElement.disabled = false;
    DeleteButtonElement.classList.remove("click-none");
    waitFormElement.classList.remove("edit-none");
    waitElement.classList.add("edit-none");
    nameInputElement.value = '';
    commentInputElement.value = '';
    //buttonElement.textContent = "Написать";
    //buttonElement.classList.remove("click-none");
  }).catch((error) => {
    if (error.message === "Введенные имя или комментарий короче 3-х знаков") {
      alert("Ваше имя или Ваш комментарий короче 3-х знаков. Попробуйте еще раз!");
    } else if (error.message === "Сервер упал.") {
      buttonClick();
      //alert("Сервер упал. Попробуйте позже...");
    } else {
      alert("Что-то пошло не так, попробуйте позже...");
    };
    console.warn(error);
  })*/