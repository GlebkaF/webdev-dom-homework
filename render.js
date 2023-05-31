import { deleteComment, getComments, switchLike } from "./api.js";
export const renderComments = (arrData,element,token) => {
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
              <button class="delete-button" data-index="${index}">Удалить</button>
            </div>
          <div class="likes">
            <span class="likes-counter">${comment.likeCounter}</span>
            <button class="like-button${(comment.likeStatus) ? " -active-like": ""}" data-index="${index}"></button>
          </div>
        </div>
      </li>`;
  })
  element.innerHTML = commentsHtml.join("");
  
  let buttonLike = document.querySelectorAll(".like-button");
  for (const button of buttonLike) {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = button.dataset.index;
     button.classList.add("-loading-like");
    //     if (arrData[index].likeStatus === true) {
    //   arrData[index].likeCounter -=1;
    //   arrData[index].likeStatus = false;
    //   renderComments(arrData,element);
    //  } else {
    //   arrData[index].likeCounter +=1;
    //   arrData[index].likeStatus = true;
    //   renderComments(arrData,element);
    //  }
    //   });
    switchLike(arrData[index].id,token).then(() => {
      getComments(arrData,element,token);
    });
    })
  }

  let buttonDelete = document.querySelectorAll(".delete-button");
  for (const button of buttonDelete) {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = button.dataset.index;
      deleteComment(arrData[index].id,token).then(() => {
        getComments(arrData,element,token);
      });
    })
  }

  
  let comments = document.querySelectorAll(".comment");
  for (const comment of comments) {
    comment.addEventListener("click", () => {
      const userCommentElement = document.getElementById("userComment");
      const index = comment.dataset.index;
     userCommentElement.value = `QUOTE_BEGIN ${arrData[index].name} - "${arrData[index].text}"QUOTE_END`;
    })
  }
  }

  export const renderForm = (element, formHtml) => {
    element.innerHTML = formHtml;
  }