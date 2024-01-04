

// Это блок для импорта функций________________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

// API Functions
import { functionGetArrComments } from "./modules/moduleAPI.js";
import { functionPostArrComments } from "./modules/moduleAPI.js";

// Mini Functions
import { letTime } from "./modules/moduleMiniFunctions.js";
import { errorTextChecking } from "./modules/moduleMiniFunctions.js";

// Rendering Functions
import { loadingStartFunctionButton } from "./modules/moduleRendering.js";
import { loadingСompleteFunctionButton } from "./modules/moduleRendering.js";

import { renderComments } from "./modules/moduleRendering.js";

import { replyCommentCondition } from "./modules/moduleRendering.js";
import { initDeleteReplyUserBox } from "./modules/moduleRendering.js";
import { initReplyClick } from "./modules/moduleRendering.js";

import { initCommentsLiked } from "./modules/moduleRendering.js";
import { usedLike } from "./modules/moduleRendering.js";



// |                                                                                                          |
// Это блок для импорта функций_______________________________________________________________________________|


// Это блок Присваивания имён элементам________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V
const buttonEvent = document.getElementById("add-form-button");
const boxComments = document.getElementById('comments');

const replyBox = document.getElementById('reply-box');
const replyComment = document.getElementById('add-form-reply');

const replyBoxUser = document.getElementById('reply-user-box');

const addFormUserName = document.getElementById('add-form-name');
const addFormUserText = document.getElementById('add-form-text');

// |                                                                                                          |
// Это блок Присваивания имён элементам_______________________________________________________________________|


// Это блок Получения и создания комментариев в HTML___________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

const fetchAndRenderArrComment = () => {
    functionGetArrComments().then((arrCommentsData) => {

        renderComments(arrCommentsData)
        initCommentsLiked(arrCommentsData);
        initReplyClick(arrCommentsData);
        loadingСompleteFunctionButton();

    });

};

// |                                                                                                          |
// Это блок Получения и создания комментариев в HTML__________________________________________________________|

// Это блок Создания и отправки элементов для массива комментариев_____________________________________________
// |                                                                                                          |
// V                                                                                                          V
const buttonEventClick = (replyUserComment) => {

    buttonEvent.addEventListener("click", () => {
  
      event.stopPropagation()
  
      addFormUserName.classList.remove("error");
      addFormUserText.classList.remove("error");
  
      if (addFormUserName.value === "") {
        addFormUserName.classList.add("error");
        return;
      };
  
      if (addFormUserText.value === "") {
        addFormUserText.classList.add("error");
        return;
      };
  
      let timeForFetch = letTime();
      let userNameForFetch = addFormUserName.value.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
      let userTextForFetch = addFormUserText.value.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");

        functionPostArrComments(timeForFetch, userNameForFetch, userTextForFetch).then((response) => {

            loadingСompleteFunctionButton();
            return response;
            
        }).then((responseData) => {
            if (responseData.status === 400) {
                throw new Error('Неверный запрос');
            }
            if (responseData.status === 500) {
                throw new Error('Ошибка сервера');
            };

            addFormUserName.value = "";
            addFormUserText.value = "";
            replyBox.innerHTML = ""; 

        }).then(() =>{

            fetchAndRenderArrComment();
            
        }).catch((error) => {
            if (error.message === "Ошибка сервера") {
    
                alert("Сервер сломался, попробуй позже");
    
            } else if (error.message === "Неверный запрос") {
    
                alert("Имя и комментарий должны быть не короче 3х символов");
    
            } else {
    
                alert("Что-то пошло не так, попробуй позже");
    
            };
    
            console.log(error);
            loadingСompleteFunctionButton();
        });
    });
};
// |                                                                                                          |
// Это блок Создания и отправки элементов для массива комментариев____________________________________________|

// Это блок для Внешнего запуска кода__________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

loadingStartFunctionButton();
fetchAndRenderArrComment();
buttonEventClick();

// |                                                                                                          |
// Это блок для Внешнего запуска кода_________________________________________________________________________|

