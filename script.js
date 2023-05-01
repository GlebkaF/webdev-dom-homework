import { fetchComments, newComment } from "./api.js";
import { renderLike } from "./render.js";

const buttonElement = document.querySelector(".add-form-button");
const commentElement = document.querySelector(".comments");
const formName = document.querySelector(".add-form-name");
const formText = document.querySelector(".add-form-text");
const deleteButton = document.querySelector(".delete-form-button");
const form = document.querySelector(".add-form");
const newForm = form.innerHTML;
const load = document.querySelector(".load");
const newLoad = commentElement.innerHTML;
let comments = [];
load.textContent = "Подождите, пожалуйста, комментарии загружаются...";

function fetch () {
fetchComments()
.then((responseData) => {
  load.innerHTML = newLoad;
      return comments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        data: new Date(comment.date).toLocaleString(),
        text: comment.text,
        countLike: comment.likes,
        likeComment: false,
        isLoading: true,
      }
    })
  })
.then((comments) => {
  renderLike(comments, commentElement);
  initEventLike();
  answer();
})
.catch((err) => {
  alert("Кажется, у вас сломался интернет, попробуйте позже");
  console.warn(err);
});
};
fetch();


function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};

const initEventLike = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  for(const likeButton of likeButtons){
    const index = likeButton.dataset.index;
  likeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    likeButton.classList.add("load-like");
    delay(2000).then(() => {
    if (comments[index].likeComment = !comments[index].likeComment) {
      comments[index].likeComment = false;
      comments[index].countLike += 1;
    } else {
      comments[index].likeComment = true;
      comments[index].countLike -= 1;
    }
    likeButton.classList.remove("load-like");
    renderLike(comments, commentElement);
    initEventLike();
    });
      });
    };
  };


  const answer = () => {
  const answerComments = document.querySelectorAll(".comment");
  for (const answerComment of answerComments){
    answerComment.addEventListener('click', () =>{
      const arr = comments[answerComment.dataset.index];
      let str = arr.text + ' ' + arr.name;
      formText.value += `${str}`;
      formText.focus();
    });
  };
  };
fetch();
answer();

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
  comments.push({
    name: formName.value.replaceAll('<','&lt;').replaceAll('>','&gt;'),
    text: formText.value.replaceAll('<','&lt;').replaceAll('>','&gt;'),
    data: new Date().toLocaleString(),
    countLike: 0,
    likeComment: false,
    isLoading: true,
  });

 newComment(formName.value, formText.value)
 .then((response) => {
    if(response.status === 500){
      throw new Error("Ошибка сервера");
    } 
    if (response.status === 400){
      throw new Error("Неверный запрос");
    } else {
      return response.json();
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
      return;
    } 
    if(formName.value.length <= 3 || formText.value.length <= 3){
      alert('Имя и комментарий должны быть не короче 3 символов');
      return;
    } else {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    }
    console.warn(error);
  });
  renderLike(comments, commentElement);
});

const handlePostClick = () => {
  newComment(formName.value, formText.value)
  .then((response) => {
    if(response.status === 500){
      throw new Error("Ошибка сервера");
    }
    })
    .then(() => {
       return fetchComments();
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
          handlePostClick();
        }
      })
    renderLike(comments, commentElement);
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

deleteButton.addEventListener("click", () => {
  const lastComment = commentElement.innerHTML.lastIndexOf('<li class="comment">');
    commentElement.innerHTML = commentElement.innerHTML.slice(0, lastComment);
});