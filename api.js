import { renderComments } from "./render.js";

export const nameInputElement = document.getElementById('name-input');
export const textInputElement = document.getElementById('text-input');
export const buttonElement = document.getElementById('button-add');

export let comments = [];

export const getComments = () => {
  document.getElementById('loader').style.display = 'block';

  return fetch('https://webdev-hw-api.vercel.app/api/v1/alexei-rybak/comments', {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });

      comments = appComments;
      renderComments();
      document.getElementById('loader').style.display = 'none';
    });
};

getComments();

export function postFetch() {
  fetch('https://webdev-hw-api.vercel.app/api/v1/alexei-rybak/comments', {
    method: 'POST',
    body: JSON.stringify({
      name: nameInputElement.value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;'),
      text: textInputElement.value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;'),
    }),
  })
    .then((response) => {
      buttonElement.textContent = 'Написать';
      buttonElement.disabled = false;
      if (response.status === 500) {
        return Promise.reject(500);
      }
      if (response.status === 400) {
        return Promise.reject(400);
      }
    })
    .then(() => {
      getComments();
    })
    .then(() => {
      nameInputElement.value = '';
      textInputElement.value = '';
      buttonElement.classList.add('empty');
    })
    .catch((error) => {
      if (error === 500) {
        alert('Сервер сломался, попробуйте позже');
        return;
      }
      if (error === 400) {
        buttonElement.classList.add('empty');
        alert('Имя и комментарий должны быть не короче 3 символов');
        return;
      }

      alert('Кажется, у вас сломался интернет');
    });

  renderComments();
};
