
import {renderComments} from "./renderComments.js";
// Функция Обработка кликов лайков в комментарии
export const likeElementfunction = ({comments, renderComments}) => {
    
    const likesElements = document.querySelectorAll(".like-button");
    for (const likeElement of likesElements) {

        likeElement.addEventListener("click", () => {
            
            const index = likeElement.dataset.index;
            if (comments[index].icon === false) {
                comments[index].icon = true;
                comments[index].likes += 1;
            }
            else {
                comments[index].icon = false;
                comments[index].likes -= 1;
            }
            // Добавить импорты функций
             renderComments(comments);
            
        });
    };
};