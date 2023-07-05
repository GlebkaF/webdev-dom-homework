
import { getCurrentDate } from "./date.js";
let host = "https://wedev-api.sky.pro/api/v2/:Ilmira-Sh/comments";
export function getApp () {
 return fetch (host, {
    method: "GET",
    })
    .then ((response)=> {
      if (response.status ===401) {
        throw new Error('Нет авторизации');
      } else  if (response.status === 500) {
        throw new Error("Сервер сломался");
      } else {
        return response.json();
      }
      });
    }


    export function getPost ({token,inputTextElement,inputNameElement}) {
      return fetch ( host, {
      method: "POST",
      body: JSON.stringify({ 
        name: inputNameElement.value,
        date: getCurrentDate(new Date()),
        text: inputTextElement.value,
        forceError: true,
      colorLikes: 'like-button  no-active-like',
      }),
     
      headers: {
        Authorization: token,
      },
      })
      .then((response)=>{
        console.log (response);
        if(response.status === 500){
          throw new Error("Сервер упал");
        } else if (response.status ===400){
          throw new Error("Плохой сервер");
        } else {
          return response.json();
        }
     console.log (name, text);
      })
     
      }
     

      export function loginUser ({
        login, 
        password}) {
          return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({ 
       login,
       password,
          forceError: true,
        }),
        })
        .then((response)=>{
          if(response.status === 500){
            throw new Error("Сервер упал");
        
          } else if (response.status ===400){
            throw new Error("Неверный логин или пароль");
          } else {
            return response.json();
          }
         
        })
        }
        
        export function registerUser ({
          login, password, name}) {
          return fetch ( "https://wedev-api.sky.pro/api/user",{
          method: "POST",
          body: JSON.stringify({ 
         login,
         password,
         name,
            forceError: true,
          }),
          })
          .then((response)=>{
            if(response.status === 500){
              throw new Error("Сервер упал");
          
            } else if (response.status ===400){
              throw new Error("Такой пользователь уже существует");
            } else {
              return response.json();
            }
           
          })
          }