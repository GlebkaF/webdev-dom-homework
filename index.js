"use strict";

let isReplay = false;

let loader = false;
const addForm = document.querySelector('.add-form')

const formRender = () => {

  if (loader) {
    addForm.innerHTML = `<p>Loading...</p>`
  } else {
    addForm.innerHTML = `<input 
    id="name-input"
    type="text"
    class="add-form-name"
    placeholder="Введите ваше имя"
  />
  <!--Сюда будет вводится ИМЯ-->
  <textarea
    id="text-input"
    type="textarea"
    class="add-form-text"
    placeholder="Введите ваш коментарий" 
    rows="4"
  ></textarea>
  <!--Сюда будет вводится ТЕКСТ-->
  <div class="add-form-row">
    <button id="form-button" class="add-form-button">Написать</button>
  </div>`;
    clickEventButton();
  }
}
// formRender();

const formButtonElement = document.getElementById("form-button");
const commentBlockElement = document.getElementById("comment-block");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");



const getFunction = () => {
  loader = true;
  formRender();
  fetch('https://wedev-api.sky.pro/api/v1/:ErmushinRomant/comments',
    {
      method: 'GET',
    }).then((response) => {
      if (response.status != 200) {
        throw new Error('error')
      } else {
        return response.json();
      }
    }).then((responseData) => {
      commentators = responseData.comments;
      renderCommentators();
      loader = false;
      formRender();
    }).catch((error) => {
      console.warn(error)
      // alert('Кажется у Вас пропал интернет');
      if (error.message === 'NetworkError when attempting to fetch resource.') {
        alert('Кажется, у Вас пропал интернет, обновите страницу позже.')
        if (error.message === 'error') {
          alert('Что то пошло не так, обновите страницу')
        }
      }
    })

}
getFunction();

function postFunction() {
  const nameInputElement = document.getElementById("name-input");
  const textInputElement = document.getElementById("text-input");
  fetch('https://wedev-api.sky.pro/api/v1/:ErmushinRomant/comments', {
    method: 'POST',
    body: JSON.stringify({
      name: nameInputElement.value,
      text: textInputElement.value,
      forceError: true,
    })
  }).then((response) => {
    console.log(response.type);
    if (response.status === 400) {
      throw new Error('< 2 sumb')
    } else if (response.status === 500) {
      throw new Error('server fall')
    } else {
      return response.json();
    }
  }).then((responseData) => {
    commentators = responseData.comment;
    getFunction();
  }).catch((error) => {
    console.warn(error)
    if (error.message === 'NetworkError when attempting to fetch resource.') {
      alert('Кажется, у Вас пропал интернет, обновите страницу позже.')
    };
    if (error.message === '< 2 sumb') {
      alert('Вы ввели слишком короткое имя либо комментарий');
      nameInputElement.classList.add("error");
      textInputElement.classList.add('error')
    };
    if (error.message === 'server fall') {
      alert('Сервер сломался, попробуй позже');
      postFunction()
    }
  });
};
// const postFunction

const dateInAPI = (dateInAPI) => {
  const myDate = dateInAPI;
  let day = myDate.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = myDate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let year = myDate.getFullYear() % 100;
  let hours = myDate.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = myDate.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let timeWithoutSeconds = hours + ":" + minutes;
  const fullDate =
    day + "." + month + "." + year + " " + timeWithoutSeconds;
  return fullDate;
};

let commentators = [];


const likeMaker = () => {
  const likeButtonElements = document.querySelectorAll('.like-button');
  likeButtonElements.forEach((likeButtonElement) => {
    likeButtonElement.addEventListener('click', (event) => {
      event.stopPropagation()
      const index = likeButtonElement.dataset.index
      const like = commentators[index];
      if (like.isLiked === false) {
        like.isLiked = true;
        like.likes += 1;
        renderCommentators()
      } else {
        like.isLiked = false;
        like.likes -= 1;
        renderCommentators()
      }
    })
  })
}

const replyТoСomment = () => {
  const commentElements = document.querySelectorAll('.comment');
  commentElements.forEach((commentElement) => {
    commentElement.addEventListener('click', () => {
      const index = commentElement.dataset.index;
      const person = commentators[index];
      const textInputElement = document.getElementById("text-input");
      textInputElement.value = `> ${person.text} \n \n  ${person.author.name},`;
    })
  })
}

const newlikeColor = (element) => {
  if (element) {
    return 'like-button -active-like';
  } else {
    return 'like-button';
  }
  // return element ? 'like-button -active-like' : 'like-button'; 
}




const renderCommentators = () => {
  const commentatorsHtml = commentators.map((commentator, index) => {
    return `<li data-index="${index}" class="comment">
        <div class="comment-header">
          <div>${commentator.author.name}</div>
          <div>${dateInAPI(new Date(commentator.date))}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${commentator.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${commentator.likes}</span>
            <button data-index="${index}" class="${newlikeColor(commentator.isLiked)}"></button>
          </div>
        </div>`
  }).join('');
  commentBlockElement.innerHTML = commentatorsHtml;
  likeMaker();
  replyТoСomment();
}

renderCommentators()

function clickEventButton() {
  const formButtonElement = document.getElementById("form-button");
  const nameInputElement = document.getElementById("name-input");
  const textInputElement = document.getElementById("text-input");
  // 
  formButtonElement.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    if (nameInputElement.value === "") {
      nameInputElement.classList.add("error");
      return;
    }
    textInputElement.classList.remove("error");
    if (textInputElement.value === "") {
      textInputElement.classList.add("error");
      return;
    }
    postFunction()
  });
}


