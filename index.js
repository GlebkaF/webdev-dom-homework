import { getFetchComments, addComment } from "./api.js";
import { renderComments } from "./renderComments.js";
import { delay } from "./utils.js";

// const name = document.getElementById("name-input");
// const text = document.getElementById("text-input");



let comments = [];

let isStarting = true;
let isPosting = false;



getFetchComments()
  .then((data) => delay(data))
  .then((data) => {
    comments = data;
    isStarting = false;
    renderComments(app, isPosting, isStarting, comments);
  })
  .catch((error) => {
    alert(error.message);
  });

renderComments(app, isPosting, isStarting, comments);

const addButton = document.getElementById("add-button");

const handlePostClick = () => {
  if (!name.value || !text.value) {
    alert("Заполните форму");
    return;
  }

  isPosting = true;
  document.querySelector(".form-loading").style.display = "block";
  document.querySelector(".add-form").style.display = "none";
  renderComments(app, isPosting, isStarting, comments);

  addComment(text.value, name.value)
    .then((data) => {
      name.value = "";
      text.value = "";
      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".add-form").style.display = "flex";
      isPosting = false;
      comments = data;
      renderComments(app, isPosting, isStarting, comments);
    })
    .catch((error) => {
      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".add-form").style.display = "flex";
      isPosting = false;

      if (error.message === "Ошибка сервера") {
        handlePostClick();
        alert("Сервер сломался, попробуй позже");
      }

      if (error.message === "Неверный запрос") {
        alert("Имя и комментарий должны быть не короче 3х символов");

        name.classList.add("-error");
        text.classList.add("-error");
        setTimeout(() => {
          name.classList.remove("-error");
          text.classList.remove("-error");
        }, 2000);
      }
    });

  renderComments(app, isPosting, isStarting, comments);
};

// addButton.addEventListener("click", handlePostClick);











/*import { addComment, getFetchComments } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";


let commentaries = [];

//let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
let token = null;
const commentsLoad = document.querySelector(".comments-load");
const fetchGet = () => {

    commentsLoad.style.display = "block";
    //listElement.style.display = "none";
    return getFetchComments({ token })
    .then((responseData) => {
        const appComments = responseData.comments
        .map((comment) => {
            return {
                name: comment.author.name,
                date: new Date(Date.parse(comment.date)).toLocaleDateString() + ' ' + new Date(Date.parse(comment.date)).getHours() + ':' + new Date(Date.parse(comment.date)).getMinutes(),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
                id: comment.id,
            };
        
        });
        return appComments;
    })
    .then((data) => {
        commentsLoad.style.display = "none";
        //listElement.style.display = "flex";
        commentaries = data;
        renderApp();
    });
        

      
};
const appEl = document.getElementById('app');
const renderApp = () => {
    
    if(!token) {
        /*const appHtml = `
        <div class="container">
          <div class="add-form">
            <h3 class="form-title">Форма входа</h3>
            <div class="form-row">
              Логин    
              <input id="login-input" type="text" class="add-form-name"/>
              <br />
              <br />
              Пароль
              <input id="login-input" type="text" class="add-form-name"/>
            </div>
            <br />
            <button id='login-button' class="add-form-button">Войти</button>
        </div>`
          
        appEl.innerHTML = appHtml;

        
        document.getElementById("login-button").addEventListener("click", () => {
            token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
            
            fetchGet();
            //renderApp();
        })*/
        /*renderLoginComponent({ appEl, setToken: (newToken) => {
            token = newToken;
        },
        fetchGet,
     });    
        return;
}
    
    const commentsHtml = commentaries.map((comment, index) => {
        if(comment.isLiked) {
          return `<li  class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
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
              <button data-index="${index}"  class="like-button -active-like"></button>
            </div>
          </div>
        </li>`;
        } else {
          return `<li  class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
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
              <button data-index="${index}" data-likes=${comment.likes} class="like-button"></button>
            </div>
          </div>
        </li>`;
        }
    }).join("");
        //console.log(commentsHtml);
        const appHtml = `
        <div class="container">
          
          <ul id="list" class="comments">
            <!-- <li   class="comment">
              <div class="comment-header">
                <div>Глеб Фокин</div>
                <div>12.02.22 12:18</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  Это будет первый комментарий на этой странице
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span  class="likes-counter">3</span>
                  <button data-likes="3" class="like-button"></button>
                </div>
              </div>
            </li>
            <li  class="comment">
              <div class="comment-header">
                <div>Варвара Н.</div>
                <div>13.02.22 19:22</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  Мне нравится как оформлена эта страница! ❤
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">75</span>
                  <button data-likes="75" class="like-button -active-like"></button>
                </div>
              </div>
            </li> -->
            ${commentsHtml}
          </ul>
          <div class="add-form">
            <input id="name-input"
              type="text"
              class="add-form-name"
              placeholder="Введите ваше имя"
            />
            <textarea id="comment-input"
              type="textarea"
              class="add-form-text"
              placeholder="Введите ваш коментарий"
              rows="4"
            ></textarea>
            <div class="add-form-row">
              <button id='add-button' class="add-form-button">Написать</button>
              <button class = "delete-form-button" id="delete-form-button">Удалить последний комментарий</button>
            </div>
          </div>
    </div>`
        appEl.innerHTML = appHtml;
        const buttonElement = document.getElementById('add-button');
        const listElement = document.getElementById("list");
        const nameInputElement = document.getElementById("name-input");
        const commentInputElement = document.getElementById("comment-input");
        const comment = document.getElementsByTagName('li');
        const deleteFormButtonElement = document.getElementById("delete-form-button");
        //const commentsLoad = document.querySelector(".comments-load");

        const initLikeButtonListeners = () => {
            const likesElements = document.querySelectorAll(".like-button");
          //console.log(likesElements);
            for (const likeElement of likesElements) {
              //console.log(likeElement);
              likeElement.addEventListener ("click", (event) => {
                event.stopPropagation();
                //const likes = likeElement.dataset.likes
                //console.log(likes);
                const index = likeElement.dataset.index;
                //console.log(index);
        
                if(commentaries[index].isLiked) {
                  commentaries[index].isLiked = !commentaries[index].isLiked;
                  commentaries[index].likes -= 1;
                  renderApp();
                  //initLikeButtonListeners();
                  //initCommentsListeners();
                } else {
                  commentaries[index].isLiked = !commentaries[index].isLiked;
                  commentaries[index].likes += 1;
                  renderApp();
                  //initLikeButtonListeners();
                  //initCommentsListeners();
                }
        
              });
            }
        };

        

        const fetchPost = () => {
           addComment({ name: nameInputElement.value, text: commentInputElement.value, token})
            .then((responseData) => {
                //comments = appComments;
                console.log(responseData);
                //fetchGet();
                renderApp();
                //initLikeButtonListeners();
            })
            .then((data) => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Написать";
                nameInputElement.value = "";  
                commentInputElement.value = ""; 
                fetchGet();
                renderApp();
                console.log(data);
            })
            .catch((error) => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Написать";
                if(!navigator.onLine) {
                  alert("Кажется что-то пошло не так, попробуй позже");
                }
                
                console.warn(error);
            });
        };
        



        buttonElement.addEventListener("click",() => {
            fetchPost();
            initLikeButtonListeners();
            nameInputElement.classList.remove("error");
            buttonElement.classList.remove("disabled");
            if (nameInputElement.value === "") {
                nameInputElement.classList.add("error");
                buttonElement.classList.add("disabled");
                return;
            };
            commentInputElement.classList.remove("error");
            if (commentInputElement.value === '') {
                commentInputElement.classList.add("error");
                buttonElement.classList.add("disabled");
                return;
            };
          });
          initLikeButtonListeners();
       

        deleteFormButtonElement.addEventListener("click", () => {
            commentaries.pop();
            renderApp();
            initLikeButtonListeners();
            
        })
        
};

renderApp();*/