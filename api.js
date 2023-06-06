import { formatDate } from "./utils.js";
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
// token = null;
const host = "https://wedev-api.sky.pro/api/v2/olya-myalo/comments";
export const fetchComments = (token) => {
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
        name: comment.author.name,  
        date: formatDate(new Date(comment.date)),  
        text: comment.text, 
        active: false,
        like: comment.likes, 
    }; 
    }); 
    return appComments;
    });
}

export const createComment = (token, text) => {
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
  });
  }