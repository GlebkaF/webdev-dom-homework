
import { allUsersAndComments } from "./index.js"
import { addComment, loginUser, registerUser } from "./api.js";
const listComments = document.getElementById("list-comments");
const formAddComments = document.getElementById("add-comments");
export let token = null;
export const renderUsers = () => {
    
    const usersHtml = allUsersAndComments.map((user, index) => {
        return `<li class="comment">
<div class="comment-header">
  <div class="name-user">${user.author.name}</div>
  <div>${user.date}</div>
</div>
<div class="comment-body">
  <div class="comment-text">
    ${user.text}
  </div>
</div>
<div class="comment-footer">
  <div class="likes">
    <span class="likes-counter">${user.likes}</span>
    <button class="${user.isLiked ? 'like-button -active-like' : 'like-button'}" data-index=${index}></button>
  </div>
</div>
</li>`;
    })
        .join("")
    listComments.innerHTML = usersHtml;

if (!token) {
    loginOrReg()
} else{
    formAdd();
    refresh();
}



};
// formLogin()



export function formAdd()  {
    const commentsHtml = ` <textarea id="input-text" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
    rows="4"></textarea>
<div class="add-form-row">
    <button class="add-form-button" id="button-enter">Написать</button>
</div>`;
formAddComments.innerHTML = commentsHtml;
const buttonEnter = document.getElementById("button-enter");
const nameText = document.getElementById("input-name");
const text = document.getElementById("input-text");
const option = {
    hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'
};
buttonEnter.addEventListener("click", () => {
    addComment({buttonEnter, nameText, text, option, token })
});
}
let loginRegMode = true;


function loginOrReg() {













    formAddComments.innerHTML =     `<h2 class="form-enter">Форма ${loginRegMode ? 'входа' : 'регистрации'}</h2>

    <div class="add-form-top">
    ${loginRegMode ? '' : `<input id="name-reg" type="text" class="add-form-enter" placeholder="Ваше имя" />`}
                            
    <input id="name-user" type="text" class="add-form-enter" placeholder="Ваш логин" />
    <input id="password-name" type="password" class="add-form-enter" placeholder="Ваш пароль" />
    </div>
    <div class="add-form-row">
    <button class="add-form-button" id="button-enter-login">${loginRegMode ? 'Войти' : 'зарегистрировать'}</button>

    <button class="add-form-button" id="toggle-button">перейти ${loginRegMode ? 'к регистрации' : 'ко входу'}</button>
    </div>`;
    document.getElementById("toggle-button").addEventListener("click", () => {
        loginRegMode = !loginRegMode;
        renderUsers();
    });
    document.getElementById("button-enter-login").addEventListener("click", () => {
        const login = document.getElementById("name-user").value;
        const password = document.getElementById("password-name").value;
        if (loginRegMode === true) {

            if (!login) {
                alert('Введите логин');
            };
            if (!password) {
                alert("Введите Пароль")
            }
            loginUser({ 
                login: login,
                password: password
            })
            .then((user) => {             
                setToken(`Bearer ${user.user.token}`);
                renderUsers();
            })
            .catch(error => {
                alert(error.message)
            })
        } else {
            const name = document.getElementById("name-reg").value;
            if (!login) {
                alert('Введите логин');
            };
            if (!password) {
                alert("Введите Пароль");
            }
            if (!name) {
                alert("Введите Имя");
            }
            registerUser({
                login: login,
                password: password,
                name: name,
            }).then((user) => {

                setToken(`Bearer ${user.user.token}`);
                renderUsers();
            }).catch(error => {
                // TODO: 
                alert(error.message)
            })
        }
        
    })
};

 function setToken(newToken) {
    token = newToken;
}

function refresh() {

    const likesUp = document.querySelectorAll(".like-button");
    for (const likeUp of likesUp) {
        likeUp.addEventListener('click', (event) => {
            event.stopPropagation();
            let found = allUsersAndComments[likeUp.dataset.index];
            if (found.isLiked) {

                found.likes--;
                found.isLiked = false;

            } else {

                found.likes++;
                found.isLiked = true;

            };
            renderUsers();
        });

    };


}


