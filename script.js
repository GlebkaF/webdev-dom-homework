//Комментарии

const form = document.querySelector('.add-form');
const newName = form.querySelector('.add-form-name');
const newComment = form.querySelector('.add-form-text');
const addButton = form.querySelector('.add-form-button');
const comments = document.querySelector('.comments');
const delButton = form.querySelector('.del-form-button');
const boxOfComments = document.querySelector('.comments');
const boxOfCommentsTexts = boxOfComments.querySelectorAll('.comment')


const usersComments = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    comment: "Это будет первый комментарий на этой странице",
    likes: "3",
    Iliked: false,
    isEdit: false
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    comment: "Мне нравится как оформлена эта страница! ❤",
    likes: "75",
    Iliked: false,
    isEdit: false
  },
  {
    name: "Анна",
    date: "20.05.23 21:18",
    comment: "Супер!",
    likes: "1",
    Iliked: true,
}

]




//Редактирование и добавление комментария
function addNewComment() {
    const dateNow = new Date();
    usersComments.push({
        name: `${newName.value}`.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        date: `${formatDate(dateNow)}`,
        comment: `${newComment.value}`
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replace("|", "<div class='quote'>")
        .replace("|", "</div>"),
        likes: "0",
        Iliked: false,
        isEdit: false
    })
    cleareInputs()
      renderComments()
      commentClickListener()
}

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
        const replace = `${usersComments[comment.dataset.id].comment} \r\n \r\n ${usersComments[comment.dataset.id].name}`
        newComment.value = `| ${replace} \r\n\|`
      })
    }
    commentClickListener()
}

const initEventListeners = () => {

const likeButtons = document.querySelectorAll('.likes');

  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (e) => {
      (usersComments[e.target.dataset.id].Iliked) ? delLikes(e) : addLikes(e);
    renderComments();
    })

  }
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
    const commentsHtml = usersComments.map((user, index) => {
        (user.Iliked) ? Iliked = '-active-like' : Iliked = '';
        return `<li class="comment" data-id="${index}">
        <div class="comment-header">
          <div>${user.name}</div>
          <div>${user.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${user.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${user.likes}</span>
            <button class="like-button ${Iliked}" data-id="${index}"></button>
          </div>
        </div>
      </li>`;
      })
      .join("");
      boxOfComments.innerHTML = commentsHtml;
      initEventListeners();
    };
    renderComments()




//Лайки
const addLikes = (e) => {
    usersComments[e.target.dataset.id].likes = Number(usersComments[e.target.dataset.id].likes) + 1;
    usersComments[e.target.dataset.id].Iliked = true;
}

const delLikes = (e) => {
    usersComments[e.target.dataset.id].likes = Number(usersComments[e.target.dataset.id].likes) - 1;
    usersComments[e.target.dataset.id].Iliked = false;
}
