const listElement = document.getElementById("list");
const textInputElement = document.getElementById("text-input");

const getCommentHTML = (comment, index) => {
  return `<li class="comment" data-comment="${index}">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button${comment.favorite ? ' -active-like' : ''}" data-index="${index}"></button>
        </div>
      </div>
    </li>`;
}

export const renderComments = (comments) => {
  const initLikeButtonsListner = () => {
    const likeButtonElements = document.querySelectorAll(".like-button");

    for (const likeButtonElement of likeButtonElements) {
      likeButtonElement.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = likeButtonElement.dataset.index;
        comments[index].favorite ? comments[index].likes-- : comments[index].likes++;
        comments[index].favorite = !comments[index].favorite;
        renderComments(comments);
      });
    }
  };

  listElement.innerHTML = comments.map(getCommentHTML).join("");

  initLikeButtonsListner();

  const сommentElements = document.querySelectorAll(".comment");

  for (const сommentElement of сommentElements) {
    сommentElement.addEventListener("click", () => {
    const index = сommentElement.dataset.comment;
    console.log(comments[index]);
    textInputElement.value = `<${comments[index].text}
${comments[index].name},`;
    textInputElement.style.whiteSpace = "pre-line";
    })
  }
}