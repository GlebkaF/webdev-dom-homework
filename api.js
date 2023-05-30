import { buttonElement, listElement, nameInputElement, commentInputElement, commentsLoad } from "./main.js";
import renderComments from "./render.js";
import { getComments } from "./comments.js";

export let commentaries = [];

export const fetchGet = () => {

    commentsLoad.style.display = "block";
    listElement.style.display = "none";
    fetch("https://webdev-hw-api.vercel.app/api/v1/tanya-koryachkina/comments", {
        method: "GET",
    })
    .then((response) => {
        return response.json();
    })
    .then((responseData) => {
        const appComments = responseData.comments
        .map((comment) => {
            return {
                name: comment.author.name,
                date: new Date(Date.parse(comment.date)).toLocaleDateString() + ' ' + new Date(Date.parse(comment.date)).getHours() + ':' + new Date(Date.parse(comment.date)).getMinutes(),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
                id: comment.id,
            };
        
        });
        return appComments;
    })
    .then((data) => {
        commentsLoad.style.display = "none";
        listElement.style.display = "flex";
        commentaries = data;
        renderComments(listElement, getComments);
    });
        

      
};

export const fetchPost = () => {
    fetch('https://webdev-hw-api.vercel.app/api/v1/tanya-koryachkina/comments', {
        method: "POST",
        body: JSON.stringify({
          name: nameInputElement.value,
          text: commentInputElement.value,
          //forceError: true,
        })
    })
    .then((response) => {
        if(response.status === 500) {

            alert('Сервер сломался, попробуй позже');
              
            throw new Error("Сервер упал");

        } else if(response.status === 400) {

            alert('Имя и комментарий должны содержать хотя бы 3 символа');
              
            throw new Error("Неверный запрос");

        } else {
            return response.json();
        } 
    })
    .then((responseData) => {
        //comments = appComments;
        console.log(responseData);
        //fetchGet();
        renderComments(listElement, getComments);
        //initLikeButtonListeners();
    })
    .then((data) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
        nameInputElement.value = "";  
        commentInputElement.value = ""; 
        fetchGet();
        renderComments(listElement, getComments);
        console.log(data);
    })
    .catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
        if(!navigator.onLine) {
          alert("Кажется что-то пошло не так, попробуй позже");
        }
        
        console.warn(error);
    });
};



