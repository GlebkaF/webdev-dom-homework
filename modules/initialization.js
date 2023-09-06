export const initializator = (listCom, comments, commitInput) => {
  function renderComments() {
    return (listCom.innerHTML = comments
      .map((comment, index) => {
        return `<li class="comment" data-username="${
          comment.author.name
        }" data-text="${comment.text}">
              <div class="comment-header">
                <div class="usersNames">${comment.author.name}</div>
                <div>${comment.date}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  <a class="scroll-commenting" href="#scroll">${comment.text}</a>
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comment.likes}</span>
                  <button data-index ="${index}" class="like-button ${
          comment.isLiked === true ? "-active-like" : ""
        }"></button>
                </div>
              </div>
            </li>`;
      })
      .join(""));
  }
  function answerToComment() {
    const commentsToAnswer = document.querySelectorAll(".comment");
    for (const commentToAnswer of commentsToAnswer) {
      commentToAnswer.addEventListener("click", () => {
        commitInput.value = `Комментарий: ${commentToAnswer.dataset.text}\n\nАвтор: ${commentToAnswer.dataset.username}\n\nОтвет: `;
      });
    }
  }
  function likeButtons() {
    const buttonLikes = document.querySelectorAll(".like-button");
    for (const buttonLike of buttonLikes) {
      buttonLike.addEventListener("click", (event) => {
        event.stopPropagation();
        if (comments[buttonLike.dataset.index].isLiked === true) {
          comments[buttonLike.dataset.index].isLiked = false;
          comments[buttonLike.dataset.index].likes--;
        } else if (comments[buttonLike.dataset.index].isLiked === false) {
          comments[buttonLike.dataset.index].isLiked = true;
          comments[buttonLike.dataset.index].likes++;
        }
        renderComments();
        answerToComment();
        likeButtons();
      });
    }
  }
  renderComments();
  likeButtons();
  answerToComment();
};
