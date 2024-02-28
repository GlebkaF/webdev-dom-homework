import { getFetchModule, postFetchModule } from "./api.js";

const buttonAdd = document.getElementById('addButton');
const listElement = document.getElementById('list');
const inputElement = document.getElementById('nameInput');
const textareaElement = document.getElementById('commitInput');
let comments = [];

buttonAdd.disabled = true;
buttonAdd.textContent = "Обработка...";
getFetch();

const initEventListener = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', event => {
            event.stopPropagation();
            const index = likeButtonElement.dataset.index;
            if (!comments[index].isLiked) {
                comments[index].likes++;
                comments[index].isLiked = true;
            } else {
                comments[index].likes--;
                comments[index].isLiked = false;
            };
            renderComments();
        });
    }
}

const renderComments = () => {
    const listElement = document.getElementById('list');
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment">
      <div class="comment-header">
        <div class "commentName">${sanitizeHtml(comment.name)}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${sanitizeHtml(comment.text)}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">
            <div>${comment.likes}</div>
          </span>
          <button class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}" data-index =${index}>
            <div></div>
          </button>            
        </div>
      </div>
    </li>`
    }).join('');
    listElement.innerHTML = commentsHtml;

    initEventListener();
    commitAnswer();
};
renderComments();

buttonAdd.addEventListener('click', () => {
    const oldlistElement = listElement.innerHTML;
    if (inputElement.value === '' && textareaElement.value === '') {
        inputElement.style.backgroundColor = 'pink';
        textareaElement.style.backgroundColor = 'pink';
        return;
    } else if (inputElement.value === '') {
        inputElement.style.backgroundColor = 'pink';
        return;
    } else if (textareaElement.value === '') {
        textareaElement.style.backgroundColor = 'pink';
        return;
    } else {
        inputElement.style.backgroundColor = '';
        textareaElement.style.backgroundColor = '';
        postFetch();
    };
});

function sanitizeHtml(htmlString) {
    return htmlString.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
};

function commitAnswer() {
    const commentsAnswer = document.querySelectorAll('.comment');
    const formText = document.querySelector('.add-form-text');
    commentsAnswer.forEach((comment, index) => {
        comment.addEventListener('click', () => {
            formText.value = `└> ${comments[index].name} \n ${comments[index].text}`;
        })
    })
};

function getFetch() {
    getFetchModule().then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
            return {
                id: comment.id,
                name: comment.author.name,
                date: new Date(comment.date).toLocaleString('ru-RU', {
                    year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
                }).replace(',', ''),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            };
        });
        comments = appComments;
        renderComments();
    })
        .then(() => {
            buttonAdd.disabled = false;
            buttonAdd.textContent = "Написать";
            inputElement.value = '';
            textareaElement.value = '';
        })
        .catch((error) => {
            buttonAdd.disabled = false;
            buttonAdd.textContent = "Написать";
            alert(error.message);
        });
};

function postFetch() {
    buttonAdd.disabled = true;
    buttonAdd.textContent = "Добавляем комментарий...";
    postFetchModule().then((response) => {
        if (response.status === 400) {
            throw new Error('Имя или текст комментария короче 3-х символов');
        }
        if (response.status === 500) {
            throw new Error('Сервер покинул чат');
        }
    })
        .then((response) => {
            getFetch();
        })
        .catch((error) => {
            buttonAdd.disabled = false;
            buttonAdd.textContent = "Написать";
            alert(error.message);
        });
};

console.log("It works!");