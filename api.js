import { renderComments, addComment } from './actionAndRenderFuncs.js';
import { getCommentsList } from './commentsList.js';
import { nameInputElement, textInputElement, addForm, commentLoading, commentsListElements, listElement } from './handlers.js';


export const fetchGetRender = () => {
    return fetch(
      'https://webdev-hw-api.vercel.app/api/v1/dennis-sharin/comments',
      {
        method: 'GET',
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const comments = responseData['comments'];
        renderComments(listElement, getCommentsList, comments);
      })
      .then(() => {
        commentsListElements.classList.add('hidden');
      });
  };


export const fetchPostRender = () => {

    let inputUserText = textInputElement.value;
    let inputUserName = nameInputElement.value;

    fetch('https://webdev-hw-api.vercel.app/api/v1/dennis-sharin/comments', {
        method: 'POST',
        body: JSON.stringify({
          name: replaceValue(nameInputElement.value),
          text: replaceValue(textInputElement.value)
            .replaceAll('QUOTE_BEGIN', '<div class="quote">')
            .replaceAll('QUOTE_END', '</div>'),
          forceError: true,
        }),
      })
        .then((response) => {
          if (response.status === 500) {
            console.log('Ошибка 500');
            throw new Error('error500');
          }
          if (response.status === 400) {
            console.log('Ошибка 400');
            throw new Error('error400');
          }
          console.log('test ok');
          response.json();
        })
        .then(() => {
          return fetchGetRender();
        })
        .then(() => {
          addForm.classList.remove('hidden');
          commentLoading.classList.add('hidden');
        })
        .catch((error) => {
          console.log('catch is working here');
          switch (error.message) {
            case 'error500':
              textInputElement.value = inputUserText;
              nameInputElement.value = inputUserName;
              return addComment();
            case 'error400':
              alert(
                'Минимальное количество введённых символов не должно быть меньше 3'
              );
              textInputElement.value = inputUserName;
              nameInputElement.value = inputUserText;
              addForm.classList.remove('hidden');
              commentLoading.classList.add('hidden');
              break;
            default:
              console.log('Кажется сломался интернет');
              textInputElement.value = inputUserName;
              nameInputElement.value = inputUserText;
              addForm.classList.remove('hidden');
              commentLoading.classList.add('hidden');
              break;
          }
          addForm.classList.remove('hidden');
          commentLoading.classList.add('hidden');
          textInputElement.value = inputUserText;
          nameInputElement.value = inputUserName;
  
          return error;
  
        });
  };


  const replaceValue = (value) => {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  };