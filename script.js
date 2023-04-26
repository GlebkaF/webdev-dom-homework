const buttonElement = document.querySelector(".add-form-button");
const commentElement = document.querySelector(".comments");
const formName = document.querySelector(".add-form-name");
const formText = document.querySelector(".add-form-text");
const deleteButton = document.querySelector(".delete-form-button");
const load = document.querySelector(".load");
const form = document.querySelector(".add-form");
const newForm = form.innerHTML;
const newLoad = commentElement.innerHTML;

let comments = [];
load.textContent = "Подождите, пожалуйста, комментарии загружаются...";

fetchComments = () => {
 return fetch("https://webdev-hw-api.vercel.app/api/v1/Ekaterina_Ivanova/comments", {
  method: "GET"
})
.then((response) => {
     return response.json();
})
.then((responseData) => {
      comments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          data: new Date(comment.date).toLocaleString(),
          text: comment.text,
          countLike: comment.likes,
          likeComment: false,
          isLoading: true,
        }
      })
      load.innerHTML = newLoad;
      renderLike();
    })
  .catch((err) => {
    alert("Кажется, у вас сломался интернет, попробуйте позже");
    console.warn(err);
  });
};
/*let comments = [];

load.textContent = "Подождите, пожалуйста, комментарии загружаются...";
fetchComments = () => {
 return fetch("https://webdev-hw-api.vercel.app/api/v1/Ekaterina_Ivanova/comments", {
  method: "GET"
})
.then((response) => {
     return response.json();
})
.then((responseData) => {
      comments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          data: new Date(comment.date).toLocaleString(),
          text: comment.text,
          countLike: comment.likes,
          likeComment: false,
          isLoading: true,
        }
      })
      renderLike();
      load.style.display = 'none';
    })
};
fetchComments();*/

const renderLike = () => {
  const likeHtml = comments.map((comment, index) => {
    return ` <li data-index="${index}" class="comment">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.data}</div>
      </div>
      <div data-index="${index}" class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.countLike}</span>
          <button data-index="${index}"class="like-button ${comment.likeComment ? '-active-like' : ''}"></button>
        </div>
      </div>
    </li>`
}).join("");
  commentElement.innerHTML = likeHtml;
  initEventLike();
  answer();
};

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
      comments[index].countLike -= 1;
    } else {
      comments[index].likeComment = true;
      comments[index].countLike += 1;
    }
    renderLike();
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
fetchComments();
renderLike();

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

 const newComment = fetch("https://webdev-hw-api.vercel.app/api/v1/Ekaterina_Ivanova/comments", {
    method: "POST",
    body: JSON.stringify({
      name: formName.value.replaceAll('<','&lt;').replaceAll('>','&gt;'),
      text: formText.value.replaceAll('<','&lt;').replaceAll('>','&gt;'),
      forceError: true,
    }),
  })
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
});
renderLike();

const handlePostClick = () => {
  fetch("https://webdev-hw-api.vercel.app/api/v1/Ekaterina_Ivanova/comments", {
    method: "POST",
    body: JSON.stringify({
      name: formName.value.replaceAll('<','&lt;').replaceAll('>','&gt;'),
      text: formText.value.replaceAll('<','&lt;').replaceAll('>','&gt;'),
      forceError: true,
    }),
  })
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
      });
  };
  renderLike();

  buttonElement.addEventListener("click", handlePostClick);

formName.addEventListener('keyup', function(event) {
  event.preventDefault();
  if(event.keyCode === 13) {
   buttonElement.click();
  }
});
formText.addEventListener('keyup', function(event) {
  event.preventDefault();
  if(event.keyCode === 13) {
   buttonElement.click();
  }
});

deleteButton.addEventListener("click", () => {
  const lastComment = commentElement.innerHTML.lastIndexOf('<li class="comment">');
    commentElement.innerHTML = commentElement.innerHTML.slice(0, lastComment);
});