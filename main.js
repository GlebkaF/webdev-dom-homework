import { getComments } from "./api.js";
import renderContainer from "./renderContainer.js";
import { postMethod } from "./api.js";
const containerElement = document.getElementById('container');
let comments = [];

function getPromise() {
  getComments().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        comDate: new Date(comment.date)
          .toLocaleString("ru-RU", options)
          .replace(",", ""),
        comText: comment.text,
        likes: comment.likes,
        isLiked: false,
        isEdit: false,
      };
    });
    comments = appComments;
    renderContainer(comments, containerElement);
    initEditListeners();
    initResponseCommentsListeners();
    initSaveListener();
    initEventListeners();
  });
}
getPromise();
const buttonElement = document.getElementById("add-button");
const textElement = document.getElementById("add-text");
const nameElement = document.getElementById("input-name");
const listElement = document.getElementById("list-comments");
const likeElements = document.querySelectorAll(".like-button");
const editElements = document.querySelectorAll(".edit-comment");
const initResponseCommentsListeners = () => {
  const responseComments = document.querySelectorAll(".comment");

  for (const responseComment of responseComments) {
    const index = responseComment.dataset.index;
    responseComment.addEventListener("click", () => {
      textElement.value = `< ${comments[index].comText} \n
${comments[index].name}`;
    });
  }
};

const initEventListeners = () => {
  const likeElements = document.querySelectorAll(".like-button");

  for (const likeElement of likeElements) {
    const index = likeElement.dataset.index;
    likeElement.addEventListener("click", (event) => {
      if (comments[index].isLiked === false) {
        comments[index].likes += 1;
        comments[index].isLiked = true;
      } else {
        comments[index].likes -= 1;
        comments[index].isLiked = false;
      }
      event.stopPropagation();
      renderContainer(comments, containerElement);
      initEditListeners();
      initResponseCommentsListeners();
      initSaveListener();
    });
  }
};
const initEditListeners = () => {
  const editElements = document.querySelectorAll(".edit-comment");
  for (const editElement of editElements) {
    const index = editElement.dataset.index;
    editElement.addEventListener("click", (event) => {
      comments[index].isEdit = true;
      event.stopPropagation();
      renderContainer(comments,  containerElement);
      initResponseCommentsListeners();
      initSaveListener();
      initEventListeners();
    });
  }
};

const initSaveListener = () => {
  const saveElements = document.querySelectorAll(".save-comment");
  for (const saveElement of saveElements) {
    const index = saveElement.dataset.index;
    const editTextElement = document.getElementById("edit-text");
    saveElement.addEventListener("click", (event) => {
      comments[index].comText = editTextElement.value.replaceAll("<", "&gt");
      event.stopPropagation();
      comments[index].isEdit = false;
      renderContainer(comments, containerElement);
      initEditListeners();
      initResponseCommentsListeners();
      initEventListeners();
    });
  }
};

const date = new Date();
const options = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
};
const forrmattedDate = date.toLocaleString("ru-RU", options).replace(",", "");

const checkValidity = () => {
  const nameValue = nameElement.value;
  const textValue = textElement.value;
  if (nameValue !== "" && textValue !== "") {
    buttonElement.disabled = false;
  } else {
    buttonElement.disabled = true;
  }
};

renderContainer(comments, containerElement);
nameElement.addEventListener("input", checkValidity);
textElement.addEventListener("input", checkValidity);

function addComment() {
  postMethod(nameElement.value, textElement.value)
    .then(() => {
      getPromise();
    })
    .then(() => {
      buttonElement.textContent = "Написать";
      nameElement.value = "";
      textElement.value = "";
      renderContainer(comments);
    })
    .catch((error) => {
      if (error.message == "Сервер сломался") {
        buttonElement.textContent = "Написать";
        buttonElement.disabled = false;
        addComment();
      } else if (error.message == "Короткое имя или текст") {
        alert("Имя и комментарий должны быть не короче 3 символов");
        buttonElement.textContent = "Написать";
        buttonElement.disabled = false;
      }
    });
}

buttonElement.addEventListener("click", () => {
  textElement.classList.remove("error");
  nameElement.classList.remove("error");

  if (textElement.value === "" && nameElement.value === "") {
    textElement.classList.add("error");
    nameElement.classList.add("error");
    return;
  } else if (textElement.value === "") {
    textElement.classList.add("error");
    return;
  } else if (nameElement.value === "") {
    nameElement.classList.add("error");
    return;
  } else {
    buttonElement.disabled = true;
    buttonElement.textContent = "Отправляем...";
    addComment();
  }

  buttonElement.disabled = true;
  renderContainer(comments,  containerElement);
});
