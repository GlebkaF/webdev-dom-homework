const buttonElement = document.getElementById('comment-button');
const nameElement = document.getElementById('comment-author');
const textElement = document.getElementById('comment-text');
const listComments = document.getElementById("comments");
const likeCounters =  document.querySelectorAll('.likes-counter');
const buttonPositions = document.querySelectorAll('.like-button');

buttonPositions.forEach((element, index) => {
  let position = Boolean(Number(element.dataset.position));
  element.addEventListener("click", () => {
    position = !position
    let like = Number(likeCounters[index].dataset.number);
    if (position) {
      like = like + 1
      likeCounters[index].innerHTML = `<span class="likes-counter" data-number="${like}">${like}</span>`
      element.classList.add('-active-like');
      element.dataset.number = 1
    } 
    if (!position) {
      like = like - 1
      likeCounters[index].innerHTML = `<span class="likes-counter" data-number="${like}">${like}</span>`
      element.classList.remove('-active-like');
      element.dataset.number = 0
    }
  })
});


function twoDigits(num) {
  if( num >= 0 && num <= 9) {
    return "0" + num;
  } else { 
    return "" + num;
  }
}

buttonElement.addEventListener("click", () => {
    nameElement.classList.remove("error");
    textElement.classList.remove("error");
    buttonElement.classList.remove("error-for-button");
    if (nameElement.value === "" || textElement.value === "") {
        nameElement.classList.add("error");
        textElement.classList.add("error");
        buttonElement.classList.add("error-for-button");
        return;
    }; 
    let commentDate = new Date();
    const oldComments = listComments.innerHTML;
    listComments.innerHTML =
        oldComments +
        `<li class="comment">
        <div class="comment-header">
          <div>${nameElement.value}</div>
          <div>${twoDigits(commentDate.getDate())}.${twoDigits(commentDate.getMonth()+1)}.${commentDate.getFullYear()} ${twoDigits(commentDate.getHours())}:${twoDigits(commentDate.getMinutes())}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${textElement.value}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">0</span>
            <button class="like-button"></button>
          </div>
        </div>
      </li>`;
});

