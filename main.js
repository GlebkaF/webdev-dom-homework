
import renderUserComments from "./renderComments.js";
import { fetchComments, postComment } from "./api.js";


    const buttonElement = document.getElementById("add-button");
    const deleteButtonElement = document.getElementById("delete-button");
    const listElement = document.getElementById("list");
    const nameInputElement = document.getElementById("name-input");
    const commentInputElement = document.getElementById("comment-input");
    const likeButtonElements = document.querySelectorAll(".like-button");
    const editButtonElements = document.querySelectorAll(".edit-button");
    const commentElements = document.querySelectorAll(".comment");



    // Data in array


   export let userComments = [];


      // Data from API
    
      fetchComments();
        

      // Like button

      const initLikeButton = (userComments) => {
      const likeButtonElements = document.querySelectorAll(".like-button");
      for (const likeButtonElement of likeButtonElements) {
        const index = likeButtonElement.dataset.index;
        likeButtonElement.addEventListener("click", (event) => {
          event.stopPropagation();
          if (!userComments[index].isLiked) {
            userComments[index].isLiked = true;
            userComments[index].active = "-active-like";
            userComments[index].likeCounter += 1;
          } else {
            userComments[index].isLiked = false;
            userComments[index].active = "";
            userComments[index].likeCounter -= 1;
          }
          renderUserComments(userComments);
        });
      }
    };

     // Edit button

     const initEditButton = (userComments) => {
      const editButtonElements = document.querySelectorAll(".edit-button");
      for (const editButtonElement of editButtonElements) {
        const index = editButtonElement.dataset.index;
        editButtonElement.addEventListener("click", (event) => {
          event.stopPropagation();
          if (!userComments[index].isEdit) {
            userComments[index].isEdit = true;
          } else {
            userComments[index].isEdit = false;
          }
          renderUserComments(userComments);
        });
      }
    };

     // Reply to a comment

     const replyToComment = (userComments) => {
      const commentElements = document.querySelectorAll(".comment");
      for (const commentElement of commentElements) {
        commentElement.addEventListener("click", () => {
            let userName = commentElement.dataset.name;
            let textComment = commentElement.dataset.text;
            commentInputElement.value = userName +"\n" + textComment;
        });
      }
    };

    renderUserComments();
  

    // Time function
    
    function time () {
    let myDate = new Date();
    const months = ["01", "02", "03", "04", "05", "06","07", "08", "09", "10", "11", "12"];
    let fullDate = myDate.getDate() + "." + months[myDate.getMonth()] + "." + myDate.getFullYear() + " " + myDate.getHours() +":" + myDate.getMinutes();
    return fullDate;
    }

    

     const addNewElementToList = () => {


      // Validation data check

      nameInputElement.classList.remove('error');
       if (nameInputElement.value === "") {
        nameInputElement.classList.add('error');
        return;
      }
      commentInputElement.classList.remove('error');
      if (commentInputElement.value === "") {
        commentInputElement.classList.add('error');
        return;
      }

      // Post from API

        postComment();

        renderUserComments();
        
     };


     buttonElement.addEventListener("click", addNewElementToList);

    // Validation form check for the button

    const validateForm = () => {
      if (nameInputElement.value === "") {
        buttonElement.disabled = true;
        return;
      }
  
      if (commentInputElement.value === "") {
        buttonElement.disabled = true;
        return;
      }

      buttonElement.disabled = false;
    };

    nameInputElement.addEventListener("input", validateForm);
    commentInputElement.addEventListener("input", validateForm);

    // Enter button

    document.addEventListener("keyup", (event) => {
      console.log("keyup", `${event.code}`);
      if (event.code === 'Enter') {
        addNewElementToList();
      }
    });

    // Delete button

    deleteButtonElement.addEventListener("click", () => {
      // const listComments = document.getElementById("list");
      // listComments.lastChild.remove();

      const comments = document.getElementById("list");
      const lastIndex = comments.innerHTML.lastIndexOf('<li class="comment"');
      comments.innerHTML = comments.innerHTML.slice(0, lastIndex);
      initLikeButton();
      initEditButton();
    });
    
    export { initLikeButton, initEditButton, replyToComment, time };