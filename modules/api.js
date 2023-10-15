import { renderComments } from "./comments.js";
import { getUser } from "./userStore.js";

const commentsUrl = 'https://wedev-api.sky.pro/api/v2/lyubov-khusnullina/comments';

export function getApiComments() {
  const token = getToken();
  return fetch(commentsUrl, {
    method: 'GET',
    headers: {
      Authorization: token,
    }
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Сервер упал');
      }
      if (response.status === 401) {
        throw new Error('auth');
      }
      const res = response.json();
      return res;
    });
}

export function postApiComment({ text, date, forceError }) {
  const token = getToken();
  console.log(token);
  return fetch(commentsUrl, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      text: text,
    })
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Сервер упал');
      }
      if (response.status === 400) {
        throw new Error('Bad Request');
      }
      if (response.status === 401) {
        throw new Error('auth');
      }
      return response.json();
    })
    .then(() => {
      renderComments();
    })
}

const getToken = () => {
  const user = getUser();
  const token = user ? `Bearer ${user.token}` : null;
  return token;
}



