const ulElements = document.getElementById("ul");
export const renderComments = ({ comments, likeComment, butCom }) => {
  const commentsHTML = comments
    .map((comment, index) => {
      return `<li class="comment" id ="comment" data-index="${index} ">
          <div class="comment-header">
            <div id="commentName">${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div  id="commentText" class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${
                comment.isLike ? "-active-like" : ""
              }" ></button>
            </div>
          </div>
        </li>`;
    })
    .join("");
  ulElements.innerHTML = commentsHTML;
  //Кнопка лайка
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((likeButton, index) => {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      likeComment(index);
      renderComments();
    });
  });

  //Кнопка комментария
  //Дальне не понимаю что нужно сделать
  const commentButton = document.querySelectorAll(".comment-text");
  commentButton.forEach((comBut, index) => {
    comBut.addEventListener("click", (event) => {
      event.stopPropagation();
      butCom(index);
      renderComments();
    });
  });
};
