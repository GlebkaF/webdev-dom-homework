
const baseUrl = "https://wedev-api.sky.pro/api/v2/pavel-fedotov/";
const userUrl = "https://wedev-api.sky.pro/api/user/login";
export let token;
export let userName;

export const setToken = (newToken) => {
    token = 'Bearer ' + newToken;
}

export const setUserName = (newName) => {
    userName = newName;
}

export function getComments() {
    return fetch(`${baseUrl}comments`, {
        method: "GET",
        headers: {
            Authorization: token,
        },
        })
        .then((result) => {
          if (result.status === 500) {
            throw new Error("Cервер не отвечает");
          } else {
            return result.json();
          }
        })
}

export function postComment( {text, date, likes, isLiked, forceError} ) {
    
    return fetch(`${baseUrl}comments`, {
        method: "POST",
        body: JSON.stringify({
          text: text,
          date: date,
          likes: likes,
          isLiked: isLiked,
          forceError: forceError
        }),
        headers: {
            Authorization: token,
        },
      })
      .then((resultComments) => {
        if (resultComments.status == 201) {
          return resultComments.json();
        } else if (resultComments.status === 400) {
          throw new Error("Имя или комментраий короткие");
        } else if (resultComments.status === 500) {
          throw new Error("Сервер не отвечает");
        }
      })
}

export function loginUser( {login, password} ) {
    
    return fetch(`${userUrl}`, {
        method: "POST",
        body: JSON.stringify({
          login,
          password,
        }),
      })
      .then((resultUser) => {
        if (resultUser.status == 201) {
          return resultUser.json();
        } else if (resultUser.status === 400) {
          throw new Error("Неправильный логин или пароль");
        } else if (resultUser.status === 500) {
          throw new Error("Сервер не отвечает");
        }
      })
}