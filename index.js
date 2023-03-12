const buttonElement = document.querySelector('button.add-form-button');
// console.log(document.querySelector('button.add-form-button'))
const listElement = document.querySelector('.comments');
// console.log(document.querySelector('.comments'));
const inputNameElement = document.querySelector('.add-form-name');
// console.log(document.querySelector('.add-form-name'));
const textareaElement = document.querySelector('.add-form-text');
// console.log(document.querySelector('.add-form-text'));
// console.log(listElement.innerHTML);


const myDate = new Date();
let options = { 
    year: "2-digit", 
    month: "2-digit", 
    day: "2-digit", 
    timezone: "UTC",
    hour: "numeric", 
    minute: "2-digit" 
}; 

options.hour = "2-digit"; 
let shortStyleRu = myDate.toLocaleDateString("ru-Ru", options).split(', ').join(' '); 

// buttonElement.disabled = true;
// inputNameElement.oninput = () => {
// if(inputNameElement.value === ''){
//     buttonElement.disabled = true;
// } else {
//     buttonElement.disabled = false;
// }
// };

// textareaElement.oninput = () => {
//     textareaElement.value === '' ? buttonElement.disabled = true : buttonElement.disabled = false;
// };


const comments = [
  {
    name: 'Глеб Фокин',
    date: '12.02.22 12:18',
    comment: 'Это будет первый комментарий на этой странице',
    likesCounter: 3,
  },
  {
    name: 'Варвара Н.',
    date: '13.02.22 19:22',
    comment: 'Мне нравится как оформлена эта страница! ❤',
    likesCounter: 75,
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
    <button class="like-button -active-like" data-index='${index}'></button>
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

      if(likeButtonElement.classList.contains('-active-like')) {
        comments[index].likesCounter += 1;
        likeButtonElement.classList.remove('-active-like');
        
      } else {
        comments[index].likesCounter -= 1;
        likeButtonElement.classList.add('-active-like');
      }

      renderComments();
    })    
  }
};

renderComments();

buttonElement.addEventListener('click', () => {
    inputNameElement.classList.remove('error');
    textareaElement.classList.remove('error')
  if(inputNameElement.value === '' || textareaElement.value === '') {
    inputNameElement.classList.add('error');
    textareaElement.classList.add('error');
    return;
  }
  
    const oldListHtml = listElement.innerHTML;
    listElement.innerHTML = oldListHtml + 
    `<ul class="comments" id="comments">
    <li class="comment">
    <div class="comment-header">
      <div>${inputNameElement.value}</div>
      <div>${shortStyleRu}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
      ${textareaElement.value}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">0</span>
        <button class="like-button"></button>
      </div>
    </div>
    </li>`;

    inputNameElement.value = '';
    textareaElement.value = '';

  

    // inputNameElement.disabled = true;
    // textareaElement.disabled = true;

});





