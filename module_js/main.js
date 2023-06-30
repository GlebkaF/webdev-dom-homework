import { getPromise, getPost } from "./api.js";
import {
  toggleButton,
  buttonElement,
  nameInputElement,
  textInputElement,
  userName,
  userPassword,
  userLogin,
} from "./variables.js";

getPromise();

// toggleButton.addEventListener("click", () => {
//   toggleButton.classList.remove("add-form-button-error");
//   toggleButton.classList.add("add-form-button");
//   userLogin.classList.remove("error");
//   userName.classList.remove("error");
//   userPassword.classList.remove("error");

//   if (
//     userName.value === "" ||
//     userLogin.value === "" ||
//     userPassword.value === ""
//   ) {
//     toggleButton.classList.remove("add-form-button");
//     toggleButton.classList.add("add-form-button-error");

//     if (userName.value === "") {
//       userName.classList.add("error");
//     }
//     if (userLogin.value === "") {
//       userLogin.classList.add("error");
//     }
//     if (userPassword.value === "") {
//       userPassword.classList.add("error");
//     }
//     return;
//   }
//   buttonElement.disabled = true;
//   buttonElement.textContent = "Идет обработка данных...";

//   getPost();
//   getPromise();
// });

buttonElement.addEventListener("click", () => {
  buttonElement.classList.remove("add-form-button-error");
  buttonElement.classList.add("add-form-button");
  nameInputElement.classList.remove("error");
  textInputElement.classList.remove("error");

  if (nameInputElement.value === "" || textInputElement.value === "") {
    buttonElement.classList.remove("add-form-button");
    buttonElement.classList.add("add-form-button-error");

    if (nameInputElement.value === "") {
      nameInputElement.classList.add("error");
    }
    if (textInputElement.value === "") {
      textInputElement.classList.add("error");
    }

    return;
  }

  buttonElement.disabled = true;
  buttonElement.textContent = "Элемент добавлятся...";

  getPost();
  getPromise();
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    buttonElement.click();
  }
});
