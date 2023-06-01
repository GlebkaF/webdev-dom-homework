//Комментарии

const form = document.querySelector('.add-form');
const newName = form.querySelector('.add-form-name');
const newComment = form.querySelector('.add-form-text');
const addButton = form.querySelector('.add-form-button');
const comments = document.querySelector('.comments');
const delButton = form.querySelector('.del-form-button');
const boxOfComments = document.querySelector('.comments');
const boxOfCommentsTexts = boxOfComments.querySelectorAll('.comment')
const addForm = document.querySelector('.add-form')
const loader = document.querySelector('.loader');


usersComments = []



//Редактирование и добавление комментария
function getComments () {
  const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v1/anna-makhortova/comments", {
    method: "GET"
  });
  fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {
      usersComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked
        }
      });
      loadedComment = false
      renderForm(loadedComment)
      renderComments();
    });
  });
}

function addNewComment() {
  const dateNow = new Date();
let loadedComment = true
renderForm(loadedComment)
fetch("https://webdev-hw-api.vercel.app/api/v1/anna-makhortova/comments", {
method: "POST",
body: JSON.stringify({
"text": newComment.value.replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replace("|", "<div class='quote'>")
      .replace("|", "</div>"),
"name": newName.value.replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
})}).then((response) => {
  response.json().then((responseData) => {
    getComments()
      renderComments();

  })
})
    cleareInputs()
      renderComments()
      commentClickListener()
}

getComments()

function formatDate(date) {

  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  let hh = date.getHours() % 100
  if (hh < 10) hh = '0' + hh;

  let mi = date.getMinutes() % 100
  if (mi < 10) mi = '0' + mi;
  return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + mi;
}

function cleareInputs () {
  newName.value = ''
  newComment.value = ''
  addButton.setAttribute('disabled', 'disabled')
}






//ответ-комментарий
const commentClickListener = () => {

    const boxOfCommentsTexts = boxOfComments.querySelectorAll('.comment')

    for (const comment of boxOfCommentsTexts) {
      comment.addEventListener('click', () => {
        newComment.setAttribute('style', 'white-space: pre-line;');
        const replace = `${usersComments[comment.dataset.id].text} \r\n \r\n ${usersComments[comment.dataset.id].name}`
        newComment.value = `| ${replace} \r\n\|`
      })
    }
    commentClickListener()
}

const initEventListeners = () => {

const likeButtons = document.querySelectorAll('.likes');

  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (e) => {
      e.stopPropagation()
      const comment = usersComments[e.target.dataset.id];
        if (comment.isLiked) {
          delLikes(e);
        } else {
          addLikes(e);
        }

       renderComments();
})

}
newName.addEventListener('input', function () {
    if (newName.value.length < 2 || newComment.value.length < 5) {
        addButton.setAttribute('disabled', 'disabled')
    }
    else{
        addButton.removeAttribute('disabled')
    }
});

newComment.addEventListener('input', function () {
    if (newName.value.length < 2 || newComment.value.length < 5) {
        addButton.setAttribute('disabled', 'disabled')
    }
    else{
        addButton.removeAttribute('disabled')
    }
});


addButton.addEventListener('click', addNewComment)

form.addEventListener('keyup', function (event) {
    if (!addButton.attributes.disabled && event.code == 'Enter') {
       addNewComment()
    }
    else{
        return
    }
})

delButton.addEventListener('click', function () {
    comments.removeChild(comments.lastChild)
    usersComments.pop()
})





//Оставлять комментарии
const renderComments = () => {
    const commentsHtml = usersComments
    .map((comment, id) => {
      let isLiked = ''
      if (comment.isLiked) {
        isLiked = '-active-like';
      }

      date = formatDate(comment.date)
      return `<li class="comment" data-id="${id}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${isLiked}" data-id="${id}"></button>
          </div>
        </div>
      </li>`;
      })
      .join("");
      boxOfComments.innerHTML = commentsHtml;
      initEventListeners();
    };
    renderComments()

    function renderForm(loadedComment) {
      if (loadedComment == true){
        addForm.classList.add('hide')
        loader.classList.remove('hide')
      } if(loadedComment == false){
        loader.classList.add('hide')
        addForm.classList.remove('hide')
      }
    }




//Лайки
const addLikes = (e) => {
    usersComments[e.target.dataset.id].likes = Number(usersComments[e.target.dataset.id].likes) + 1;
    usersComments[e.target.dataset.id].isLiked  = true;
}

const delLikes = (e) => {
    usersComments[e.target.dataset.id].likes = Number(usersComments[e.target.dataset.id].likes) - 1;
    usersComments[e.target.dataset.id].isLiked = false;
  }