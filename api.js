import { inputTextElement, inputNameElement } from "./main.js";
export function getApp () {
 return fetch (
    "https://wedev-api.sky.pro/api/v1/:Ilmira-Sh/comments",
    {
    method: "GET",
    })
    .then ((response)=>{
      if(response.status === 500){
        throw new Error("Сервер упал");
        // второй способ
        // return Promise.reject ("Сервер упал");

      } else if (response.status ===400){
        throw new Error("Плохой сервер");
      } else {
        return response.json();
      }
    })
}
export function getPost () {
return fetch ( "https://wedev-api.sky.pro/api/v1/:Ilmira-Sh/comments",
{
method: "POST",
body: JSON.stringify({ 
  name:inputNameElement.value,
  text:inputTextElement.value,
  forceError: true,
}),
})
.then((response)=>{
  console.log (response);
  if(response.status === 500){
    throw new Error("Сервер упал");
    // второй способ
    // return Promise.reject ("Сервер упал");

  } else if (response.status ===400){
    throw new Error("Плохой сервер");
  } else {
    return response.json();
  }
 
})
}