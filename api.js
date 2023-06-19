import { now } from "./utils.js";
 
const host = "https://wedev-api.sky.pro/api/v2/olya-myalo/comments";
export const fetchComments = () => {
  const token = localStorage.getItem('token');
   return fetch(host, {
      method: "GET",
      headers: {
        Authorization: token,
      }
    })
    .then((response) => (response.json()))
    .then((responseData) => { 
    const appComments = responseData.comments.map((comment) => { 
      return { 
        id: comment.id,
        name: comment.author.name,  
        date: now(new Date(comment.date)),  
        text: comment.text, 
        active: false,
        like: comment.likes, 
    }; 
    }); 
    return appComments;
    });
}

export const createComment = (text) => {
  const token = localStorage.getItem('token');
  return  fetch(host, {
        method: "POST",
        body: JSON.stringify({
          text: text,
          forceError: false,
        }),
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер упал");
        }
        if (response.status === 400) {
          throw new Error("Неверный запрос");
        }
        else {
          return response.json();
        }
      })
}

export const userAuthorization = ({login, password}) => {
  return fetch ("https://wedev-api.sky.pro/api/user/login", {
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
})
.then((user) => {
  localStorage.setItem('token', `Bearer ${user.user.token}`);
  localStorage.setItem('user', user.user.name);
});
}

export const userRegistration = ({name, login, password}) => {
  return fetch ("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({
    name,
    login,
    password,
  }),
  })
  .then((response) => {
    if (response.status === 400) {
      throw new Error('Такой пользователь уже существует');
    }
    return response.json();
  })
  .then((user) => {
    localStorage.setItem('token', `Bearer ${user.user.token}`);
    localStorage.setItem('user', user.user.name);
  });
  }

  export const apiLike = (id) => {
    const token = localStorage.getItem('token');
    return fetch (`https://wedev-api.sky.pro/api/v2/olya-myalo/comments/${id}/toggle-like`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    })
    .then((response) => (response.json()))
    }

    export const apiDeleteComment = (id) => {
      const token = localStorage.getItem('token');
      return fetch (`https://wedev-api.sky.pro/api/v2/olya-myalo/comments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      })
      .then((response) => (response.json()))
      }

  export const isUserAuthorization = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } 
    return false;
  }