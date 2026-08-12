const commentsData = [
  {
    id: 1,
    name: 'Глеб Фокин',
    date: '12.02.22 12:18',
    text: 'Это будет первый комментарий на этой странице',
    likes: 3,
    isLiked: false
  },
  {
    id: 2,
    name: 'Варвара Н.',
    date: '13.02.22 19:22',
    text: 'Мне нравится как оформлена эта страница! ❤',
    likes: 75,
    isLiked: true
  }
];

const commentsList = document.getElementById('commentsList');
const nameInput = document.getElementById('nameInput');
const textInput = document.getElementById('textInput');
const addButton = document.getElementById('addButton');
const errorMessage = document.getElementById('errorMessage');

let nextId = 3;

function getCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(2);
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
}

function sanitizeHTML(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderComments() {
  commentsList.innerHTML = '';

  for (let i = 0; i < commentsData.length; i++) {
    const comment = commentsData[i];

    const li = document.createElement('li');
    li.className = 'comment';
    li.dataset.id = comment.id;

    const header = document.createElement('div');
    header.className = 'comment-header';

    const nameDiv = document.createElement('div');
    nameDiv.textContent = comment.name;

    const dateDiv = document.createElement('div');
    dateDiv.textContent = comment.date;

    header.appendChild(nameDiv);
    header.appendChild(dateDiv);

    const body = document.createElement('div');
    body.className = 'comment-body';

    const textDiv = document.createElement('div');
    textDiv.className = 'comment-text';
    textDiv.textContent = comment.text;

    body.appendChild(textDiv);

    const footer = document.createElement('div');
    footer.className = 'comment-footer';

    const likes = document.createElement('div');
    likes.className = 'likes';

    const likesCounter = document.createElement('span');
    likesCounter.className = 'likes-counter';
    likesCounter.textContent = comment.likes;

    const likeButton = document.createElement('button');

    if (comment.isLiked) {
      likeButton.className = 'like-button active';
    } else {
      likeButton.className = 'like-button';
    }

    likeButton.dataset.id = comment.id;

    likes.appendChild(likesCounter);
    likes.appendChild(likeButton);
    footer.appendChild(likes);

    li.appendChild(header);
    li.appendChild(body);
    li.appendChild(footer);

    commentsList.appendChild(li);
  }
}

commentsList.addEventListener('click', function (e) {
  const likeButton = e.target.closest('.like-button');
  if (likeButton) {
    const commentId = parseInt(likeButton.dataset.id, 10);
    const comment = commentsData.find(c => c.id === commentId);
    if (!comment) return;

    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
    renderComments();
    return;
  }

  const commentElement = e.target.closest('.comment');
  if (!commentElement) return;

  const commentId = parseInt(commentElement.dataset.id, 10);
  const comment = commentsData.find(c => c.id === commentId);
  if (!comment) return;

  nameInput.value = comment.name;
  textInput.value = '> ' + comment.text;
  textInput.focus();
  validateFields();
});

function validateFields() {
  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  nameInput.classList.remove('error');
  textInput.classList.remove('error');

  let isValid = true;
  let errorMsg = '';

  if (!name) {
    nameInput.classList.add('error');
    isValid = false;
    errorMsg = 'Пожалуйста, укажите ваше имя';
  } else if (!text) {
    textInput.classList.add('error');
    isValid = false;
    errorMsg = 'Пожалуйста, введите текст комментария';
  }

  errorMessage.textContent = errorMsg;
  addButton.disabled = !isValid;

  return isValid;
}

function addComment() {
  const name = sanitizeHTML(nameInput.value.trim());
  const text = sanitizeHTML(textInput.value.trim());

  if (!name || !text) {
    validateFields();
    return;
  }

  const newComment = {
    id: nextId++,
    name: name,
    date: getCurrentDate(),
    text: text,
    likes: 0,
    isLiked: false
  };

  commentsData.push(newComment);
  renderComments();

  nameInput.value = '';
  textInput.value = '';
  addButton.disabled = true;
  errorMessage.textContent = '';
  nameInput.classList.remove('error');
  textInput.classList.remove('error');
  nameInput.focus();
}

nameInput.addEventListener('input', validateFields);
textInput.addEventListener('input', validateFields);
addButton.addEventListener('click', addComment);

nameInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    textInput.focus();
  }
});

textInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && e.ctrlKey) {
    e.preventDefault();
    addComment();
  }
});

renderComments();
validateFields();