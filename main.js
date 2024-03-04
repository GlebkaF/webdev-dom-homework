const buttonAdd = document.getElementById('addButton');
const authorizedForm = document.getElementById('authorizedAddForm');
const listElement = document.getElementById('list');
const inputElement = document.getElementById('nameInput');
const textareaElement = document.getElementById('commitInput');
const toAuthorizationButton = document.getElementById('toAuthorizationButton');
const loginArea = document.getElementById('loginInput');
const passwordArea = document.getElementById('passwordInput');
const notAuthorizedForm = document.getElementById('notAuthorized');
const regForm = document.getElementById('registration');
const regNameInput = document.getElementById('regName');
const regLoginInput = document.getElementById('regLogin');
const regPasswordInput = document.getElementById('regPassword');
const regBtn = document.getElementById('confirmRegBtn');
const autorizationForm = document.getElementById('autorization');
const authConfirmButton = document.getElementById('authorizationConfirmButton');
const toRegBtn = document.getElementById('toRegBtn');
const authLoginInput = document.getElementById('loginInput');
const authPasswordInput = document.getElementById('passwordInput');
const host = "https://wedev-api.sky.pro/api/v2/:aleksandr-penkov/comments";
const authHost = "https://wedev-api.sky.pro/api/user";
document.getElementById('notAuthorizednameInput').readOnly = true;
document.getElementById('notAuthorizedcommitInput').readOnly = true;
document.getElementById('nameInput').readOnly = true;

let comments = [];
let user;

document.getElementById('toAuthorizationButton').disabled = true;
document.getElementById('toAuthorizationButton').textContent = "Обработка...";
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

toAuthorizationButton.addEventListener('click', () => {
    listElement.style.display = 'none';
    notAuthorizedForm.style.display = 'none';
    autorizationForm.style.display = 'block';
});

authConfirmButton.addEventListener('click', () => {
    if (authLoginInput.value === '' && authPasswordInput.value === '') {
        authLoginInput.style.backgroundColor = 'pink';
        authPasswordInput.style.backgroundColor = 'pink';
        alert('Укажите Логин и Пароль')
        return;
    } else if (authLoginInput.value === '') {
        authLoginInput.style.backgroundColor = 'pink';
        alert('Укажите Логин')
        return;
    } else if (authPasswordInput.value === '') {
        authPasswordInput.style.backgroundColor = 'pink';
        alert('Укажите Пароль')
        return;
    };
    authFetch()
});

toRegBtn.addEventListener('click', () => {
    autorizationForm.style.display = 'none';
    regForm.style.display = 'block';
});

regBtn.addEventListener('click', () => {
    if (regNameInput.value === '' || regLoginInput.value === '' || regPasswordInput.value === '') {
        alert('Заполните все поля')
        return;
    };
    regFetch()
        .then(
            alert('Регистрация прошла успешно. Используйте указанный при регистрации Логин и Пароль для авторизации.')
        );
    autorizationForm.style.display = 'block';
    regForm.style.display = 'none';
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
    return fetch(host, {
        method: "GET"
    })
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
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
            document.getElementById('toAuthorizationButton').disabled = false;
            document.getElementById('toAuthorizationButton').textContent = "Авторизация";
            inputElement.value = '';
            textareaElement.value = '';
        })
        .catch((error) => {
            document.getElementById('toAuthorizationButton').disabled = false;
            document.getElementById('toAuthorizationButton').textContent = "Авторизация";
            alert(error.message);
        });
};

function postFetch() {
    buttonAdd.disabled = true;
    buttonAdd.textContent = "Добавляем комментарий...";
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text: textareaElement.value
                .replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            name: inputElement.value
                .replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        })
    })
        .then((response) => {
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
function authFetch() {
    fetch(authHost + '/login', {
        method: "POST",
        body: JSON.stringify({
            login: loginArea.value,
            password: passwordArea.value
        })
    })
        .then((response) => {
            console.log(response);
            if (response.status === 400) {
                throw new Error('Неверное имя пользователя или пароль')
            }
        })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            alert(error.message);
        });
}

function regFetch() {
    return fetch(authHost, {
        method: "POST",
        body: JSON.stringify({
            login: document.getElementById('regLogin').value,
            password: document.getElementById('regPassword').value,
            name: document.getElementById('regName').value
        })
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Пользователь с таким логином уже существует')
            }
        })
        .then((response) => {
            response.json();
        })
        .then((responseData) => {
            const appUser = responseData.users.map((user) => {
                return {
                    name: user.name,
                    token: user.token
                }
            });
            user = appUser;
            console.log(user);
        })
        .catch((error) => {
            alert(error.message);
        });
}

// function userFetch() {
//     return fetch(authHost)
//         .then((response) => {
//             console.log(response.json());
//         });
// }
// userFetch()
console.log("It works!");