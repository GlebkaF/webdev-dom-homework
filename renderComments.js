const listComments = document.getElementById("comments-list");
const commentInputElement = document.getElementById("comment-input");


export const renderComments = ({comments, clickLike}) => {
    const commentsHtml = comments
      .map((comment, index) => {
        if (comment.active === true) {
          comment.active = "-active-like";
        }
        return `<li class="comment" id="comment-new" data-test="${index}">
        <div class="comment-header">
          <div id="comment-name">${comment.name}</div>
          <div id="comment-data">${comment.date}</div>
        </div>
        <div class="comment-body">
          ${
            comment.isEdit
              ? `<textarea type="textarea" class="add-form-text edit-form" rows="4"  data-edit="${index}" >
            ${comment.text}</textarea>`
              : `<div class="comment-text" style="white-space:pre-line" id="comment-text" data-text=${index}>
            ${comment.text}</div>`
          }
        </div>
        <button class="add-form-button" data-edit="${index}">${
          comment.isEdit ? "Сохранить" : "Редактировать"
        }</button>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter" id="like-text" value="">${
          comment.like
        }</span>
            <button class="like-button ${
              comment.active
            }" data-index="${index}"></button>
          </div>
        </div>
      </li>`;
      })
      .join("");
    listComments.innerHTML = commentsHtml;

    const buttonLikes = document.querySelectorAll(".like-button");
    buttonLikes.forEach((button) => {
      button.addEventListener("click", clickLike);
    });

    const commentElements = document.querySelectorAll(".comment");
    for (const commentElement of commentElements) {
      commentElement.addEventListener("click", () => {
        const index = commentElement.dataset.test;
        commentInputElement.value = ">" + comments[index].text + "\n" + "\n" + comments[index].name + ",";
    renderComments({comments, clickLike});
      });
    }

    // const buttonEdit = document.querySelectorAll(".add-form-button");
    // buttonEdit.forEach((button) => {
    //   button.addEventListener("click", clickEdit);
    // });
  };