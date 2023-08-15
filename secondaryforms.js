//import { initLikeButton } from "./comment";
//initLikeButton(comments, commentText)
//стартовый индикатор загрузки
export function startLoader() {
  const firstLoader = document.getElementById(`first-LoadText`);
  firstLoader.classList.add("firstLoader");
}

//Создание поля "загрузка"
export function renderLoader() {
  const commentForm = document.getElementById(`add-formListId`);
  let resultCommentForm = (commentForm.innerHTML = `<div
           class="add-form-text"
          >loading data...</div>`);
  return resultCommentForm;
}
//ответ на комментарий после появления поля "загрузка"
export function commentReplyNew(comments) {
  const commentText = document.getElementById(`commentText`);
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
  // const commentText = document.getElementById(`commentText`);
  const commentBlock = document.querySelectorAll(`.comment`);
  for (const commentElement of commentBlock) {
    // const commentText = document.getElementById(`commentText`);
    commentElement.addEventListener(`click`, () => {
      comments[commentElement.dataset.index].isCommentRepliy = true;
      console.log(`${comments[commentElement.dataset.index].isCommentRepliy}`);

      commentText.value = `${
        comments[commentElement.dataset.index].author.name
      }, ${comments[commentElement.dataset.index].text}`;

      commentText.value = commentText.value
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

      if (comments[commentElement.dataset.index].isCommentRepliy === true) {
        commentText.value = `QUOTE_BEGIN${commentText.value
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")}QUOTE_END`;
      } else {
        commentText.value = commentText.value
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;");
      }
    });
  }
}
function goBackForm() {
  const chooseForm = document.getElementById(`choose-formListId`);
  const loginForm = document.getElementById(`login-formListId`);
  const goBackButton = document.getElementById(`back-form-buttonListId`);
  const loginName = document.getElementById(`autorizationName`);
  const regButton = document.getElementById(`reg-form-buttonListId`);
  const loginButton = document.getElementById(`login-form-buttonListId`);

  goBackButton.addEventListener(`click`, () => {
    chooseForm.classList.remove(`view-form`);
    loginForm.classList.add(`view-form`);
    loginName.classList.remove(`view-form`); //открываем поле ИМЯ
    loginButton.classList.remove(`view-form`); //открываем кнопку ВХОДА
    regButton.classList.remove(`view-form`); // открываем кнопку РЕГ
  });
}
goBackForm();
