import { renderCommentList } from "./render.js";
import { getComments, postComment } from "./api.js";
import { addErrors, getDate, addLikeButton } from "./helper.js";

    const buttonElement = document.getElementById('add-button');
    const commentsListElement = document.getElementById('comments-list');
    const addingAComment = document.getElementById('adding');
    const commentsLoader = document.getElementById('loader');
    
    let commentList = []

    
   

    // commentsLoader.className = "_hidden";
    console.log(commentsLoader);
    commentsLoader.classList.add("_hidden");
   
    buttonElement.addEventListener("click", () => {
      if (nameElement.value === ""){
        alert("Пожалуйста введите имя!");
        return;
      };
      if (commentsElement.value === ""){
        alert("Пожалуйста введите коментарий!");
        return;
      };
      addingAComment.classList.add("_hidden");
      commentsLoader.classList.remove("_hidden");
      postComment();
    });

    renderCommentList();
    getComments();
    postComment();
    addErrors();
    getDate();
    addLikeButton();


    // const getAndRenderComments = () => {
    //   //сделать гет запрос Ответ сохранить в переменную 
    //   //ответ гет запроса передать в рендер через промес
    //   const comments = getComments();
    //   console.log(comments);
    //   renderCommentList(comments);
    //   };
    //   getAndRenderComments();

    

    // const postAndRenderComments = () => {
    //   //пост запрос 
    //   //вызывает через промес гет
    // }


