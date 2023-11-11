import { postCommentsApi, userName } from "./api.js";
import { getApi } from "./main.js";

export const renderAddForm = () => {

  const appElement = document.getElementById("app");
  const form = `
    <div class="add-form" id="input-form">
    <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="add-name" />
    <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
      id="add-comment"></textarea>
    <div class="add-form-row">
      <button class="add-form-button" id="add-button">Написать</button>
    </div>
  </div>
  `
  appElement.innerHTML = form;



  const buttonElement = document.getElementById("add-button");
  const nameElement = document.getElementById("add-name");
  const commentElement = document.getElementById("add-comment");

  if (userName) {
    nameElement.value = userName;
    nameElement.disabled = true;
  }

  buttonElement.addEventListener("click", () => {
    nameElement.classList.remove("error");

    if (nameElement.value === "") {
      nameElement.classList.add("error");
      return;
    }

    commentElement.classList.remove("error");

    if (commentElement.value === "") {
      commentElement.classList.add("error");
      return;
    }
    buttonElement.disabled = true;
    buttonElement.textContent = "Элемент добавляется...";

    postCommentsApi({ nameElement, commentElement })
      .then((responseData) => {
        nameElement.value = "";
        commentElement.value = "";
        getApi();


      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Failed to fetch") {
          alert("Нет подключения к сети,попробуйте позже");
        } else {
          alert(error.message);
        }
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
      });
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
  });

}