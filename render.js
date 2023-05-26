export const renderComments = (arrData,element) => {
    let commentsHtml = arrData.map((comment,index) => {
    return     `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name.replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("QUOTE_BEGIN", "<div class='comment-quote'>").replaceAll("QUOTE_END", "</div>")}
          </div>
        </div>
        <div class="comment-footer">
          <div class="edit">
              <button class="edit-button" data-index="${index}">Редактировать</button>
            </div>
          <div class="likes">
            <span class="likes-counter">${comment.likeCounter}</span>
            <button class="like-button${comment.likeStatus}" data-index="${index}"></button>
          </div>
        </div>
      </li>`;
  })
  element.innerHTML = commentsHtml.join("");
  
  let byttonLike = document.querySelectorAll(".like-button");
  for (const button of byttonLike) {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = button.dataset.index;
     button.classList.add("-loading-like");
      delay(2000).then(() => {
        if (arrData[index].likeStatus === " -active-like") {
      arrData[index].likeCounter -=1;
      arrData[index].likeStatus = "";
      renderComments(arrData,element);
     } else {
      arrData[index].likeCounter +=1;
      arrData[index].likeStatus = " -active-like";
      renderComments(arrData,element);
     }
      });
    })
  }
  function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }
  const userCommentElement = document.getElementById("userComment");
  let comments = document.querySelectorAll(".comment");
  for (const comment of comments) {
    comment.addEventListener("click", () => {
      const userCommentElement = document.getElementById("userComment");
      const index = comment.dataset.index;
     userCommentElement.value = `QUOTE_BEGIN ${arrData[index].name} - "${arrData[index].text}"QUOTE_END`;
    })
  }
  }