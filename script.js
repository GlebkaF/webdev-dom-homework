const commentItems = document.getElementById('comments');
const buttonElement = document.getElementById('comment-button');
const nameElement = document.getElementById('comment-author');
const textElement = document.getElementById('comment-text');

const comments = [ {
        name: 'Глеб Фокин',
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
        likePosition: 0
    }, {
        name: 'Варвара Н.',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75,
        likePosition: 1
    }];

function twoDigits(num) {
    if( num >= 0 && num <= 9) {
      return "0" + num;
    } else { 
      return "" + num;
    }
};

const renderComments = () => {
    const commentHtml = comments.map((comment, index) => {
        if (Boolean(comment.likePosition)) {
            return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button -active-like" data-index="${index}" data-position="${comment.likePosition}"></button>
          </div>
        </div>
      </li>`;
        } else {
            return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button" data-index="${index}" data-position="${comment.likePosition}"></button>
          </div>
        </div>
      </li>`;
        }
    }).join("");

    commentItems.innerHTML = commentHtml;

    const buttonLikes = document.querySelectorAll('.like-button')

    for (const button of buttonLikes) {
        button.addEventListener("click", (event) => {
            event.stopPropagation();

            const index = Number(button.dataset.index);

            let position = Boolean(Number(button.dataset.position));
            
            position = !position;
            
            if (position) {
                comments[index].likes = comments[index].likes + 1;
                comments[index].likePosition = 1;
                renderComments();
            }
            if (!position) {
                comments[index].likes = comments[index].likes - 1;
                comments[index].likePosition = 0;
                renderComments();
            }
        })
    }
}

renderComments();


buttonElement.addEventListener("click", () => {

    nameElement.classList.remove("error");
    textElement.classList.remove("error");
    buttonElement.classList.remove("error-for-button");

    if (nameElement.value === "" || textElement.value === "") {
        nameElement.classList.add("error");
        textElement.classList.add("error");
        buttonElement.classList.add("error-for-button");
        return;
    }

    comments.push({
        name: nameElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        text: textElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        likes: 0,
        likePosition: 0
    })

    renderComments();

    nameElement.value = "";
    textElement.value = "";
})

