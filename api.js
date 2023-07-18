export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/Volkov_Pavel/comments", {
    method: "GET"
    })
    .then((response) => {
      if (response.status === 500) {          
          throw new Error("Сервер сломался, попробуй позже");
        }
        else {
          return response.json();
        }      
    })
}