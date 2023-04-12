    const buttonElement = document.querySelector(".add-form-button");
    const commentElement = document.querySelector(".comments");
    const formName = document.querySelector(".add-form-name");
    const formText = document.querySelector(".add-form-text");
    const deleteButton = document.querySelector(".delete-form-button");
    
    formName.addEventListener('keyup', function(event) {
       event.preventDefault();
       if(event.keyCode === 13) {
        buttonElement.click();
       }
    });
    formText.addEventListener('keyup', function(event) {
       event.preventDefault();
       if(event.keyCode === 13) {
        buttonElement.click();
       }
    });

    const comments = [
      {
        name: 'Глеб Фокин',
        data: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likeComment: false,
        countLike: 3,
        add: false,
      },
      {
        name: 'Варвара Н.',
        data: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likeComment: true,
        countLike: 75,
        add: false,
      }
    ];

    const day = new Date();
    let date = day.getDate();
    let month = day.getMonth();
    let year = day.getFullYear() - 2000;
    let hours = day.getHours();
    let minutes = day.getMinutes();
    if (date < 10){
     date = "0" + date;
    };
    if (month < 10){
      month = "0" + month;
    };
    if (hours < 10){
      hours = "0" + hours;
    };
    if (minutes < 10){
      minutes = "0" + minutes;
    };

    const initEventLike = () => {
    const likeButtons = document.querySelectorAll(".like-button");
    for(const likeButton of likeButtons){
      const index = likeButton.dataset.index;
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if (comments[index].likeComment) {
        comments[index].likeComment = false;
        comments[index].countLike -= 1;
      } else {
        comments[index].likeComment = true;
        comments[index].countLike += 1;
      }
      renderLike();
        });
      };
    };

    const answer = () => {
    const answerComments = document.querySelectorAll(".comment");
    for (const answerComment of answerComments){
      answerComment.addEventListener('click', () =>{
        const arr = comments[answerComment.dataset.index];
        let str = arr.text + ' ' + arr.name;
        formText.value += `${str}`;
        formText.focus();
      });
    };
    };

    const renderLike = () => {
      const likeHtml = comments.map((comment, index) => {
        return ` <li data-index="${index}" class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.data}</div>
          </div>
          <div data-index="${index}" class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.countLike}</span>
              <button data-index="${index}"class="like-button ${comment.likeComment ? '-active-like' : ''}"></button>
            </div>
          </div>
        </li>`
      }).join('');
      commentElement.innerHTML = likeHtml;
      initEventLike();
      answer();
    }
    renderLike();

    buttonElement.addEventListener("click", () => {
      formName.classList.remove("error");
      if (formName.value === ""){
        formName.classList.add("error");
        return;
      };
      formText.classList.remove("error");
      if (formText.value === ""){
        formText.classList.add("error");
        return;
      };

      comments.push({
        name: formName.value
         .replaceAll('<','&lt;')
         .replaceAll('>','&gt;'),
        data: `${date}.${month}.${year} ${hours}:${minutes}`,
        text: formText.value
        .replaceAll('<','&lt;')
        .replaceAll('>','&gt;'),
        likeComment: false,
        countLike: 0,
        active: "",
      });

        renderLike();

    formName.value = "";
    formText.value = "";
  });

    deleteButton.addEventListener("click", () => {
      const lastComment = commentElement.innerHTML.lastIndexOf('<li class="comment">');
        commentElement.innerHTML = commentElement.innerHTML.slice(0, lastComment);
    });
  

