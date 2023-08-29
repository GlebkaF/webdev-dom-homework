// api.js

const host = "https://wedev-api.sky.pro/api/v2/kristina-sapega/comments";

let token = "bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

token = null;

export const getComments = () => {
  return fetch(host, {
    method: 'GET',
    headers: {
      Authorization: token,
    }
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error('Ошибка при авторизвции');
      }
      if (response.status === 500) {
        throw new Error("Произошла ошибка сервера");
      }
      return response.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          id: comment.id,
          name: comment.author.name,
          date: new Date(comment.date), // Преобразование строки даты в объект Date
          text: comment.text,
          likes: comment.likes,
          liked: false,
        };
      });
      return appComments;
    });
};

export const addCommentRequest = ({text}) => {
  //console.log(newComment);
  return fetch(host, {
    method: 'POST',
    body: JSON.stringify({
      text,
    }),
    headers:
    {Authorization : `Bearer ${token}`},
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Неверный запрос');
    } else if (response.status === 500) {
      throw new Error('Ошибка сервера');
    }
    return response.json();
  });
};

export function loginUser ({login, password}) {
  return fetch(" https://wedev-api.sky.pro/api/user/login", {
    method:"POST",
    body: JSON.stringify({
      login,
      password
    }),
  }).then((response) => {
    if (response.status === 400){
      throw new Error ('Введен неправильно логин или пароль') ;
    } else {
      return response.json();
    }
  });
};

export function registerUser ({login, password, name}) {
  return fetch("https://wedev-api.sky.pro/api/user", {
    method:'post',
    body: JSON.stringify({
      login,
      password,
      name,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Пользователь с таким логином уже сущетсвуе");
    } else {
      return response.json();
    }
  });
};