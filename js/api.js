import { token } from "./login.js"; 

const host = "https://wedev-api.sky.pro/api/v2/vladimir-rychkov/comments";

export function getComments() {
    return fetch(host, {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then((response) => {
    if (response.status === 500) {
      alert ('Сервер сломался, попробуй позже');
      throw new Error("Ошибка на сервере")
    } else {
      return response.json();
    }
  })
};

export function postComments(text, name) {
  console.log(token);
    return fetch(host, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            text: text,
            name: name,
            // forceError: true,
        })
    })
}