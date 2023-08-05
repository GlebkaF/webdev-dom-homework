//стартовый индикатор загрузки
export function startLoader() {
  const firstLoader = document.getElementById(`first-LoadText`);
  firstLoader.classList.add("firstLoader");
}
//создание html формы комментариев на основе массива
//renderComments и renderAddComment
//Создание поля "загрузка"
export function renderLoader() {
  const commentForm = document.getElementById(`add-formListId`);
  let resultCommentForm = (commentForm.innerHTML = `<div
           class="add-form-text"
          >loading data...</div>`);
  return resultCommentForm;
}
//ответ на комментарий после появления поля "загрузка"
export function commentReplyNew(comments, commentText) {
  //const commentText = document.getElementById(`commentText`);
  const commentTextNew = document.getElementById(`commentTextNew`);
  const commentNameNew = document.getElementById(`commentNameNew`);
  const commentBlockNew = document.querySelectorAll(`.comment`);
  for (const commentElementNew of commentBlockNew) {
    commentElementNew.addEventListener(`click`, () => {
      console.log(`aaaaaaa`);
      comments[commentElementNew.dataset.index].isCommentRepliy = true;
      commentTextNew.value = `${
        comments[commentElementNew.dataset.index].author.name
      }, ${comments[commentElementNew.dataset.index].text}`;
      commentTextNew.value = commentTextNew.value
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
      if (comments[commentElementNew.dataset.index].isCommentRepliy === true) {
        commentTextNew.value = `QUOTE_BEGIN${commentTextNew.value
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")}QUOTE_END`;
        commentText.value = commentTextNew.value;
      } else {
        commentTextNew.value = commentTextNew.value
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;");
        commentText.value = commentTextNew.value;
      }
    });
  }
}
// ответ на комментарий до создания поля "загрузка"
export function commentReply(comments, commentText) {
  const commentBlock = document.querySelectorAll(`.comment`);
  for (const commentElement of commentBlock) {
    commentElement.addEventListener(`click`, () => {
      console.log(`ggggg`);
      comments[commentElement.dataset.index].isCommentRepliy = true;
      commentText.value = `${
        comments[commentElement.dataset.index].author.name
      }, ${comments[commentElement.dataset.index].text}`;
      commentText.value = commentText.value
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
      if (comments[commentElement.dataset.index].isCommentRepliy === true) {
        console.log(`ggggg`);
        commentText.value = `QUOTE_BEGIN${commentText.value
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")}QUOTE_END`;
      } else {
        console.log(`ggggg`);
        commentText.value = commentText.value
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;");
      }
    });
  }
}
