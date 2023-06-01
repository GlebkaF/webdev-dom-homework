'use strict';

// -------------- Получаем список имеющихся комментариев -----------

export async function getComments({token}) {
    return fetch("https://wedev-api.sky.pro/api/v2/alexei-rybak/comments", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
        if (response.status === 401) {
        throw new Error('Нет авторизации');
        }
        return response.json()
      })
  };

  // ----------------- Отправляем POST-запрос на сервер, чтобы добавить комментарий ------------
    
  export async function addComments({token, text, name, date}) {
    return fetch("https://wedev-api.sky.pro/api/v2/alexei-rybak/comments", {
          method: "POST",
          body: JSON.stringify({
            name,
            text,
            date,
            likes: 0,
            isLiked: false,
          }),
          headers: {
            Authorization: token,
          },
        }).then((response) => {
          return response.json();
        })
      };
  
// ----------------- Отправляем POST-запрос на сервер, чтобы авторизовать пользователя --

  export async function loginUser({login, password}) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "POST",
      body: JSON.stringify({
      login,
      password
      }),
    }).then((response) => {
      if(response.status === 400) {
        throw new Error ('Неверный логин или пароль')
      }
      return response.json();
    })
  };

  // ------------- Отправляем POST-запрос на сервер, чтобы зарегистрировать нового пользователя ---
  
  export async function regUser({login, password, name}) {
    return fetch("https://wedev-api.sky.pro/api/user", {
      method: "POST",
      body: JSON.stringify({
      login,
      password,
      name,
      }),
    }).then((response) => {
      if(response.status === 400) {
        throw new Error ('Такой пользователь уже существует')
      }
      return response.json();
    })
  };