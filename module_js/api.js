import { formatDate, nameInputElement, textInputElement } from "./variables";
import { renderComments } from "./render";

function getPromise() {
  const fetchPromise = fetch(
    "https://wedev-api.sky.pro/api/v1/qwitchers/comments",
    {
      method: "GET",
    }
  );

  fetchPromise.then((responce) => {
    responce.json().then((responceData) => {
      const appComments = responceData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: formatDate(comment.date),
          text: comment.text,
          likes: "0",
          isLiked: false,
        };
      });
      comments = appComments;
      renderComments();
    });
  });
}

function getPost() {
  fetch("https://wedev-api.sky.pro/api/v1/qwitchers/comments", {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value,
      date: formatDate(),
      text: textInputElement.value,
      likes: "0",
      isLiked: false,
      forseError: true,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 500) {
        alert("Извините, похоже что-то с сервером. Попробуйте позже");
      } else if (response.status === 400) {
        alert("Некорректно переданны данные");
        alert(
          "Проверьте, корректность введенных данных имени и текста комментария: Имя или текст не должны быть короче 3 символов"
        );
      }
    })
    .then((responseData) => {
      return getPromise();
    })
    .then(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      textInputElement.value = "";
    })
    .catch((error) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      alert("Что-то пошло не так, попробуйте снова");
    });
}

export { getPromise, getPost };
