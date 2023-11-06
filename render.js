export const renderData = (ulElement, commentsArray) => {
  const renderComments = () => {
    return (ulElement.innerHTML = commentsArray
      .map((item, index) => {
        return `
            <li class="comment" data-user-name="${item.name}" data-text="${item.comment}">
            <div class="comment-header">
              <div>${item.name}</div>
              <div>${item.date}</div>
            </div>
            <div class="comment-body">
                  <div class = "comment-text">${item.comment}</div>
            </div>
            <div class="comment-footer">
              <button data-index="${index}" class="remove-button">Удалить</button>
              <div class="likes">
                <span class="likes-counter">${item.like}</span>
                <button data-index='${index}' class="like-button ${item.paint}"</button>
              </div>
            </div>
          </li>`;
      })
      .join(""));
  };

  const deleteButtonsUser = () => {
    const deleteButtons = document.querySelectorAll(".remove-button");
    for (const deleteButton of deleteButtons) {
      deleteButton.addEventListener("click", (event) => {
        event.stopImmediatePropagation();
        const index = deleteButton.dataset.index;
        commentsArray.splice(index, 1);
        renderComments();
        deleteButtonsUser();
      });
    }
  };

  const answerComment = (textElement) => {
    textElement = document.getElementById("inputText");
    const commentAnswers = document.querySelectorAll(".comment");
    for (const commentAnswer of commentAnswers) {
      commentAnswer.addEventListener("click", () => {
        textElement.value = `QUOTE_BEGIN 
                    ${commentAnswer.dataset.text}${commentAnswer.dataset.userName} 
                    QUOTE_END 
                    Ответ:  `;
        renderComments();
        answerComment();
      });
    }
  };

  function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }

  const likes = () => {
    const likeButtons = document.querySelectorAll(".like-button");
    for (const likeButton of likeButtons) {
      likeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        likeButton.classList.add("loadingLike");
        delay(2000).then(() => {
          likeButton.classList.remove("loadingLike");
          const index = likeButton.dataset.index;
          if (commentsArray[index].userLike === false) {
            commentsArray[index].paint = "-active-like";
            commentsArray[index].like += 1;
            commentsArray[index].userLike = true;
          } else {
            commentsArray[index].paint = "";
            commentsArray[index].like -= 1;
            commentsArray[index].userLike = false;
          }
          renderComments();
          likes();
        });
      });
    }
  };
  renderComments();
  deleteButtonsUser();
  answerComment();
  likes();
};
