import { comments } from '../main.js'
import { convertServer } from './appComment.js'
import { sendComment } from './optionComment.js' 
import { token } from './loginCompontnt.js'


// запрос на сервер 
const fetchAndRenderComments = () => {
    return fetch(
      'https://wedev-api.sky.pro/api/v2/Mikhail-Kovalenko/comments',
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        convertServer(response, comments)
        
      })    
      }
 

  
const postCommit = () => {

  const protectionHtml = (string) => {
    return string
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
  };

    const elementName = document.getElementById('nameInput');
    const elementComment = document.getElementById('commentInput');
    const loadingListElement = document.querySelector('.loading-text');
    const addFormElement = document.querySelector('.add-form');

  return fetch(
    'https://wedev-api.sky.pro/api/v2/Mikhail-Kovalenko/comments',
    {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(
        {
          text: protectionHtml(elementComment.value),
          name: protectionHtml(elementName.value),
          forceError: true,
        })
    })
    .then((response) => {
      // код который обрабатывакт ошибки
      if (response.status === 201) {
        elementName.classList.remove('error');
        elementComment.classList.remove('error');
        return response.json()
      } else if (response.status === 400) {
        throw new Error('Плохой запрос')
      } else {
        throw new Error('Сервер упал')
      }

    })

    .then(() => {
      addFormElement.classList.add('disnone');           
      loadingListElement.classList.remove('disnone');
      elementName.value = '';
      elementComment.value = '';
      fetchAndRenderComments()
    })
    .catch((error) => {
      addFormElement.classList.add('disnone');           
      loadingListElement.classList.remove('disnone');
      if (error.message === 'Плохой запрос') {
        alert('Вы ввел слишком короткое имя или текст комментария')
        return
      }
      if (error.message === 'Сервер упал') { 
        sendComment();
        
      }    
    })
   
  }  
  
  export function loginUser(login, password) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Неверный логин или пароль');
            }
            return response.json();
        });
}

export function regUser(login, password, name) {
    return fetch('https://wedev-api.sky.pro/api/user', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Такой пользователь уже существует');
            }
            return response.json();
        });
}


  export {postCommit, fetchAndRenderComments}