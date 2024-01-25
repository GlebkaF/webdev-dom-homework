

// Это блок для импорта функций________________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

// API Functions
import { functionGetArrComments } from "./modules/moduleAPI.js";
import { functionPostArrComments } from "./modules/moduleAPI.js";
import { functionPostAuthorization } from "./modules/moduleAPI.js";
import { registeredUser, initNewRegisteredUser, token, initNewToken } from "./modules/moduleAPI.js";

// Mini Functions
import { letTime } from "./modules/moduleMiniFunctions.js";
import { errorTextChecking } from "./modules/moduleMiniFunctions.js";

// Rendering Functions
import { renderCommentsContainer } from "./modules/moduleRendering.js";

import { loadingStartFunctionButton } from "./modules/moduleRendering.js";
import { loadingСompleteFunctionButton } from "./modules/moduleRendering.js";

import { renderComments } from "./modules/moduleRendering.js";

import { replyCommentCondition } from "./modules/moduleRendering.js";
import { initDeleteReplyUserBox } from "./modules/moduleRendering.js";
import { initReplyClick } from "./modules/moduleRendering.js";

import { initCommentsLiked } from "./modules/moduleRendering.js";
import { usedLike } from "./modules/moduleRendering.js";

import { userPlaceholderName, renderEntranceContainer } from "./modules/moduleRendering.js";

// Node_Module functions

import { format } from "date-fns";

// |                                                                                                          |
// Это блок для импорта функций_______________________________________________________________________________|


// Это блок Создания страницы комментариев_____________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

renderCommentsContainer(userPlaceholderName());

// |                                                                                                          |
// Это блок Создания страницы комментариев____________________________________________________________________|


// Это блок Присваивания имён элементам и их Экспорта в другие модули__________________________________________
// |                                                                                                          |
// V                                                                                                          V
export let buttonEvent = document.getElementById("add-form-button");
export let boxComments = document.getElementById('comments');

export let replyBox = document.getElementById('reply-box');
export let replyComment = document.getElementById('add-form-reply');

export let replyBoxUser = document.getElementById('reply-user-box');

export let addFormUserName = document.getElementById('add-form-name');
export let addFormUserText = document.getElementById('add-form-text');

export let entranceButtom = document.getElementById('entrance-button');



// |                                                                                                          |
// Это блок Присваивания имён элементам и их Экспорта в другие модули_________________________________________|


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
    
    if (registeredUser === undefined) {

       return
        
    } else {

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
        
            let timeForFetch = format(new Date, `yyyy-MM-dd hh:mm`);
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
                }
                if (responseData.status === 401) {
                    throw new Error('Не авторизирован');
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
                
                } else if (error.message === 'Не авторизирован') {
                
                    alert("Чтобы оставить комментарий, нужно авторизироваться");
                
                } else {
                
                    alert("Что-то пошло не так, попробуй позже");
                
                };
            
                console.log(error);
                loadingСompleteFunctionButton();

            });
        });
    };   
};
// |                                                                                                          |
// Это блок Создания и отправки элементов для массива комментариев____________________________________________|


// Это блок для Перехода на страницу Авторизации_______________________________________________________________
// |                                                                                                          |
// V                                                                                                          V
const buttonEntranceClick = () => {
    if (registeredUser === undefined) {

        return entranceButtom.addEventListener("click", () => {
  
            event.stopPropagation();
    
            renderEntranceContainer();
            authorizationUser()
            buttonCommentsClick();

        });
         
    } else {

        return

    };
};      
// |                                                                                                          |
// Это блок для Перехода на страницу Авторизации______________________________________________________________|


// Это блок для Перехода на страницу Комментариев______________________________________________________________
// |                                                                                                          |
// V                                                                                                          V
const buttonCommentsClick = () => {

    const commentsButtom = document.getElementById('link-to-tasks');

    commentsButtom.addEventListener("click", () => {
  
        event.stopPropagation();

        loadingStartFunctionButton();

        functionGetArrComments().then((arrCommentsData) => {

            renderCommentsContainer(userPlaceholderName());

            buttonEvent = document.getElementById("add-form-button");
            boxComments = document.getElementById('comments');
            
            replyBox = document.getElementById('reply-box');
            replyComment = document.getElementById('add-form-reply');
            
            replyBoxUser = document.getElementById('reply-user-box');
            
            addFormUserName = document.getElementById('add-form-name');
            addFormUserText = document.getElementById('add-form-text');
            
            entranceButtom = document.getElementById('entrance-button');

            renderComments(arrCommentsData)
            initCommentsLiked(arrCommentsData);
            initReplyClick(arrCommentsData);

            buttonEventClick();
            buttonEntranceClick();

            loadingСompleteFunctionButton();

        });
    });

};      
// |                                                                                                          |
// Это блок для Перехода на страницу Комментариев_____________________________________________________________|


// Это блок Авторизации________________________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

const authorizationUser = () => {

    const authorizationButton = document.getElementById("login-button");
    const passwordInput = document.getElementById("password-input");
    const loginInput = document.getElementById("login-input");

    authorizationButton.addEventListener("click", () => {

        event.stopPropagation();
        
        let userLogin = loginInput.value.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
        let userPassword = passwordInput.value.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");

        functionPostAuthorization(userLogin, userPassword).then((Data) => {

            initNewRegisteredUser(Data)

            functionGetArrComments().then((arrCommentsData) => {

                renderCommentsContainer(userPlaceholderName());

                buttonEvent = document.getElementById("add-form-button");
                boxComments = document.getElementById('comments');

                replyBox = document.getElementById('reply-box');
                replyComment = document.getElementById('add-form-reply');

                replyBoxUser = document.getElementById('reply-user-box');

                addFormUserName = document.getElementById('add-form-name');
                addFormUserText = document.getElementById('add-form-text');

                entranceButtom = document.getElementById('entrance-button');

                renderComments(arrCommentsData)
                initCommentsLiked(arrCommentsData);
                initReplyClick(arrCommentsData);

                buttonEventClick();
                buttonEntranceClick();

                loadingСompleteFunctionButton();

            });

            return registeredUser;

        });


    });

}

// |                                                                                                          |
// Это блок Авторизации_______________________________________________________________________________________|


// Это блок для Внешнего запуска кода__________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V
loadingStartFunctionButton();
fetchAndRenderArrComment();
buttonEventClick();
buttonEntranceClick();
// console.log(format(new Date, `yyyy-MM-dd hh:mm`));
// |                                                                                                          |
// Это блок для Внешнего запуска кода_________________________________________________________________________|
//  Пожалуйста работай!    