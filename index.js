"use strict";
    const formButtonElement = document.getElementById("form-button");
    const commentBlockElement = document.getElementById("comment-block");
    const nameInputElement = document.getElementById("name-input");
    const textInputElement = document.getElementById("text-input");

    const commentators = [
        {
            name: 'Глеб Фокин',
            commentText: 'Это будет первый комментарий на этой странице',
            time: '12.02.22 12:18',
            likes: 3,
            isLiked: false,
        },
        {
            name: 'Варвара Н.',
            commentText: 'Мне нравится как оформлена эта страница! ❤',
            time: '13.02.22 19:22',
            likes: 3,
            isLiked: false,
        }
    ];

    const likeMaker = () => {
        const likeButtonElements = document.querySelectorAll('.like-button');
        likeButtonElements.forEach((likeButtonElement) => {
            likeButtonElement.addEventListener('click', () => {
                const index = likeButtonElement.dataset.index
                const like = commentators[index];
                if (like.isLiked === false) {
                    like.isLiked = true;
                    like.likes += 1;
                    renderCommentators()
                } else {
                    like.isLiked = false;
                    like.likes -= 1;
                    renderCommentators()
                }
            })
        })
    }
    
    const newlikeColor = (element) => {
        if (element) {
            return 'like-button -active-like';
        } else {
            return 'like-button';
        }
        // return element ? 'like-button -active-like' : 'like-button'; 
      }

    const renderCommentators = () => {
        const commentatorsHtml = commentators.map((commentator, index) => {
            return `<li class="comment">
            <div class="comment-header">
              <div>${commentator.name}</div>
              <div>${commentator.time}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${commentator.commentText}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${commentator.likes}</span>
                <button data-index="${index}" class="${newlikeColor(commentator.isLiked)}"></button>
              </div>
            </div>`
        }).join('');
        commentBlockElement.innerHTML = commentatorsHtml;
        likeMaker()
    }

    renderCommentators()

    const dateInComment = () => {
      const myDate = new Date();
      let day = myDate.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      let month = myDate.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let year = myDate.getFullYear() % 100;
      let hours = myDate.getHours();
      if (hours < 10) {
        hours = "0" + hours;
      }
      let minutes = myDate.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      let timeWithoutSeconds = hours + ":" + minutes;
      const fullDate =
        day + "." + month + "." + year + " " + timeWithoutSeconds;
      return fullDate;
    };


    formButtonElement.addEventListener("click", () => {
      nameInputElement.classList.remove("error");
      if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
      }
      textInputElement.classList.remove("error");
      if (textInputElement.value === "") {
        textInputElement.classList.add("error");
        return;
      }

      commentators.push({
        name: nameInputElement.value,
        commentText: textInputElement.value,
        time: dateInComment(),
        likes: 0,
        isLiked: false,
      })
      renderCommentators();
    });

