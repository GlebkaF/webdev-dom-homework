const host = 'https://wedev-api.sky.pro/api/v2/anast-tr/comments';

export function getComments({token}) {
    return  fetch( host,{
        method:'GET',
        headers: {
        Authorization: token ,
        },
       })
       .then((response) => {
       if (response.status === 401) {
         throw new Error("Нет авторизации");
       } 
      return response.json();
    });
}
export async function fetchPost ({ text, token }) { 
    fetch(host,{
    method: 'POST',
    body: JSON.stringify({
        text,
    }),
    headers: {
    Authorization:  token ,
    },   
    })
    .then((response) => {
    if (response.status === 400) {
        throw new Error("Комментарий не должен быть короче 3-х символов");
    }
    if (response.status === 500) {
        throw new Error("Сервер упал");
    }
    return response.json();
    })
};

export function userAuthorization({ login, password }) {
   return fetch("https://wedev-api.sky.pro/api/user/login", {
     method: "POST",
     body: JSON.stringify({
       login,
       password,
     }),
   }).then((response) => {
     if(response.status === 400){
         throw new Error('Неверный логин или пароль');
     }
     return response.json();
   });
 }

 export  function userRegistration({ login, password, name }) {
   return fetch("https://wedev-api.sky.pro/api/user", {
     method: "POST",
     body: JSON.stringify({
       login,
       password,
       name,
     }),
   }).then((response) => {
     if(response.status === 400){
         throw new Error('Такой пользователь уже существует');
     }
     return response.json();
   });
} 