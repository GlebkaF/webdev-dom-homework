export const renderListElement = ({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement }) => {
    listElement.innerHTML = listElementData
      .map((element, index) => {
        return `
          <li class="comment" data-index=${index}>
            <div class="comment-header">
              <div>${element.name}</div>
              <div>${element.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${element.comment 
            .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
            .replaceAll("QUOTE_END", "</div>")
                } 
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${(element.likeNumber)}</span>
                <button class="like-button ${(element.like) ? "-active-like" : ""}" data-index=${index}></button>
              </div>
              <div class="redactor">
                <button class="redactor-button" data-index=${index}>Реадактировать</button>
                <button class="delete-button" data-index=${index}>Удалить</button>
              </div>
            </div>
          </li>`
      }).join('');

    initLikeEvent({ listElement, listElementData, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement, renderListElement });
    initRedactorEvent();
    initDeleteEvent();
    initAnsverEvent({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, commentTextareaElement, renderListElement });
  }