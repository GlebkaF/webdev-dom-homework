
import { renderApp } from './render.js';
import { fetchAndRenderComments, postCommit, loginUser, regUser } from './api.js';
import { letClearForm } from './elementChange.js';

//обрабочик лайков

const like = (commentArr) => {
    const likeButtons = document.querySelectorAll('.like-button');
    for (const likeButton of likeButtons) {
      likeButton.addEventListener('click', (e) => {
        e.stopPropagation()
        const index = likeButton.dataset.index;
        if (commentArr[index].isActiveLike) {
            commentArr[index].likes--;
  
        } else {
            commentArr[index].likes++;
        }
        commentArr[index].isActiveLike = !commentArr[index].isActiveLike;
        renderApp(commentArr);
      })
    }
  };
  
  // Добавляю обработчик клика 
  
  const initAnswer = () => {
    const elementComment = document.getElementById('commentInput');
    const commentsElements = document.querySelectorAll(".comment");
    for (const commentElement of commentsElements) {
      commentElement.addEventListener('click', () => {
        elementComment.value = `> ${commentElement.querySelector('.comment-text').innerHTML
          .replaceAll("&amp", "&;")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&quot;", '"')}`
          + `\n\n${commentElement.querySelector('.comment-header').children[0].innerHTML
            .replaceAll("&amp", "&;")
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">")
            .replaceAll("&quot;", '"')}`
      })
    }
  }

//защищаем код 



 export const sendComment = () => {

  const elementName = document.getElementById('nameInput');
  const elementComment = document.getElementById('commentInput');
  const loadingListElement = document.querySelector('.loading-text');
  const addFormElement = document.querySelector('.add-form');

    letClearForm(elementName);
    letClearForm(elementComment);

    if (elementName.value === "") {
      elementName.classList.add("error");
      if (elementComment.value.replaceAll("\n", '') === '') {
          elementComment.classList.add("error");
      };
        return;
      }
    if (elementComment.value.replaceAll("\n", '') === '') {
        elementComment.classList.add("error");
        return;
    };

    addFormElement.classList.add('disnone');           
    loadingListElement.classList.remove('disnone');

    postCommit();

  }


  export const authorizationUser = (setToken, setUser) => {
    const login = document.getElementById('inputForRegLogin').value;
    const password = document.getElementById('inputForRegPassword').value;
    if (!login) {
        alert('Введите логин');
        return;
    }
    if (!password) {
        alert('Введите пароль');
        return;
    }
    loginUser(login, password)      
        .then((user) => {
            setToken(`Bearer ${user.user.token}`); 
            setUser(user.user.name);
            fetchAndRenderComments(); 
        })
        .catch((error) => {
            alert(error.message);
        })
}

//---функция регистрации:
export const registrationUser = (setToken, setUser) => {
    const login = document.getElementById('inputForRegLogin').value;
    const name = document.getElementById('inputForRegName').value;
    const password = document.getElementById('inputForRegPassword').value;
    if (!name) {
        alert('Введите имя');
        return;
    }
    if (!login) {
        alert('Введите логин');
        return;
    }
    if (!password) {
        alert('Введите пароль');
        return;
    }
    regUser(login, password, name)
        .then((user) => {
            setToken(`Bearer ${user.user.token}`); 
            setUser(user.user.name);
            fetchAndRenderComments(); 
        })
        .catch((error) => {
            alert(error.message);
        })
}

  export {like, initAnswer}