const hostApi = 'https://wedev-api.sky.pro/api/v2/:Evgeny-Onotskiy/comments';
const loginApi = 'https://wedev-api.sky.pro/api/user/login';

export let token;
export let nameSession;

export const setName = (nameAuthor) => {
  nameSession = nameAuthor;
};

export const setToken = (newToken) => {
  token = newToken;
};




// console.log(response.status);
export function commentsGet () {
    return fetch(hostApi, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        if (response.status === 401) {
          throw new Error("нет авторизации");
        }
        
         return response.json()
      })
      // .then((response) => {
      //   console.log(response.comments[1].author.name);
      //   return response;
      // })

}

export function commentPost ({text, name}) {
   return fetch(hostApi, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.value,
          text: text.value,
          forceError: true,
        })
        })
        .then((response) =>{
            if (response.status === 400){
              throw new Error('некорректный запрос');
            }
            if (response.status === 500 ) {
              throw new Error('ошибка сервера');
            }
            if (response.status === 201) {
              return response.json();
            } 
          })
}


export function login({ login, password }) {
  return fetch(loginApi, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
  .then((response) => {
    if (response.status === 400) {
      alert('Нет такой пары логина и пароля.')
      throw new Error('Проблемы с паролем');
    }
    return response;
  })
  .then((response) => {
    return response.json();
  })
  .catch(() => {
    console.warn('Пароль неверный.');
  })
}