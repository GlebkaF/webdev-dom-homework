const addFormElement = document.getElementById("add-form-name");
    const buttonElement = document.getElementById("add-form-button");
    const addFormTextElement =document.getElementById("add-form-text");
    const listElement = document.getElementById("comments");

    const comments = [
        {
          name: "Глеб Фокин",
          date: "12.02.22 12:18",
          text: "Это будет первый комментарий на этой странице",
          likes: 3,
          liked: false
        },
        {
          name: "Варвара Н.",
          date: "13.02.22 19:22",
          text: "Мне нравится как оформлена эта страница! ❤️",
          likes: 75,
          liked: true
        }
      ];
      
      const initEventListeners = () => {
        const likesButton = document.querySelectorAll(".like-button");
        for (const likeButton of likesButton ) {
            likeButton.addEventListener("click", (event) =>{
              event.stopPropagation();
                const comment = comments[likeButton.dataset.index];
                comment.myLike ? --comment.likes : ++comment.likes;
                comment.myLike = !comment.myLike;
                renderComents();
            })
        }
    }
    const replyToComment = () => {
      const commentsBody = document.querySelectorAll(".comment");
      for (const commentBody of commentsBody) {
        commentBody.addEventListener('click', () => {
          const oldComment = commentBody.dataset.text;
          const oldName = commentBody.dataset.name;
          addFormTextElement.value += `${oldComment}\n${oldName}:\n `;
              document.querySelector(".add-form-text").focus();
             
    })
  }
}
    
    
     const renderComents = () => {
        const commentsHTML = comments.map((comment, index) => {
            return `<ul class="comments">
            <li class="comment" id="comment" data-text="${comment.text}" data-name="${comment.name}">
              <div class="comment-header">
                <div>${comment.name}</div>
                <div>${comment.date}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                ${comment.text}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comment.likes}</span>
                  <button data-index="${index}" class="${comment.myLike ? 'like-button -active-like' : 'like-button'}"></button>
                </div>
              </div>
              </li>
              </ul>`;
        })
        .join("");
       listElement.innerHTML = commentsHTML;
     initEventListeners();
        replyToComment();
     }
    renderComents();
  
    buttonElement.addEventListener("click", () => {
     
     addFormElement.classList.remove("error");
     if (addFormElement.value === "") {
      addFormElement.classList.add("error");
          return;
     }
     addFormTextElement.classList.remove("error");
     if (addFormTextElement.value === "") {
      addFormTextElement.classList.add("error");
          return;
     }
      
     
      let currentDate = new Date();
     let month = currentDate.getMonth() + 1;
      let day = currentDate.getDay();
      let year = currentDate.getFullYear();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let formattedDay = day < 10 ? '0' + day : day;
      let formattedMonth = month < 10 ? '0' + month : month;
      let formattedYear = year;
      let formattedHours = hours < 10 ? '0' + hours : hours;
      let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      let formattedDate = formattedDay + '.' + formattedMonth + '.' + formattedYear + ' ' + formattedHours + ':' + formattedMinutes;
      const oldListHTML = listElement.innerHTML;
      comments.push({
          name: addFormElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
          date: formattedDate,
          text: addFormTextElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
          likes: 0,
           
      });
      //initEventListeners();
      renderComents();
     
      
      

         
       addFormElement.value = "";
       addFormTextElement.value = "";


     });
     
     

    console.log("It works!");
    //addFormTextElement.value = ${comment.comment}/n${comment.name};
     //const replyInput = document.createElement('input');
      //replyInput.type = 'text';
      //replyInput.placeholder = 'Reply to comment...';
      //replyInput.value = oldComment + oldName;
      //commentBody.appendChild(replyInput);