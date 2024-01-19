import { stringHTML } from "./stringHTML.js";
const baseURL = "https://wedev-api.sky.pro/api/v1/vlad-tishkin/comments";

export function getTodos() {
    return fetch(baseURL, {
          method: "GET",
        }).then((response) => {
          return response.json();
        });
    };


export function postTodo({ name, text }) {
    return fetch(baseURL, {
        method: "POST",
        body: JSON.stringify({
            name: stringHTML(name),  
            text: stringHTML(text),
            // forceError: false,
        }),
      }).then((response) => {
        if(response.status === 400) {
          alert('Имя и комментарий не менее 3-ех символов');
          throw new Error('Ошибка 400'); 
        }else if (response.status === 500) {
          alert('Сервер заболел:( Повторите попытку позднее');
          throw new Error('Ошибка 500');
        } else {
          return response.json()};
      });
};