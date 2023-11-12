const buttonElement = document.getElementById("add-button");
const addForm = document.getElementById("add-form");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
nameInputElement.style="comment-header";
function checkInput() {
  if (!nameInputElement.value || !commentInputElement.value) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}
nameInputElement.addEventListener("input", checkInput)
commentInputElement.addEventListener("input", checkInput)

let comments = []

function fetchPromise() {
  return fetch("https://wedev-api.sky.pro/api/v1/daria-alekseeva/comments", {
  method: "GET"
  })
  .then((responce) => {
    if (responce.status == 500) {
      throw new Error('Сервер сломался');
    } else {
      return responce.json()
    }
  })
  .then((responceData) => {
    const comms = responceData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString(),
          comment: comment.text,
          likes: comment.likes,
          isLiked: false,
        }
      })
      comments = comms;
      renderComments();
  })
  .catch((error) => {
    if (error.message == 'Сервер сломался') {
      console.log('Сервер сломался')
    } else {
      console.log('ошибка')
    }
  })
  .finally(() => {
    addForm.style.display = "flex"
  })
  function getLike(index) {
    if (!comments[index].isLiked) {
      comments[index].likes++
    } else {
      comments[index].likes--
    }
    comments[index].isLiked = !comments[index].isLiked;
    renderComments();
  }

}
const pageLoaded = () => {
  const loadInfo = "<span>Пожалуйста, подождите, загружаю комментарии...</span>"
  listElement.innerHTML = loadInfo
} 

const commentSend = () => {
  const loadInfo = "<span>Комментарий добавляется...</span>"
  listElement.innerHTML += loadInfo;
  addForm.style.display = "none"
} 

pageLoaded()
fetchPromise()

function getLike(index) {
  if (!comments[index].isLiked) {
    comments[index].likes++
  } else {
    comments[index].likes--
  }
  comments[index].isLiked = !comments[index].isLiked;
  renderComments();
}

function answerComment(index) {
  commentInputElement.value = `> ${comments[index].comment} \n ${comments[index].name},`;
} 

const renderComments = () => {
  const commentsHtml = comments.map((comment, index)=> {
    return `<li class="comment" onclick="answerComment(${index})">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.comment}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          ${comment.likes}
          <button onclick="getLike(${index})" class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
        </div>
      </div>
    </li>`;
  }).join('');
  listElement.innerHTML = commentsHtml;
}

const sanitizeHtml = (htmlString) => {
  return htmlString
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;");
};
function fetchPromisePost() {
    return fetch("https://wedev-api.sky.pro/api/v1/daria-alekseeva/comments", {
    method: "POST",
    body: JSON.stringify({
      "text": sanitizeHtml(commentInputElement.value),
      "name": sanitizeHtml(nameInputElement.value)
      })
    })
    .then((responce) => {
      if (responce.status == 500) {
        throw new Error('Сервер сломался');
      } else if (responce.status == 400) {
        throw new Error('Вы ввели слишком мало символов в имя или текст');
      }
       else {
        fetchPromise();
        nameInputElement.value = '';
        commentInputElement.value = '';
      }
    })
    .catch((error) => {
      if (error.message == 'Сервер сломался') {
        console.log('Сервер сломался')
      } else if (error.message == 'Вы ввели слишком мало символов в имя или текст') {
        alert('Вы ввели слишком мало символов в имя или текст')
      } 
      else {
        console.log('ошибка')
      }
      renderComments()
    })
    .finally(() => {
      addForm.style.display = "flex"
    })
  }
buttonElement.addEventListener("click", () => {
  if (!nameInputElement.value || !commentInputElement.value) {
    return;
  } 
  
//   const currentDate = new Date();
//   const oldListHtml = listElement.innerHTML;
  commentSend();
  fetchPromisePost();
});


console.log("It works!");