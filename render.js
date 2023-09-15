export function renderComments() {
  const commentsListHtml = comments
    .map((comment, index) => {
      console.log(comment);
      return `
          <li class="comment" data-name="${comment.name}" data-text="${
        comment.text
      }" data-index="${index}">
              <div class="comment-header">
                  <div>${comment.name}</div>
                  <div>${comment.date}</div>
              </div>
              <div class="comment-body">
                  <div class="comment-text" style="white-space:pre-line">
                      ${comment.text}
                  </div>
              </div>
              <div class="comment-footer">
                  <div class="likes">
                      <span class="likes-counter">${comment.likes}</span>
                      <button class="like-button ${
                        comment.isLiked ? "-active-like" : ""
                      }">
                      </button>
                  </div>
              </div>
          </li>
          `;
    })
    .join("");

  const commentsList = document.querySelector(".comments");
  commentsList.innerHTML = commentsListHtml;

  const commentListItems = commentsList.querySelectorAll(".comment");
  for (const commentListItem of commentListItems) {
    const likeButton = commentListItem.querySelector(".like-button");
    const commentIndex = commentListItem.dataset.index;
    const comment = comments[commentIndex];

    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      if (comment.isLiked) {
        comment.isLiked = false;
        comment.likes--;
      } else {
        comment.isLiked = true;
        comment.likes++;
      }

      renderComments();
    });
  }
}
const initEventListeners = () => {
  const buttonElements = document.querySelectorAll(".like-button");

  for (const buttonElement of buttonElements) {
    buttonElement.addEventListener("click", () => {
      const index = buttonElement.dataset.index;

      if (comments[index].isLiked) {
        comments[index].isLiked = false;
        comments[index].likes--;
      } else {
        comments[index].isLiked = true;
        comments[index].likes++;
      }

      renderComments();
    });
  }
};
