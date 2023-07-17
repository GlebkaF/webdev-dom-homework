import { getComments, postComment } from "./api.js";
import { renderComments } from "./renderComments.js";
import { sanitizeHtml } from "./sanitizeHtml.js";

const buttonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');

// Получение списка комментариев из API завернутый в функцию GET запрос 
function getCommentList(showLoading) {
  if (showLoading == true) {
    document.getElementById('comment-loading').style.display = 'flex'; 
  } else {
    document.getElementById('comment-loading').style.display = 'none';
  };

  getComments().then((responseData) => {
    console.log(responseData);
    const appComments = responseData.comments.map((comment) => {
        return {
            date: `${(new Date(comment.date).getDate().toString().padStart(2, "0")) + "." + (new Date(comment.date).getMonth() + 1).toString().padStart(2, "0") + "." + (new Date(comment.date).getFullYear() - 2000) + " " + (new Date(comment.date).getHours().toString().padStart(2, "0")) + ":" + (new Date(comment.date).getMinutes().toString().padStart(2, "0"))}`,
            likes: comment.likes,
            isLiked: false,
            text: comment.text,
            name: comment.author.name,
            isEdit: false,
        };
    })
    document.getElementById('comment-loading').style.display = 'none'; 
    comments = appComments;
    renderComments({ comments, checkInput, initEventListeners, initCommentingListeners, editCommentListeners });
    })
    .catch((error) => {
        alert("Кажется что-то пошло не так, попробуйте позже");
        console.warn(error);
    })
} 
getCommentList(true); 

let comments = [];

// Проверка заполненности полей и отключение кнопки 
const checkInput = () => {
  disableBtn();
  nameInputElement.addEventListener('input', () => {
    disableBtn()
    nameInputElement.classList.remove('add-form-name_error')
    // console.log("Поле ввода заполнено текстом")
  })

  nameInputElement.addEventListener('blur', () => {
    if (nameInputElement.value == '') {
      nameInputElement.classList.add('add-form-name_error')
      // console.log("Поле ввода пустое")
    } else {
      nameInputElement.classList.remove('add-form-name_error')
      // console.log("Поле ввода заполнено текстом")
    }
  })

  // Перекрашиваем поле и включаем/отлючаем кнопку в инпуте комментариев
  commentInputElement.addEventListener('input', () => {
    disableBtn()
    commentInputElement.classList.remove('add-form-comment_error')
  })

  commentInputElement.addEventListener('blur', () => {
    if (commentInputElement.value == '') {
      commentInputElement.classList.add('add-form-comment_error')
    } else {
      commentInputElement.classList.remove('add-form-comment_error')
    }
  })

  function disableBtn() {
    if (!nameInputElement.value == '' && !commentInputElement.value == '') {
      buttonElement.classList.remove('add-form-button_disable')
    } else {
      buttonElement.classList.add('add-form-button_disable')
    }
  }
}
checkInput();

// Счётчик лайков и отображение лайков на комментарии
const initEventListeners = () => {
  const likeElements = document.querySelectorAll(".like-button");
  likeElements.forEach((element, index) => {
    element.addEventListener('click', (event) => {
      event.stopPropagation();
      if (comments[index].isLiked) {
        comments[index].isLiked = false;
        comments[index].likes -= 1;
      } else {
        comments[index].isLiked = true;
        comments[index].likes += 1;
      }
      renderComments({ comments, checkInput, initEventListeners, initCommentingListeners, editCommentListeners });
    })
  })
}

// Ответ на комментарий 
const initCommentingListeners = () => {
  const commentingElements = document.querySelectorAll(".comment");
  commentingElements.forEach((element, index) => {
    element.addEventListener('click', () => {
      commentInputElement.value = "> " + comments[index].text + " " + comments[index].name + ", ";
    })
  })
}

// Редактирование нового комментария 
const editCommentListeners = () => {
  const editButtonElements = document.querySelectorAll('.edit-form-button');
  for (const editButtonElement of editButtonElements) {
    
    editButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = editButtonElement.dataset.index;
      if (comments[index].isEdit) {
        comments[index].isEdit = false;
        // не работает.. 
        getCommentList(false);
      } else {
        comments[index].isEdit = true;
      } 
      renderComments({ comments, checkInput, initEventListeners, initCommentingListeners, editCommentListeners });
    })
  }
}

// Отправка комментария с клавиши Enter на клавиатуре 
document.addEventListener('keyup', (e) => {
  e.preventDefault(); // снимает дефолтные браузерные функции с ивента
  if (e.code == 'Enter' || e.code == 'NumpadEnter') {
    // console.log("Нажал клавишу Enter");
    if (!nameInputElement.value == '' && !commentInputElement.value == '') {
      sendingComment();
      renderComments({ comments, checkInput, initEventListeners, initCommentingListeners, editCommentListeners });
      buttonElement.classList.add('add-form-button_disable')
    }
  };
});

// Отправка комментария через кнопку
buttonElement.addEventListener('click', () => {
  checkInput();
  sendingComment();
  buttonElement.classList.add('add-form-button_disable')
  buttonElement.blur();
})

document.getElementById('comment-render').style.display = 'none'; 

const sendingComment = () => {
  function addComment() { 
    document.getElementById('comment-render').style.display = 'flex';
    document.getElementById('add-form-disable').style.display = 'none';

    postComment({
        date: new Date(),
        likes: 0,
        isLiked: false,
        text: sanitizeHtml(commentInputElement.value),
        name: sanitizeHtml(nameInputElement.value),
        isEdit: false,
        forceError: false,
    }).then((response) => {
        if (response.status === 400) {
          throw new Error('Имя и комментарий должен быть не короче 3х символов');
        } else if (response.status === 500) {
          throw new Error('Сервер сломался, попробуйте позже');
        } else {
          return response.json(); 
        }    
      })
      .then(() => {
        return getCommentList(false);
      })
      .then(() => {
        document.getElementById('add-form-disable').style.display = 'flex';
        document.getElementById('comment-render').style.display = 'none';
        nameInputElement.value = "";
        commentInputElement.value = "";
      })
      .catch((error) => {
        document.getElementById('add-form-disable').style.display = 'flex'; // Скрыть поле ввода
        document.getElementById('comment-render').style.display = 'none'; // Комментарий добавляется..
        console.warn(error);
        console.log(error.message);
        if (error.message === "Имя и комментарий должен быть не короче 3х символов") {
          alert('Имя и комментарий должен быть не короче 3х символов'); 
        } else if (error.message === 'Сервер сломался, попробуйте позже') {
          alert('Сервер сломался, попробуйте позже'); 
        } else if (error.message === "Cannot read properties of undefined (reading 'json')") {
          sendingComment();
        } else {
          alert("Кажется что-то пошло не так, попробуйте позже");
        }         
      });
    renderComments({ comments, checkInput, initEventListeners, initCommentingListeners, editCommentListeners });
  }
  addComment();
} 
console.log("It works!");