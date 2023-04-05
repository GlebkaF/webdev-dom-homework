// const commentList = document.getElementById('comments__list');
// const inputName = document.getElementById('input__name');
// const commentText = document.getElementById('comment__text')
// const addCommentButton = document.getElementById('add-comm-button')

// addCommentButton.addEventListener('click', () => {
//   const oldCommentList = commentList.innerHTML;

//   commentList.innerHTML = oldCommentList + `<li class="comment">
//     <div class="comment-header">
//       <div>${inputName.value}</div>
//       <div>${commentDateMinute}</div>
//         </div>
//         <div class="comment-body">
//         <div class="comment-text">
//           ${commentText.value}
//         </div>
//       </div>
//       <div class="comment-footer">
//         <div class="likes">
//           <span class="likes-counter">0</span>
//           <button class="like-button"></button>
//         </div>
//       </div>
//     </li>`
// })


const listComment = document.getElementById('comments__list');
const inputName = document.getElementById('input__name');
const textComment = document.getElementById('comment__text');
const buttonAddComment = document.getElementById('button__add-comment');

//Получение и форматирование даты
const getDate = () => {
  const date = new Date();

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

buttonAddComment.addEventListener('click', () => {
  //Проверка на наличие данных
  inputName.classList.remove('add-form-error')
  textComment.classList.remove(`add-form-error`)
  if (inputName.value === '') {
    return inputName.classList.add('add-form-error');
  }
  if (textComment.value === '') {
    return textComment.classList.add('add-form-error')
  }

  listComment.innerHTML += `<li class="comment">
  <div class="comment-header">
    <div>${inputName.value}</div>
    <div>${getDate()}</div>
  </div>
  <div class="comment-body">
    <div class="comment-text">
      ${textComment.value}
    </div>
  </div>
  <div class="comment-footer">
    <div class="likes">
      <span class="likes-counter">0</span>
      <button class="like-button -active-like"></button>
    </div>
  </div>
</li>`
})

console.log(`It works!`);