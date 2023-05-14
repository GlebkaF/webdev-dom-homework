//обЪявляем переменные
const container = document.querySelector('.container');
const commentList = document.querySelector('.comments');
const addForm = document.querySelector('.add-form');
const userName = document.querySelector('.add-form-name');
const textCommment = document.querySelector('.add-form-text');
const button = document.querySelector('.add-form-button');
const comments = document.querySelectorAll('.comment');
const commentsListArray = [
    {
        name: "Глеб Фокин",
        date: "12.02.22 12:18",
        msg: "Это будет первый комментарий на этой странице",
        like: "3",
        Iliked: false,
    },
    {
        name: "Варвара Н.",
        date: "13.02.22 19:22",
        msg: "Мне нравится как оформлена эта страница! ❤",
        like: "75",
        Iliked: false,
    },
    {
        name: "Евген",
        date: "01.05.23 13:01",
        msg: "Ничего не понимаю , но интересно ",
        like: "1",
        Iliked: true,
    }
];

const addLikes = (e) => {
  const comment = commentsListArray[e.target.dataset.id];
  comment.like++;
  comment.Iliked = true;
}

const delLikes = (e) => {
  const comment = commentsListArray[e.target.dataset.id];
  comment.like--;
  comment.Iliked = false;
}

const initLikeClick = () => {
  const likeClickElements = document.querySelectorAll('.likes');
  for (const likeClickElement of likeClickElements) {
    likeClickElement.addEventListener('click', (e) => {
      e.stopPropagation();
      (commentsListArray[e.target.dataset.id].Iliked) ? delLikes(e) : addLikes(e);
      renderComments();
    });
  }
}

const editClick = () => {
    const editClickElements = document.querySelectorAll('.edit-comment');

    for (const editClickElement of editClickElements) {
        editClickElement.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const fragment = document.createDocumentFragment();
            const popap = document.createElement('div');
            popap.classList.add('popap');
            container.appendChild(popap);
            const popapTextarea = document.createElement('textarea');
            popapTextarea.classList.add('editText')
            popapTextarea.textContent = commentsListArray[id].msg;
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Сохранить';
            saveButton.classList.add('save_button');
            fragment.appendChild(popapTextarea);
            fragment.appendChild(saveButton);
            popap.appendChild(fragment);
            saveEditComment(id,popap);
        });
    }
}

const delClick = () => {
    const delClickElements = document.querySelectorAll('.del-comment');
    for (const delClickElement of delClickElements) {
        delClickElement.addEventListener('click', (e) => {
            commentsListArray.splice(e.target.dataset.id, 1);
            renderComments();
        });
    }
}

function saveEditComment(id,popap) {
    const saveButtonClick = document.querySelector('.save_button');
    saveButtonClick.addEventListener('click', (e) => {
        const editText = document.querySelector('.editText');
        if (editText.value.length > 10) {
            commentsListArray[id].msg = editText.value;
            popap.remove();
            renderComments();
        }
    })
}

function renderComments() {
    const commentHtmlResult = commentsListArray.map((comment, id) => {
        (comment.Iliked) ? Iliked = '-active-like' : Iliked = '';
        return `<li class="comment" data-id="${id}">
          <div class="comment-header">
            <div>${comment.name}</div>      
            <div>${comment.date}</div>   
          </div>
          <div class="comment-body">
            <div class="comment-text" data-id="${id}">
              ${comment.msg}
            </div>
          </div>
          <div class="comment-footer">

            <div class="likes">
              <span class="likes-counter" >${comment.like}</span>
              <button class="like-button ${Iliked}" data-id="${id}"></button>
            </div>
            <div class="edit-comment"><span data-id="${id}" title="Редактировать">&#9998;</span></div>
            <div class="del-comment"><span data-id="${id}" title="Удалить">&#10008;</span></div>
          </div>
        </li>`;
    }).join("");
    commentList.innerHTML = commentHtmlResult;
    initLikeClick();
    editClick();
    delClick();
}

function validate() {
    if (userName.value.length === 0) {
        userName.classList.add('error');
    } else { userName.classList.remove('error'); }
    if (textCommment.value.length < 10) {
        textCommment.classList.add('error');
        return false;
    } else { textCommment.classList.remove('error'); }

    if (userName.value.length > 0 && textCommment.value.length >= 10) {
        return true;
    }
    else {
        return false;
    }
}

function addComment() {
    const validate = validate();
    const date = new Date();
    if (validate) {
        commentsListArray.push({
            name: userName.value,
            date: dateFormat(),
            msg: textCommment.value,
            like: 0,
        });

        renderComments();
        textCommment.value = ""; 
        button.setAttribute('disabled', '');
    }
}

button.addEventListener('click', (event) => {
    addComment();
});

addForm.addEventListener('input', (event) => {
    const validate = valiate();
    (validate) ? button.removeAttribute('disabled') : button.setAttribute('disabled', '');
});

addForm.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.keyCode == 13) { addComment(); }
});

function dateFormat() {
    const date = new Date();
    (date.getDate() < 10) ? dd = '0' + date.getDate() : dd = date.getDate();
    (date.getMonth() < 10) ? MM = '0' + (date.getMonth() + 1) : MM = (date.getMonth() + 1);
    (date.getFullYear()) ? YY = date.getFullYear().toString().slice(-2) : YY = date.getFullYear().toString().slice(-2);
    (date.getHours() < 10) ? hh = '0' + date.getHours() : hh = date.getHours();
    (date.getMinutes() < 10) ? mm = '0' + date.getMinutes() : mm = date.getMinutes();
    return `${dd}.${MM}.${YY} ${hh}:${mm}`;
}

renderComments();