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

//Callback комментария
const commentSend = () => {
  inputName.classList.remove('add-form-error')
  textComment.classList.remove(`add-form-error`)
  if (inputName.value.trim() === '') {
    return inputName.classList.add('add-form-error');
  }
  if (textComment.value.trim() === '') {
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
}

buttonAddComment.addEventListener('click', () => {
  commentSend()
})

//Отправка по кнопке Enter
textComment.addEventListener('keydown', (key) => {
  if (key.code === 'Enter') {
    commentSend()
  }
})

//Валидация данных
const switchButton = () => {
  if (inputName.value.trim() !== '' && textComment.value.trim() !== '') {
    buttonAddComment.disabled = false
    buttonAddComment.classList.remove('add-form-button-disabled')
  } else {
    buttonAddComment.disabled = true;
    buttonAddComment.classList.add('add-form-button-disabled')
  }
}

inputName.addEventListener('input', switchButton);
textComment.addEventListener('input', switchButton)

//Удаление последнего комментария
const buttonDelComment = document.getElementById('button__del-comment').addEventListener('click', () => {
  const lastComment = listComment.innerHTML.lastIndexOf('<li class="comment">');
  listComment.innerHTML = listComment.innerHTML.slice(0, lastComment)
})