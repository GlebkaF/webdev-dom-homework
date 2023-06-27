const buttonElement = document.getElementById("add-button");
    const deleteButtonElement = document.getElementById("delete-button");
    const listElement = document.getElementById("list");
    const nameInputElement = document.getElementById("name-input");
    const commentInputElement = document.getElementById("comment-input");
    const likeButtonElements = document.querySelectorAll(".like-button");
    const editButtonElements = document.querySelectorAll(".edit-button");
    const commentElements = document.querySelectorAll(".comment");



    // Data in array


     let userComments = [
     //  {
     //    name: "Глеб Фокин",
     //    date: "12.02.22 12:18",
     //    comment: "Это будет первый комментарий на этой странице",
     //    likeCounter: 3,
     //    isLiked: false,
     //    active: "",
     //    isEdit: false,
     //  },
     //  {
     //    name: "Варвара Н.",
     //    date: "13.02.22 19:22",
     //    comment: "Мне нравится как оформлена эта страница! ❤",
     //    likeCounter: 75,
     //    isLiked: false,
     //    active: "",
     //    isEdit: false,
     //  },
     ];


      // Data from API

      // import { fetchComments } from "./api.js";

      const fetchComments = () => {
        return fetch("https://webdev-hw-api.vercel.app/api/v1/mariia-goppa/comments", {
        method: "GET",
      }).then((response) => {
        let loadingComments = document.getElementById('comments-loader');
        loadingComments.style.display = 'none';
      return response.json();
      })
      .then((responseData) => {
          userComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: new Date(comment.date).toLocaleString().slice(0, -3),
            comment: comment.text,
            likeCounter: 0,
            isLiked: false,
            active: "",
            isEdit: false,
            };
        });
    
          renderUserComments();
        });
      };
    
      fetchComments();
        

      // Like button

      const initLikeButton = () => {
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
          renderUserComments();
        });
      }
    };

     // Edit button

     const initEditButton = () => {
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
          renderUserComments();
        });
      }
    };

     // Reply to a comment

     const replyToComment = () => {
      const commentElements = document.querySelectorAll(".comment");
      for (const commentElement of commentElements) {
        commentElement.addEventListener("click", () => {
            let userName = commentElement.dataset.name;
            let textComment = commentElement.dataset.text;
            commentInputElement.value = userName +"\n" + textComment;
        });
      }
    };


    const renderUserComments = () => {
      const userCommentsHtml = userComments.map((userComment, index) => {
        if (!userComments[index].isEdit) {
          userComments.isEdit = true;
          return `<li class="comment" data-index="${index}" data-name="${userComment.name}" data-text="${userComment.comment}">
          <div class="comment-header">
            <div>${userComment.name}</div>
            <div>${userComment.date}</div>
          </div>
          <div class="comment-body">
            <div style="white-space: pre-line" class="comment-text">
              ${userComment.comment}
            </div>
          </div>
          <button data-index="${index}" class="edit-button" type="button">Редактировать</button>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${userComment.likeCounter}</span>
              <button data-index="${index}" class="like-button ${userComment.active}"></button>
            </div>
          </div>
        </li>`;
        } else {
          userComments.isEdit = false;
          return `<li class="comment">
          <div class="comment-header">
            <div>${userComment.name}</div>
            <div>${userComment.date}</div>
          </div>
          <div class="comment-body">
            <div style="white-space: pre-line" class="comment-text">
              <textarea class="comment-text-edit">${userComment.comment}</textarea>
            </div>
          </div>
          <button data-index="${index}" class="edit-button" type="button">Сохранить</button>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${userComment.likeCounter}</span>
              <button data-index="${index}" class="like-button ${userComment.active}"></button>
            </div>
          </div>
        </li>`;
        }
      }).join('');
      listElement.innerHTML = userCommentsHtml;
      initLikeButton();
      initEditButton();
      replyToComment();
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

      // Adding new comment

    //  userComments.push({
    //    name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
    //    date: time (),
    //    comment: commentInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
    //    likeCounter: 0,
    //    isLiked: false,
    //    active: "",
    //    isEdit: false,
    //  });

      // Post from API
      

      const postComment = () => {
        let loadingComments = document.getElementById('new-comment-loader');
        loadingComments.classList.remove('hidden');
        let newComment = document.getElementById('new-comment-section');
        newComment.style.display = 'none';
          fetch("https://webdev-hw-api.vercel.app/api/v1/mariia-goppa/comments", {
            method: "POST",
            body: JSON.stringify({ 
              text: commentInputElement.value, 
              name: nameInputElement.value,
              dates: time(),
              likeCounter: 0,
            }),
          })
          .then((response) => {
            return fetchComments();
          })
          .then((response) => {
            let loadingComments = document.getElementById('new-comment-loader');
            loadingComments.classList.add('hidden');
            let newComment = document.getElementById('new-comment-section');
            newComment.style.display = '';
          });
        };

        postComment();
//
        renderUserComments();
        
//
        nameInputElement.value = "";
        commentInputElement.value = "";
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
    