const api = "https://wedev-api.sky.pro/api/v2/nkveresh/comments";
const userURL = 'https://wedev-api.sky.pro/api/user/login';

let token;

const setToken = (newToken) => {
  token = newToken;
}

let userName;

const setUserName = (newName) => {
  userName = newName;
}

function getFetch() {
    return fetch(api, {
        method: "GET",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 400) {
          throw new Error('Имя и комментарий должны быть не короче 3 символов')
        }
        if (response.status === 401) {
          throw new Error('Имя и комментарий должны быть не короче 3 символов')
        }
        if (response.status === 500) {
          throw new Error('Сервер сломался, попробуй позже')
        }
        else {
          throw new Error('Не работает интернет')
        }
      })
}

function postFetch() {
  const nameUser = document.querySelector(".add-form-name");
  const commentUser = document.querySelector(".add-form-text");
  return fetch(api, {
    method: "POST",
    body: JSON.stringify({
      text: commentUser.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
      name: nameUser.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
    }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
  })
    .then((response) => {
      if (response.status === 201) {
        nameUser.value = "";
        commentUser.value = "";
        return response.json();
      }
      if (response.status === 400) {
        throw new Error('Имя и комментарий должны быть не короче 3 символов')
      }
      if (response.status === 500) {
        throw new Error("Сервер сломался, попробуй позже");
      }
      if (nameUser.value.length < 3 ||  commentUser.value.length < 3) {
        throw new Error("Имя и комментарий должны быть не короче 3 символов");
      }
    })
}

function postLogin({login, password}) {
  const nameUser = document.querySelector(".add-form-name");
  const commentUser = document.querySelector(".add-form-text");
  return fetch(userURL, {
  method: "POST",
    body: JSON.stringify({
      login,
      password,
    }), 
  })
  .then((response) => {
    if (response.status === 201) {
      return response.json();
    }
    if (response.status === 400) {
      throw new Error("Неверно введено имя или пароль");
    }
  })
  .catch((error) => {
    if (error.message === "Неверно введено имя или пароль") {
      console.warn('Неверно введено имя или пароль');
      alert("Неверно введено имя или пароль");
    }
  })
}

function catchFetch(error) {
  if (error.message === "Сервер сломался, попробуй позже") {
    console.error('Сервер сломался, попробуй позже');
      addComment();
  }
  if (error.message === "Имя и комментарий должны быть не короче 3 символов") {
    console.error('Имя и комментарий должны быть не короче 3 символов');
    alert("Имя и комментарий должны быть не короче 3 символов");
  }
  else {
    console.warn(error)
  }
}

export {token, userName, setToken, getFetch, postFetch, catchFetch, postLogin, setUserName}