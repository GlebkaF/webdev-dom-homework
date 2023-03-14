const buttonElement = document.querySelector('button.add-form-button');

const listElement = document.querySelector('.comments');

const inputNameElement = document.querySelector('.add-form-name');

const textareaElement = document.querySelector('.add-form-text');



const myDate = new Date();
const options = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  timezone: "UTC",
  hour: "numeric",
  minute: "2-digit"
};

options.hour = "2-digit";
const date = myDate.toLocaleDateString("ru-Ru", options).split(', ').join(' ');

//выключение кнопки

// buttonElement.disabled = true;
// const initDisabledButtonElement = () => {
//   document.querySelectorAll(".add-form-text,.add-form-name").forEach((input)=> {
// input.addEventListener("input", () => {
//     if(!inputNameElement.value || !textareaElement.value) {
//          buttonElement.disabled = true;
//     } else buttonElement.disabled = false;
//    });
//   });
// };
// initDisabledButtonElement();


const comments = [
  {
    name: 'Глеб Фокин',
    date: '12.02.22 12:18',
    comment: 'Это будет первый комментарий на этой странице',
    likesCounter: 3,
    isLike: false,
  },
  {
    name: 'Варвара Н.',
    date: '13.02.22 19:22',
    comment: 'Мне нравится как оформлена эта страница! ❤',
    likesCounter: 75,
    isLike: true,
  },
];

const renderComments = () => {
  const commentHtml = comments.map((comment, index) => {
    return `<li class="comment">
<div class="comment-header">
  <div>${comment.name}</div>
  <div>${comment.date}</div>
</div>
<div class="comment-body">
  <div class="comment-text">
    ${comment.comment}
  </div>
</div>
<div class="comment-footer">
  <div class="likes">
    <span class="likes-counter">${comment.likesCounter}</span>
    <button class="${comment.isLike ? "like-button -active-like" : "like-button"}" data-index='${index}'></button>
  </div>
</div>
</li>`
  }).join('');

  listElement.innerHTML = commentHtml;

  initChangeLikeButtonListeners();
}


const initChangeLikeButtonListeners = () => {
  const likeButtonElements = document.querySelectorAll('.like-button');
  //console.log(likeButtonElements)

  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener('click', () => {
      const index = likeButtonElement.dataset.index;

      // console.log(likeButtonElement);

      if (comments[index].isLike === false) {
        comments[index].likesCounter += 1;
        comments[index].isLike = true;


      } else {
        comments[index].likesCounter -= 1;
        comments[index].isLike = false;
      }

      renderComments();
    })
  }
};

renderComments();

buttonElement.addEventListener('click', () => {
  inputNameElement.classList.remove('error');
  textareaElement.classList.remove('error')
  if (!inputNameElement.value|| !textareaElement.value) {
    inputNameElement.classList.add('error');
    textareaElement.classList.add('error');
    return;
  };

  comments.push({
    name: inputNameElement.value,
    date: date,
    comment: textareaElement.value,
    likesCounter: 0,
    isLike: false,
  })

  renderComments();

  inputNameElement.value = '';
  textareaElement.value = '';



  // inputNameElement.disabled = true;
  // textareaElement.disabled = true;

});





