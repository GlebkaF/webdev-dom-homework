const addFormElement = document.getElementById("add-form-name");
const buttonElement = document.getElementById("add-form-button");
const addFormTextElement =document.getElementById("add-form-text");
const listElement = document.getElementById("comments");
const formAddElement = document.getElementById("add-form");
const addNewComment = document.getElementById("add-form-row");
buttonElement.disabled = true;
    let comments = [
        //{
          //name: "Глеб Фокин",
          //date: "12.02.22 12:18",
          //text: "Это будет первый комментарий на этой странице",
          //likes: 3,
          //liked: false
        //},
        //{
          //name: "Варвара Н.",
          //date: "13.02.22 19:22",
          //text: "Мне нравится как оформлена эта страница! ❤️",
          //likes: 75,
          //liked: true
        //}
      ];
      const plusZero = (str) => {
        return str < 10 ? `0${str}` : str;
      };
      const now = (currentDate) => {
        let date = plusZero(currentDate.getDate());
        let month = plusZero(currentDate.getMonth() + 1);
        let hours = plusZero(currentDate.getHours());
        let mins = plusZero(currentDate.getMinutes());
        return `${date}.${month}.${currentDate.getFullYear() % 100} ${hours}:${mins}`;
      };
      const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/doroshenko-polina/comments", {
      method: "GET"
    });

    // подписываемся на успешное завершение запроса с помощью then
    fetchPromise.then((response) => {
      // Запускаем преобразовываем "сырые" данные от API в json формат
      const jsonPromise = response.json();

      // Подписываемся на результат преобразования
      jsonPromise.then((responseData) => {

        const appComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: now (new Date (comment.date)),
            text: comment.text,
            likes: 0,
            activeLike: false,
          }
        })
        // получили данные и рендерим их в приложении
        console.log(responseData);
        // comment = responseData.comment;
        comments = appComments;
        renderComents();
      });
    });
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
      
     
      //comments.push({
        //  name: addFormElement.value
          //.replaceAll("&", "&amp;")
          //.replaceAll("<", "&lt;")
          //.replaceAll(">", "&gt;")
          //.replaceAll('"', "&quot;"),
          //date: now(currentDate),
          //text: addFormTextElement.value
          //.replaceAll("&", "&amp;")
          //.replaceAll("<", "&lt;")
          //.replaceAll(">", "&gt;")
          //.replaceAll('"', "&quot;"),
          //likes: 0,
           
      //});
      

      renderComents();
      fetch("https://wedev-api.sky.pro/api/v1/doroshenko-polina/comments", {
        method: "POST",
        body: JSON.stringify({
          name: addFormElement.value,
          text: addFormTextElement.value,
        })
        // JSON.stringifylikes:
      }).then((response) => {
        response.json().then((responseData) => {

          fetch("https://wedev-api.sky.pro/api/v1/doroshenko-polina/comments", {
            method: "GET"  
          }).then((response) => {
      // Запускаем преобразовываем "сырые" данные от API в json формат
     response.json().then((responseData) => {

        const appComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: now (new Date (comment.date)),
            text: comment.text,
            likes: 0,
            activeLike: false,
          };
        });
        // // получили данные и рендерим их в приложении
        
        comment = responseData.comment;
        comments = appComments;
        renderComents();
      });
        });
      });
    });

    renderComents();
      addFormElement.value = "";
      addFormTextElement.value = "";
    
  
      renderComents();
      
      

         
       addFormElement.value = "";
       addFormTextElement.value = "";
     });
     
     
   

    console.log("It works!");


    
    