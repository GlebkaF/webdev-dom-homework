import { commentPost, commentsGet } from "./api.js";
import { editButton } from "./editButton.js";
import { likedFunction } from "./isliked.js";
import { renderFunction } from "./renderFunction.js";

const text = document.querySelector('.add-form-text');
const name = document.querySelector('.add-form-name');
const button = document.querySelector('.add-form-button');
//const del = document.querySelectorAll('ul > li');
const downloadAlert = document.querySelector('h2')
const date = new Date();
button.disabled = true;
button.classList.add('unactive');

text.addEventListener("input", () => {
  button.disabled = false;
  button.classList.remove('unactive');
}); 
name.addEventListener("input", () => {
  button.disabled = false;
  button.classList.remove('unactive');
}); 



text.addEventListener("keyup", keyCode);

function keyCode(e) {
if (e.keyCode === 13) {
    addCommentare();
} else {
  return;
}
}


//+
let comments = [];
const apiCommentsGet = () => {
commentsGet()
.then((responseData) => {
  const apiComments = responseData.comments.map((comment) =>{
    return {
      name: comment.author.name,
      date: ((new Date(comment.date)).getDate() + "." + 0 + (Number((new Date(comment.date)).getMonth()) + 1) + "." + (Number((new Date(comment.date)).getFullYear()) - 2000) + " " + (new Date(comment.date)).getHours() + ":" + (new Date(comment.date)).getMinutes()),
      text: comment.text,
      like: comment.likes,
      isLiked: false,
      isEdit: false,
    }
});
comments = apiComments;
renderFunction({ comments, text });
}).then(() => {
  downloadAlert.style = 'display: none';
})

}
apiCommentsGet();
likedFunction({ comments });
editButton({ comments })


export const answerElement = () => {
  const answerTexts = document.querySelectorAll('.comment-text');
  for( const answerText of answerTexts)
  answerText.addEventListener('click', (event) => {
    event.stopPropagation();
    const index = answerText.dataset.index; 
      text.value = `BEGIN_QUOTE > ${comments[index].name} \n  ${comments[index].text} QUOTE_END \n`;

      renderFunction({ comments });

  })
}


button.addEventListener("click", () => {
  addCommentare();

});


function addCommentare() {
      let savedTextValue = text.value;
      let savedNameValue = name.value;
  text.classList.remove('red');
  name.classList.remove('red');
  if(name.value === '' && text.value === '') {
    text.placeholder = 'Это поле не должно быть пустым'
    text.classList.add('red');
    name.placeholder = 'Это поле не должно быть пустым'
    name.classList.add('red');
    return;
  }
  else if (name.value === '') {
    name.placeholder = 'Это поле не должно быть пустым'
    name.classList.add('red');
    return;
  } else if (text.value === ''){
    text.placeholder = 'Это поле не должно быть пустым'
    text.classList.add('red');
    return;
  }
  button.textContent = 'Загрузка.'
  button.disabled = true;
  button.classList.add('unactive');

function postComment () {
  commentPost({ text, name })

    .then(() => {
    return apiCommentsGet();
    })

    .then((response) => {
      button.textContent = 'Написать'
      name.value = '';
      text.value = '';
    })
    .catch((error) => {
      console.warn(error);
      if (error.message === 'некорректный запрос') {
        alert('Имя и комментарий должны быть не короче 3 символов');
      }
      if (error.message === 'ошибка сервера') {
        alert('Сломался сервер, попробуйте позже');
        postComment();
      }
      if (window.navigator.onLine === false) {
        alert('Проблемы с интернетом, проверьте подключение.');
      }
      button.disabled = false;
      button.textContent = 'Написать'
      button.classList.remove('unactive');
      button.classList.add('class="add-form-button"')
      name.value = savedNameValue;
      text.value = savedTextValue;
    })
};
postComment();

  name.value = '';
  text.value = '';

  renderFunction({ comments });
  
}