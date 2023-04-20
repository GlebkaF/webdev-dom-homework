const buttonElement = document.querySelector(".add-form-button");
const commentElement = document.querySelector(".comments");
const formName = document.querySelector(".add-form-name");
const formText = document.querySelector(".add-form-text");
const deleteButton = document.querySelector(".delete-form-button");

let commentsOld = [];

fetchComments = () => {
 fetch("https://webdev-hw-api.vercel.app/api/v1/Ekaterina_Ivanova/comments", {
  method: "GET"
}).then((response) => {
    response.json().then((responseData) => {
      let commentsApp = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          data: new Date(comment.date).toLocaleString(),
          text: comment.text,
          countLike: comment.likes,
          likeComment: false,
          isLoading: true,
        };
      });
      commentsOld = commentsApp;
    renderLike();
  });
});
};
fetchComments();

const renderLike = () => {
  const likeHtml = commentsOld.map((comment, index) => {
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

const initEventLike = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  for(const likeButton of likeButtons){
    const index = likeButton.dataset.index;
  likeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (commentsOld[index].likeComment) {
      commentsOld[index].likeComment = false;
      commentsOld[index].countLike -= 1;
    } else {
      commentsOld[index].likeComment = true;
      commentsOld[index].countLike += 1;
    }
    renderLike();
      });
    };
  };
  
  const answer = () => {
  const answerComments = document.querySelectorAll(".comment");
  for (const answerComment of answerComments){
    answerComment.addEventListener('click', () =>{
      const arr = commentsOld[answerComment.dataset.index];
      let str = arr.text + ' ' + arr.name;
      formText.value += `${str}`;
      formText.focus();
    });
  };
  };

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

 const newComment = fetch("https://webdev-hw-api.vercel.app/api/v1/Ekaterina_Ivanova/comments", {
    method: "POST",
    body: JSON.stringify({
      name: formName.value.replaceAll('<','&lt;').replaceAll('>','&gt;'),
      text: formText.value.replaceAll('<','&lt;').replaceAll('>','&gt;'),
    })
  }).then((response) => {
    response.json().then((responseData) => {
      if (responseData.result === 'ok') {
        fetchComments();
      }
      commentsOld = responseData.comments;
    })
  })


  renderLike();

formName.value = "";
formText.value = "";

});
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

/*const eventLoading = () => {
const loading = document.querySelector(".container");
buttonElement.addEventListener("click", (el) => {
  el.stopPropagation();
 loading.addEventListener("load", () => {
    loading.innerHTML = 'Комментарий добавляется...';
  })
});
renderLike();
}*/
