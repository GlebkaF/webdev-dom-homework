import { setToken } from "./api.js";

export function getAuthorization({login, password}) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    console.log(response);
    if(response.status === 400){
      throw new Error("Такой логин и пароль  не существует")
    }
    if(response.status === 500){
      throw new Error("Сервер упал");
    }
    return response.json();
  })
  .then((response) => {
    window.localStorage.setItem("user",  JSON.stringify(
      response.user))
      setToken(response.user.token);
  })
  .catch((error) =>{
    if(error.message === "Такой логин и пароль  не существует"){
      alert("Такого пользователя нет")
      return;
    }
    if(error.message === "Сервер упал"){
      alert("Что-то с сервером");
      return;
    }
      alert("Неполадки с соединенем");
  })
}


