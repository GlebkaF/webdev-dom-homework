import { formatDate } from "./utils.js";
export const fetchComments = () => {
   return fetch("https://webdev-hw-api.vercel.app/api/v1/olya-myalo/comments", {
      method: "GET"
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
  return  fetch("https://webdev-hw-api.vercel.app/api/v1/olya-myalo/comments", {
        method: "POST",
        body: JSON.stringify({
          name: name,  
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