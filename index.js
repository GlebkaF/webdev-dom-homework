import { addComment, fetchGet, commentaries } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";
//import { formatDateToSw } from "./lib/formatDate/formatDate.js";
import { format } from "date-fns";



//export let commentaries = [];

//let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

export let token = null;
export const commentsLoad = document.querySelector(".comments-load");
fetchGet ();
const appEl = document.getElementById('app');
export function renderApp  ()  {
    
    if(!token) {
        const commentsHtml = commentaries.map((comment, index) => {
            const createDate = format(new Date(comment.date), 'yyyy-MM-dd HH.mm.ss');
            return `<li class="comment" data-id='${comment.id}'>
                  <div class="comment-header">
                    <div>${comment.name}</div>
                    <div>
                    ${createDate}
                    </div>
                  </div>
                  <div class="comment-body">
                    <div class="comment-text">
                      ${comment.text}
                    </div>
                  </div>
                  <div class="comment-footer">
                    <div class="likes">
                      <span class="likes-counter" data-id='${comment.id}'>${commentaries[index].likes}</span>
                      <button 
                      class="like-button ${comment.isLiked ? '-active-like' : ''}" 
                      data-index='${index}'>
                      </button>
                    </div>
                  </div>
                </li>`;
            }).join('');
        
              const appHtml = `
                  <div class="container">
                  <div class="comments-load">
                  Данные загружаются, пожалуйста подождите...
                  </div>
                  <ul class="comments">
                    <!-- add by js --->
                    ${commentsHtml}
                  </ul>
                  <div>Чтобы добавить комментарий <span class="link"> авторизуйтесь</span></div>
                </div>`;
        
              appEl.innerHTML = appHtml;
        
              document.querySelector('.link').addEventListener("click", () => {
                renderLoginComponent({ 
                  appEl, 
                  setToken: (newToken) => {token = newToken;},
                  fetchGet,
                  renderApp
                });
              });
            } else {
                const commentsHtml = commentaries.map((comment, index) => {
                  const createDate = format(new Date(comment.date), 'yyyy-MM-dd HH.mm.ss');
                    return `<li class="comment" data-id='${comment.id}'>
                    <div class="comment-header">
                      <div>${comment.name}</div>
                      <div>${createDate}
                      </div>
                    </div>
                    <div class="comment-body">
                      <div class="comment-text">
                        ${comment.text}
                      </div>
                    </div>
                    <div class="comment-footer">
                      <div class="likes">
                        <span class="likes-counter" data-id='${comment.id}'>${commentaries[index].likes}</span>
                        <button 
                        class="like-button ${comment.isLiked ? '-active-like' : ''}" 
                        data-index='${index}'>
                        </button>
                      </div>
                    </div>
                  </li>`;
                }).join('');
            
                  const appHtml = `
                        <div class="container">
                
                        <div class="comments-load">
                        Данные загружаются, пожалуйста подождите...
                        </div>
                        <ul class="comments">
                          <!-- add by js --->
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
                            <button class="add-form-button id="add-button">Написать</button>
                            <button class="delete-form-button" id="delete-form-button">Удалить последний комментарий</button>
                          </div>
                        </div>
                      </div>`;
            
                  appEl.innerHTML = appHtml; 
                    let buttonElement = document.querySelector(".add-form-button");
                    let nameInputElement = document.querySelector(".add-form-name");
                    let commentInputElement = document.querySelector(".add-form-text");
                //const comment = document.getElementsByTagName('li');
                    let deleteFormButtonElement = document.querySelector(".delete-form-button");
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
            
        });
    }  
};

renderApp();