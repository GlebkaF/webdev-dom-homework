export function getRegistr({login, name, password}){
    return fetch("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  }).then((response) => {
    console.log(response);
    if(response.status === 400){
      throw new Error("Такой пользователь уже есть")
    }
    if(response.status === 500){
      throw new Error("Сервер упал");
    }
    return response.json();
  })
  .then((response) =>{
    window.localStorage.setItem("user",  JSON.stringify(
        response.user))
  })
  .catch((error) =>{
    if(error.message === "Такой пользователь уже есть"){
      alert("Такой пользователь уже есть")
      return;
    }
    if(error.message === "Сервер упал"){
      alert("Что-то с сервером");
      return;
    }
      alert("Неполадки с соединенем");
  })
}

