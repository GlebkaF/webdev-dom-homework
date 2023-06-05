let token
const host = ' https://wedev-api.sky.pro/api/v2/ruslan-shevelev/comments'
function getAPI(token, callback) {
    return fetch(host, {
        method: "GET",
        headers: {
          Authorization: token,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
          // console.log(responseData);
            return responseData.comments.map((item) => callback(item))
        });

};

function postApi(body, callback, token) {
    fetch(host, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: token,
        },})
        .then((response) => {
          if (response.status === 500) {
            throw new Error("Сервер сломался");
          }
          if (response.status === 400) {
            throw new Error("Плохой запрос");
          }
          return response.json();
        })
        .then((responseData) => {
          callback(responseData);
        })
        .catch((error) => {
          // loadingElement.style.display = 'none';
          // addFormElement.style.display = "flex";
          if (error.message === "Сервер сломался") {
            alert("Сервер сломался, попробуйте позже");
            postApi(body, callback, token);
            return;
          }
          if (error.message === "Плохой запрос") {
            alert("Имя и комментарий должны быть не короче трех символов");
            // nameInputElement.classList.add("input-error");
            // commentInputElement.classList.add("input-error");
            return;
          }
          alert('Кажется что-то пошло не так, возможно отсутствует подключение к интернету');
          console.warn(error);
        });
};

export { getAPI, postApi };

export function registerUser({ login, password, name }) {
    return fetch("https://wedev-api.sky.pro/api/user", {
      method: "POST",
      body: JSON.stringify({
        login,
        name,
        password,
      }),
    }).then((response) => {
      if (response.status === 400) {
        throw new Error("Пользователь с таким логином уже сущетсвует");
      }
      return response.json();
    });
  };
  
  export function loginUser({ login, password }) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    }).then((response) => {
      if (response.status === 400) {
        throw new Error("Неверный логин или пароль");
      }
      // localStorage.userData = JSON.stringify(response);
      return response.json();
    });
  }
  export function deleteComment({ token, id }) {
    return fetch("https://wedev-api.sky.pro/api/v2/ruslan-shevelev/comments/" + id, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      return response.json();
    });
  }

  export function toggleLike({ token, id }) {
    return fetch(`https://wedev-api.sky.pro/api/v2/ruslan-shevelev/comments/${id}/toggle-like`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      return response.json();
    });
  }
  export function commentCorrection(body, token, id) {
    fetch("https://wedev-api.sky.pro/api/v2/ruslan-shevelev/comments/" + id, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: token,
        },})
        .then((response) => {
          if (response.status === 500) {
            throw new Error("Сервер сломался");
          }
          if (response.status === 400) {
            throw new Error("Плохой запрос");
          }
          return response.json();
        })
        .catch((error) => {
          if (error.message === "Сервер сломался") {
            alert("Сервер сломался, попробуйте позже");
            postApi(body, callback, token);
            return;
          }
          if (error.message === "Плохой запрос") {
            alert("Имя и комментарий должны быть не короче трех символов");
            return;
          }
          alert('Кажется что-то пошло не так, возможно отсутствует подключение к интернету');
          console.warn(error);
        });
};