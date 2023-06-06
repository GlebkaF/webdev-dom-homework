import { formatDate } from "./utils.js";
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;
const host = "https://wedev-api.sky.pro/api/v2/olya-myalo/comments";
export const fetchComments = () => {
   return fetch(host, {
      method: "GET",
      headers: {
        Authorization: token,
      }
    })
    .then((response) => (response.json()))
    .then((responseData) => { 
    const appComments = responseData.comments.map((comment) => { 
      return { 
        name: comment.author.name,  
        date: formatDate(new Date(comment.date)),  
        text: comment.text, 
        active: false,
        like: comment.likes, 
    }; 
    }); 
    return appComments;
    });
}

export const createComment = (name, text) => {
  return  fetch(host, {
        method: "POST",
        body: JSON.stringify({
          text: text,
          forceError: false,
        })
      })
      .then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер упал");
        }
        if (response.status === 400) {
          throw new Error("Неверный запрос");
        }
        else {
          return response.json();
        }
      })
}