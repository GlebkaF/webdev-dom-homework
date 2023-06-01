




// import {
//     commentList,
//     startingElement,
//     addFormElement,
//     waitingElement,
//     nameElement,
//     textElement,
//     addButton
// } from "./data.js";
// import renderComments from "./renderComments.js";
// import { replaceValue } from "./handleFunctions.js";

// const startFetch = (element) => {
//     fetch("https://webdev-hw-api.vercel.app/api/v1/dmitry-teleganov/comments", {
//         method: "GET"
//     })
//     .then(response => response.json())
//     .then(responseData => {
//         const comments = responseData.comments;
//         commentList.classList.remove('hidden');
//         startingElement.classList.add('hidden');
//         addButton.disabled = true;

//         renderComments(element, comments);
//     });
// }

// const handlePostClick = (element) => {
//     return fetch("https://webdev-hw-api.vercel.app/api/v1/dmitry-teleganov/comments", {
//         method: "POST",
//         body: JSON.stringify({
//         name: replaceValue(nameElement.value),
//         text: replaceValue(textElement.value)
//           .replaceAll('START_QUOTE', '<div class="comment-quote">')
//           .replaceAll('END_QUOTE', '</div>'),
//         forceError: true
//         })
//     })
//     .then(response => {
//         if (response.status === 400) throw new Error('Ошибка 400');
//         if (response.status === 500) throw new Error('Ошибка 500');
  
//         return response.json();
//     })
//     .then(() => {
//         nameElement.value = '';
//         textElement.value = '';
//         addFormElement.classList.remove('hidden');
//         waitingElement.classList.add('hidden');
  
//         return startFetch(element);
//     })
//     .catch(error => {
//         if (error.message === 'Ошибка 400') {
//             alert('Имя и комментарий должны быть не короче 3 символов');
//             addFormElement.classList.remove('hidden');
//             waitingElement.classList.add('hidden');
//         } else if (error.message === 'Ошибка 500') {
//             alert('Сервер сломался, попробуй позже');
  
//             handlePostClick(element);
//         } else {
//             alert('Кажется, у вас сломался интернет, попробуйте позже');
//             addFormElement.classList.remove('hidden');
//             waitingElement.classList.add('hidden');
//         }
//     });
// }

// export { startFetch, handlePostClick };