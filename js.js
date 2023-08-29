const addFormElement = document.getElementById("add-form-name");
const buttonElement = document.getElementById("add-form-button");
const addFormTextElement =document.getElementById("add-form-text");
const listElement = document.getElementById("comments");
const formAddElement = document.getElementById("add-form");
const addNewComment = document.getElementById("add-form-row");
const containerElement = document.getElementById("container-comments");
const addElement = document.getElementById("add");
    let comments = [];

    
      const plusZero = (str) => {
        return str < 10 ? `0${str}` : str;
      };
      const now = (currentDate) => {
        let date = plusZero(currentDate.getDate());
        let month = plusZero(currentDate.getMonth() + 1);
        let hours = plusZero(currentDate.getHours());
        let mins = plusZero(currentDate.getMinutes());
        return `${date}.${month}.${currentDate.getFullYear() % 100} ${hours}:${mins}`;
      }
  
  containerElement.textContent = "Подождите идет загрузка сайта";
const fetchPromise = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/doroshenko-polina/comments", {
    method: "GET"
  })
 .then((response) => {
    return response.json();
  })
   
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
            name: comment.author.name,
            date: now (new Date (comment.date)),
            text: comment.text,
            likes: comment.likes,
            activeLike: false,
            isLoading: false,
    };
    });
    comments = appComments;
    containerElement.textContent = "";
    renderComents();   
    });
      };
 
fetchPromise();

      const initEventListeners = () => {
        const likesButton = document.querySelectorAll(".like-button");
        for (const likeButton of likesButton ) {
          likeButton.classList.add('-loading-like');
            likeButton.addEventListener("click", (event) =>{
              event.stopPropagation();
              function delay(interval = 300) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, interval);
                });
          };
          delay(2000).then(() => {
              
                const comment = comments[likeButton.dataset.index];
                comment.likes = comment.isLiked
                ? comment.likes - 1
                : comment.likes + 1;
                comment.isLiked = !comment.isLiked;
                comment.isLikeLoading = false;
              renderComents();
          })
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
                  <button data-index="${index}" class="${comment.likes ? 'like-button -active-like' : 'like-button'}"></button>
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

      renderComents();
      
     
      formAddElement.classList.add('add-none');
      addElement.textContent = "Комментарий добавляется ...";
      function postTask(text) {
           fetch("https://wedev-api.sky.pro/api/v1/doroshenko-polina/comments", {
        method: "POST",
        body: JSON.stringify({
          name: addFormElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
          text: addFormTextElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
          forceError: true,
        })
        
      })  
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          }  
          else if (response.status === 400){
          alert("Имя и комментарий должны быть не короче 3 символов");
          if (addFormTextElement.value.length < 3 || addFormElement.value.lenght < 3) {
            addFormElement.classList.add("color");
            addFormTextElement.classList.add("color");
          }
          return Promise.reject(new Error("Не верный пользовательский ввод"));        
          }
          else {
          return Promise.reject(new Error("Ошибка сервера"));
          }
      })
      .then(() => {    
         fetchPromise();   
         })
      .then(() => {
        addElement.textContent = "";
        formAddElement.classList.remove('add-none');
        addFormElement.value = "";
        addFormTextElement.value = "";
        })
        .catch((error) => {
          addElement.textContent = "";
          formAddElement.classList.remove('add-none');        
          postTask(text);
        })
      }
        postTask();
        renderComents();
       
   
                      
      });
    
    

   
      
      
     
     
   

    console.log("It works!");


    