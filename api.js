import { delay } from "./utils.js";

// Изменили апи на 2-ю версию
const host = "https://webdev-hw-api.vercel.app/api/v2/tanya-koryachkina";
const loginHost = "https://webdev-hw-api.vercel.app/api/user/login";

export function getFetchComments() {
  return fetch(host + "/comments")
    .then((res) => res.json())
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

      return appComments;
    });
}

export function loginUser(login, password) {
  return fetch(loginHost, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    // Нужно сделать обработку ошибок

    return response.json();
  });
}

export function addComment(text, token) {
  return fetch(host + "/comments", {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      // Не забудьте про Bearer!
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      }

      if (response.status === 400) {
        throw new Error("Неверный запрос");
      }
    })
    .then(() => () => delay())
    .then(() => {
      return getFetchComments();
    })
    .then((data) => delay(data));
};

export function registerUser({ login, password, name }) {
    return fetch('https://wedev-api.sky.pro/api/user', {
        method: "POST",
        body: JSON.stringify({
          login,
          password,
          name
          //forceError: true,
        }), 
        
    })
    .then((response) => {
        if(response.status === 500) {

            alert('Сервер сломался, попробуй позже');
              
            throw new Error("Сервер упал");

        } else if(response.status === 400) {

            //alert('Неверный логин или пароль');
              
            throw new Error("Такой пользователь уже существует");

        } else {
            return response.json();
        } 
    })
}

















/*const host = 'https://wedev-api.sky.pro/api/v2/tanya-koryachkina/comments';

export function getFetchComments({ token }) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        }
    })
    .then((response) => {
        if(response.status ===401) {

            alert("Не авторизованы");
            throw new Error ("Не авторизованы");
            
        }
        return response.json();
    })
};

export function addComment({ name, text, token }) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
          name,
          text,
          //forceError: true,
        }), 
        headers: {
            Authorization: token,
        }
    })
    .then((response) => {
        if(response.status === 500) {

            alert('Сервер сломался, попробуй позже');
              
            throw new Error("Сервер упал");

        } else if(response.status === 400) {

            alert('Имя и комментарий должны содержать хотя бы 3 символа');
              
            throw new Error("Неверный запрос");

        } else {
            return response.json();
        } 
    })
};

export function loginUser({ login, password }) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: "POST",
        body: JSON.stringify({
          login,
          password,
          //forceError: true,
        }), 
        
    })
    .then((response) => {
        if(response.status === 500) {

            alert('Сервер сломался, попробуй позже');
              
            throw new Error("Сервер упал");

        } else if(response.status === 400) {

            //alert('Неверный логин или пароль');
              
            throw new Error("Неверный логин или пароль");

        } else {
            return response.json();
        } 
    })
};

export function registerUser({ login, password, name }) {
    return fetch('https://wedev-api.sky.pro/api/user', {
        method: "POST",
        body: JSON.stringify({
          login,
          password,
          name
          //forceError: true,
        }), 
        
    })
    .then((response) => {
        if(response.status === 500) {

            alert('Сервер сломался, попробуй позже');
              
            throw new Error("Сервер упал");

        } else if(response.status === 400) {

            //alert('Неверный логин или пароль');
              
            throw new Error("Такой пользователь уже существует");

        } else {
            return response.json();
        } 
    })
}*/