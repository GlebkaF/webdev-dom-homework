import { fetchComments, newComment, registerUser } from "./api.js";
import { isLogin, renderLogin } from "./login-component.js";
import { renderTasksList } from "./commentList.js";
import { delay } from "./dalay.js";
import { loginUser } from "./api.js";

const load = document.querySelector(".load");
load.style.display = "flex";
let comment = [];

let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';
token = null;


const answer = () => {
  const answerComments = document.querySelectorAll(".comment");
  const formText = document.querySelector(".add-form-text");
  for (const answerComment of answerComments){
    answerComment.addEventListener('click', () =>{
      const arr = comment[answerComment.dataset.index];
      let str = arr.text + ' ' + arr.name;
      formText.value += `${str}`;
      formText.focus();
    });
  };
  };

  const initEventLike = () => {
    const likeButtons = document.querySelectorAll(".like-button");
    for(const likeButton of likeButtons){
      const index = likeButton.dataset.index;
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      likeButton.classList.add("load-like");
      delay(2000).then(() => {
      if (comment[index].likeComment = !comment[index].likeComment) {
        comment[index].likeComment = false;
        comment[index].likes += 1;
      } else {
        comment[index].likeComment = true;
        comment[index].likes -= 1;
      }
      likeButton.classList.remove("load-like");
      renderTasks();
      initEventLike();
      });
        });
      };
    };
    const renderTasks = () => {
      const appEl = document.querySelector(".container");
      
      if(!token) {
      renderLogin({appEl});
      initializeLoginListener();
      return;
      };
      
      renderTasksList({root: appEl, comments: comment});
    
      const deleteButton = document.querySelector('.delete-form-button');
      deleteButton.addEventListener("click", () => {
        comment.pop();
        renderTasks();
      });
    
    const form = document.querySelector(".add-form");
    const newForm = form.innerHTML;
    
    answer();
    initEventLike();
    
    const buttonElement = document.querySelector(".add-form-button");
    const formName = document.querySelector(".add-form-name");
    const formText = document.querySelector(".add-form-text");
    
    buttonElement.addEventListener("click", () => {
      formName.classList.remove("error");
      if (formName.value === ""){
        formName.classList.add("error");
        return;
      };
      formText.classList.remove("error");
      if (formText.value === ""){
        formText.classList.add("error");
        return;
      };
    
      buttonElement.disabled = true;
      form.innerHTML = "Комментарий добавляется...";
      });
    
    const handlePostClick = () => {
      return newComment({name: formName.value, text:formText.value, token})
      .then((response) => {
        if(response.status === 500){
          throw new Error("Ошибка сервера");
        }
        })
        .then(() => {
           return fetch();
        })
      .then(() => {
        buttonElement.disabled = false;
        form.innerHTML = newForm;
        formName.value = "";
        formText.value = "";
      })
      .catch((error) => {
        buttonElement.disabled = false;
        form.innerHTML = newForm;
        if(error.message === "Ошибка сервера"){
          alert("Сервер сломался")
            }
          })
      };
    
      buttonElement.addEventListener("click", handlePostClick);
    
    formName.addEventListener('keyup', function(event) {
      if(event.keyCode === 13) {
        event.preventDefault();
       buttonElement.click();
      }
    });
    formText.addEventListener('keyup', function(event) {
      event.preventDefault();
      if(event.keyCode === 13) {
        event.preventDefault();
       buttonElement.click();
      }
    });   
    };

const fetch = () => {
return fetchComments({ token })
.then((responseData) => {
comment = responseData.comments;
load.style.display = "none";
renderTasks();
})
.catch((err) => {
  alert("Кажется, у вас сломался интернет, попробуйте позже");
  console.warn(err);
});
};

const initializeLoginListener = () => {
  document.querySelector(".form-button-enter").addEventListener("click", () => {
    if(isLogin){
    const login = document.querySelector(".add-form-login");
    const password = document.querySelector(".add-form-password");
    if (!login) {
      alert("Введите логин");
      return;
    }
    if (!password) {
      alert("Введите пароль");
      return;
    }
    loginUser({
      login: login.value,
      password: password.value,
    }).then((user) => {
      token = `Bearer ${user.user.token}`;
      fetchComments({token: user.user.token}).then(data => {
        comment = data.comments;
        renderTasks()
      });
    }).catch((error) => {
      console.log(error);
      alert(error.message);
    });
  return;
} else {
    const login = document.querySelector(".add-form-login");
    const password = document.querySelector(".add-form-password");
    const name = document.querySelector(".add-form-name");
    if (!name) {
      alert("Введите имя");
      return;
    }
    if (!login) {
      alert("Введите логин");
      return;
    }
    if (!password) {
      alert("Введите пароль");
      return;
    }
    registerUser({
      login: login.value,
      password: password.value,
      name: name.value,
    }).then((user) => {
      token = `Bearer ${user.user.token}`;
      fetchComments({token: user.user.token}).then(data => {
        comment = data.comments;
        renderTasks()
      });
    }).catch((error) => {
      console.log(error);
      alert(error.message);
    });
  };
  return;
});
};
renderTasks();
