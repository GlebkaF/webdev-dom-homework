import { getComments, postComment} from "./api.js";


    const buttonElement = document.getElementById('add-button');
    const addingAComment = document.getElementById('adding');
    const commentsLoader = document.getElementById('loader');
    const nameElement = document.getElementById('name');
    const commentsElement = document.getElementById('comments');



    

    let commentList = []


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

  
    getComments();
    


