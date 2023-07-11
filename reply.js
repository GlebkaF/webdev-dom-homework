"use strict";

//Ответы на комментарии

const replyТoСomment = (replyТo) =>{
    const listElements = document.querySelectorAll(".comment");
    for (const listElement of listElements){
      listElement.addEventListener("click", () => {
        const commentText = listElement.dataset.comment;
        const userName = listElement.dataset.name;
        replyТo.value = ">" + " "  + commentText + " " + userName;
        //renderUsers();
      });
    }
  }

export default replyТoСomment;