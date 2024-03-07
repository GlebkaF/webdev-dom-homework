const commentItems = document.getElementById('comments');
const buttonAdd = document.getElementById('comment-button');
const nameElement = document.getElementById('comment-author');
const textElement = document.getElementById('comment-text');

function twoDigits(num) {
  if( num >= 0 && num <= 9) {
    return "0" + num;
  } else { 
    return "" + num;
  }
}

let comments = [];

const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/fnami/comments", {
  method: "GET"
});

fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((responseData) => {
    
  comments = responseData.comments;
  renderComments();
  });
});

const renderComments = () => {
  console.log(comments)

    const commentHtml = comments.map((comment, index) => {
      /*return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.author.name}</div>
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
            <button class="like-button -active-like" data-index="${index}" data-position="${comment.isLiked}"></button>
          </div>
        </div>
      </li>`;*/
        if (Boolean(comment.isLiked)) {
            return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.author.name}</div>
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
            <button class="like-button -active-like" data-index="${index}" data-position="${comment.isLiked}"></button>
          </div>
        </div>
      </li>`;
        } else {
            return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.author.name}</div>
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
            <button class="like-button" data-index="${index}" data-position="${comment.isLiked}"></button>
          </div>
        </div>
      </li>`;
        }
    }).join("");

    console.log(commentHtml)

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

    const commentElement = document.querySelectorAll(".comment")

    for (const comment of commentElement) {
      comment.addEventListener("click", (event) => {
        event.stopPropagation();

        const index = Number(comment.dataset.index);

        textElement.value = `↪️ ${comments[index].text}\n\n${comments[index].name}, `;
      })
    }
}

renderComments()

buttonAdd.addEventListener("click", () => {

    nameElement.classList.remove("error");
    textElement.classList.remove("error");
    buttonAdd.classList.remove("error-for-button");

    let regexp = new RegExp('^[а-яa-zА-ЯA-Z↪️]');

    if (nameElement.value === "" || textElement.value === "" || !regexp.test(nameElement.value) || !regexp.test(textElement.value)) {
        nameElement.classList.add("error");
        textElement.classList.add("error");
        buttonAdd.classList.add("error-for-button");
        return;
    }

    fetch("https://wedev-api.sky.pro/api/v1/fnami/comments", {
      method: "POST",
      body: JSON.stringify({
        name: nameElement.value,
        text: textElement.value
      })
    }).then((response) => {
      response.json().then((responseData) => {
        comments = responseData.comments;
        renderComments();
      });
    
      const jsonPromiseTwo = fetch("https://wedev-api.sky.pro/api/v1/fnami/comments", {
        method: "GET"
      }).then((response) => {
        const jsonPromiseTwo = response.json();
  
        jsonPromiseTwo.then((responseData) => {
          comments = responseData.comments;
          renderComments();
        });
      });


    renderComments();

    nameElement.value = "";
    textElement.value = "";
});
});
