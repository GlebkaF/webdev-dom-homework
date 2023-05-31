
const commentsElement = document.getElementById("comments");
const userCommentElement = document.getElementById("userComment");
const deleteCommentElement = document.getElementById("deleteComment");
const likeElement = document.getElementById("like");
const formElement = document.getElementById("form");
const timeLoadElement = document.getElementById("timeLoad");
const formContainElement = document.getElementById("formContain");

import { checkAndAdd, getComments,addNewUser,authorization, deleteComment } from "./api.js";
import { renderComments,renderForm} from "./render.js";
import { notRegForm, enterForm, regForm, standardForm } from "./formData.js";

let arrComments = [];
let token = `Bearer ${localStorage.getItem('userToken')}`;

  if (!localStorage.getItem('userToken')) {
    getComments(arrComments, commentsElement,null).then((response) => {
      timeLoadElement.style.display = "none"
    });
    renderForm(formContainElement,notRegForm);
  } else {
    getComments(arrComments, commentsElement, token).then((response) => {
      timeLoadElement.style.display = "none"
    });
    renderForm(formContainElement,standardForm);
    document.getElementById("userName").value = localStorage.getItem('userName');
    document.getElementById("userName").disabled = true;
  }


document.getElementById("formContain").addEventListener("click", event => {
  if (event.target.className === "add-form-button") {
    const addCommentElement = document.getElementById("addComment");
    checkAndAdd(arrComments, commentsElement, addCommentElement,token);
  }

  if (event.target.className === "enter-form-button") {
    if (document.getElementById("userLogin").value === "") {
      return;
    }
    if (document.getElementById("userPassword").value === "") {
      return;
    }
    authorization().then(() => {
      if (!localStorage.getItem('userToken')) {
        commentsElement.innerHTML = "";
        renderForm(formContainElement,enterForm);
      } else {
        getComments(arrComments, commentsElement,token);
        renderForm(formContainElement,standardForm);
        document.getElementById("userName").value = localStorage.getItem('userName');
        document.getElementById("userName").disabled = true;
        // НЕ РАБОТАЕТ СОБЫТИЕ
        document.getElementById("form").addEventListener('keyup', function(event){
          if (event.key === "Enter") {
            checkAndAdd(arrComments, commentsElement, addCommentElement, token);
          }
      // _______________________
      });
      }

    });
  }

  if (event.target.className === "reg-form-button") {
    if (document.getElementById("userLogin").value === "") {
      return;
    }
    if (document.getElementById("userPassword").value === "") {
      return;
    }
    if (document.getElementById("userName").value === "") {
      return;
    }
    addNewUser().then(() => {
      commentsElement.innerHTML = "";
      renderForm(formContainElement,enterForm);
    });
  }

  if (event.target.className === "exit-button") {
    localStorage.clear();
    getComments(arrComments, commentsElement);
    renderForm(formContainElement,notRegForm);
  }

  if (event.target.className === "enter-form-authorization") {
    commentsElement.innerHTML = "";
    renderForm(formContainElement,enterForm);
  }

  if (event.target.className === "switch-to-reg-form") {
      commentsElement.innerHTML = "";
      renderForm(formContainElement,regForm);
  }
});

document.getElementById("add-form").addEventListener('keyup', function(event){
    if (event.key === "Enter") {
      checkAndAdd(arrComments, commentsElement, addCommentElement);
    }

});


