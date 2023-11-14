import { getDate, sendDate } from "./api.js";
import { renderComments } from "./renderComments.js";

//Функция fetchAndRenderComments
const fetchAndRenderComments = () => {
  getDate().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      const date = new Date(comment.date);
      return {
        name: comment.author.name,
        date: date.toLocaleString(),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });
    comments = appComments;
    const loaderID = document.getElementById("loaderID");
    loaderID.style.display = "none";
    renderComments({ comments, likeComment, butCom });
  });
};
//Конец Функция fetchAndRenderComments

let name;
let comments = [];
// -active-like"

//Функция для комменатрия
const butCom = (index) => {
  let commentInput = document.getElementById("commintInput");
  const comment = comments[index];
  commentInput.value = `${comment.text},${comment.name}`;
};

//DoneThis
const likeComment = (index) => {
  const comment = comments[index];
  if (comment.isLike) {
    comment.likes--;
    comment.isLike = false;
  } else {
    comment.likes++;
    comment.isLike = true;
  }
};
fetchAndRenderComments();
renderComments({ comments, likeComment, butCom });

// renderComments();

//Логика, которая отрабатывает после того, когда нажимается кнопки!
const input = document.getElementById("nameInput");
const button = document.getElementById("button");
const textArea = document.getElementById("commintInput");
function addComment() {
  const textArea = document.getElementById("commintInput");
  const ul = document.getElementById("ul");
  button.style.backgroundColor = "";
  input.style.backgroundColor = "";
  textArea.style.backgroundColor = "";

  if (input.value === "" && textArea.value === "") {
    button.style.backgroundColor = "grey";
    input.style.backgroundColor = "#FFB6C1";
    textArea.style.backgroundColor = "#FFB6C1";
    return;
  } else if (input.value === "") {
    input.style.backgroundColor = "#FFB6C1";
    return;
  } else if (textArea.value === "") {
    textArea.style.backgroundColor = "#FFB6C1";
    return;
  }

  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let formattedDate =
    day + "." + month + "." + year + " " + hours + ":" + minutes;

  input.value = "";
  textArea.value = "";

  //Нужно писать тут!
}

// Кнопка (Написать по клику)
button.addEventListener("click", function () {
  // addComment();
  // setupLikeButton();
  // addButtonLike();
  const addEventClick = () => {
    if (input.value === "" && textArea.value === "") {
      button.style.backgroundColor = "grey";
      input.style.backgroundColor = "#FFB6C1";
      textArea.style.backgroundColor = "#FFB6C1";
      return;
    } else if (input.value === "") {
      input.style.backgroundColor = "#FFB6C1";
      return;
    } else if (textArea.value === "") {
      textArea.style.backgroundColor = "#FFB6C1";
      return;
    }
    button.disabled = true;
    button.textContent = "Элемент добавляется.....";

    sendDate({
      name: input.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: addComment.formattedDate,
      text: textArea.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      likes: "0",
      isLike: false,
      forceError: true,
    })
      .then(() => {
        button.disabled = true;
        button.textContent = "Загружаю список…";
      })
      .then(() => {
        return fetchAndRenderComments();
      })
      .then((data) => {
        button.disabled = false;
        button.textContent = "Добавить";
        input.style.backgroundColor = "";
        textArea.style.backgroundColor = "";
        input.value = "";
        textArea.value = "";
      })
      .catch((error) => {
        // console.log(error.message);
        button.disabled = false;
        button.textContent = "Добавить";
        input.style.backgroundColor = "#FFB6C1";
        textArea.style.backgroundColor = "#FFB6C1";
        if (
          error.message === "Имя и комментарий должны быть не короче 3 символов"
        ) {
          alert("Имя и комментарий должны быть не короче 3 символов");
        }

        if (error.message === "Сервер сломался, попробуй позже") {
          alert("Сервер сломался, попробуй позже");
        }
        if ((error.message = "Failed to fetch")) {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
      });
    renderComments({ comments, likeComment, butCom });
  };
  addEventClick();
});
