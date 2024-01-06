import { comments, setComments } from "./main.js";
import { formatDate } from "./formatDate.js";
import { renderComments } from "./renderComments.js";

export let token;
export const setToken = (newToken) => {
    token = 'Bearer ' + newToken;
};

export function getComments() {
    
    return fetch("https://wedev-api.sky.pro/api/v2/:anastasiya-grebneva/comments", {
        method: "GET",
    })
  .then((response) => {
    
   return response.json()
  })
  .then((responseData) => {
    console.log(responseData);
	  const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        timestamp: formatDate(new Date(comment.date)),
        text: comment.text,
        likesCounter: comment.likes,
        isLiked: comment.isLiked
      }
    });
    setComments(appComments);
    renderComments({comments});
  })
  .catch((error) => {
    if (error.status === 500) {
      getComments();
      return;
    } else {
      alert("Похоже, пропал интернет. Попробуй позже");
    }
    console.log(error);
    })
};

export function postCommentAPI({text}) {
    return fetch("https://wedev-api.sky.pro/api/v2/:anastasiya-grebneva/comments", {
        method: "POST",
        body: JSON.stringify({
            text: text
        }),
        headers: {
        Authorization: token,
        },
    })
};
export function login(login, password) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password
        }),
    }).then((response) => {
        
        if(response.status === 400) {
            alert("Неверный логин или пароль. Попробуйте еще раз.");
            throw new Error("Нет авторизации");
        }
        return response.json();
    })
};