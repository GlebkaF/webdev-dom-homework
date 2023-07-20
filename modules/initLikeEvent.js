import { likeComment } from "./api.js";
import { fetchGet } from "./fetchGet.js";
import { renderListElement } from "./renderListElement.js";

export const initLikeEvent = ({ listElementData }) => {
    for (const likeButton of document.querySelectorAll('.like-button')) {
        likeButton.addEventListener('click', () => {
            event.stopPropagation();

            const id = likeButton.dataset.id;

            likeComment({id})
            .then((responseData) => {
                console.log(responseData);
    
                return fetchGet({ listElementData });
            })
            .catch((error) => {
                if (error.message === 'Неавторизованные пользователи не могут ставить лайки') {
                  alert('Неавторизованные пользователи не могут ставить лайки');
                }
                else {
                  alert("Кажется, у вас сломался интернет, попробуйте позже");
                }
                console.warn(error);
              });
            
            renderListElement({ listElementData });
        })
    }
}