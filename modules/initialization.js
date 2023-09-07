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
                  <a class="scroll-commenting" href="#scroll">${
                    comment.text
                  }</a>
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comment.likes}</span>
                  <button data-index ="${index}" id="${comment.id}" data-token="${comment.token}" class="like-button ${
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
        fetch(`https://wedev-api.sky.pro/api/v2/levchenko5/comments/${buttonLike.id}/toggle-like`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${buttonLike.dataset.token}`,
            }
          }).then((response) => {
            return response.json();
          }).then((response) => {
            const isLikedStatus = [response.result.isLiked, response.result.likes];
            return isLikedStatus;
          }).then((isLikedStatus) => {
              comments[buttonLike.dataset.index].isLiked = isLikedStatus[0];
              comments[buttonLike.dataset.index].likes = isLikedStatus[1];
              initializator(listCom, comments, commitInput);

        })
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
