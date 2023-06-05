import { comments, elementName, elementComment,  buttonElement, loadingCommentElement,addFormElement } from './element.js'
import { convertServer } from './appComment.js'
import { protectionHtml } from './optionComment.js' 


const fetchAndRenderComments = () => {
    return fetch(
      'https://wedev-api.sky.pro/api/v1/Mikhail-Kovalenko/comments',
      {
        method: 'GET'
      })
      .then((response) => {
        convertServer(response, comments)
        
      })    
      }
 

  
const postCommit = () => {
  return fetch(
    'https://wedev-api.sky.pro/api/v1/Mikhail-Kovalenko/comments',
    {
      method: 'POST',
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
      elementName.value = '';
      elementComment.value = '';
      buttonElement.disabled = true;
      fetchAndRenderComments()
    })
    .catch((error) => {
      loadingCommentElement.style.display = 'none';
      addFormElement.style.display = 'flex';
      if (error.message === 'Плохой запрос') {
        elementName.classList.add('error');
        elementComment.classList.add('error');
        alert('Вы ввел слишком короткое имя или текст комментария')
        return
      }
      if (error.message === 'Сервер упал') { 
        postCommit();
        fetchAndRenderComments()
        buttonElement.disabled = true;
      }    
    })
   
  }  
  
  


  export {postCommit, fetchAndRenderComments}