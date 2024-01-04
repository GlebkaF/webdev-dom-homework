// Это блок для импорта функций________________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

// Mini Functions
import { letTime } from "./moduleMiniFunctions.js";
import { errorTextChecking } from "./moduleMiniFunctions.js";


// Rendering Functions
import { loadingStartFunctionButton } from "./moduleRendering.js";
import { loadingСompleteFunctionButton } from "./moduleRendering.js";

// |                                                                                                          |
// Это блок для импорта функций_______________________________________________________________________________|


// Это блок Получения Массива Комментариев_____________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V
export const functionGetArrComments = async () => {

    try {

        const response = await fetch("https://wedev-api.sky.pro/api/v1/dmitriy-aleksahin/comments", {
            method: "GET",
        });

        if (response.status === 500) {

            throw new Error('Ошибка сервера');
        };

        const responseData = await response.json();
        const arrComments = responseData.comments.map((comment) => {

            return {
                name: comment.author.name,
                date: comment.date,
                commentText: comment.text,
                numLike: comment.likes,
                liked: comment.isLiked,
                replyText: errorTextChecking(comment.replyText),
            };

        });
        return arrComments;
    } catch (error) {
        if (error.message === "Ошибка сервера") {

            alert("Сервер сломался, попробуй позже");

        } else {

            alert("Что-то пошло не так, попробуй позже");

        };

        console.log(error);
        loadingСompleteFunctionButton();
    }
  
  };
  
  // |                                                                                                          |
// Это блок Получения Массива Комментариев______________________________________________________________________|
  
// Это блок Отправления Массива Комментариев___________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V
export const functionPostArrComments = (timeForFetch, userNameForFetch, userTextForFetch) => {
        
        return fetch("https://wedev-api.sky.pro/api/v1/dmitriy-aleksahin/comments", {
            method: "POST",

            body: JSON.stringify({
                name: userNameForFetch,
                date: timeForFetch,
                text: userTextForFetch,
                likes: 0,
                isLiked: false,
                // replyText: userReplyText,
                forceError: true,
            }),
        });

        // replyUserComment = "";


};

  
// |                                                                                                          |
// Это блок Отправления Массива Комментариев__________________________________________________________________|
