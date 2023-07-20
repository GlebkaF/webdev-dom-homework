import { deleteComment } from "./api.js";
import { fetchGet } from "./fetchGet.js";
import { renderListElement } from "./renderListElement.js";

export const initDeleteEvent = ({ listElementData }) => {
    for (const deleteButton of document.querySelectorAll('.delete-button')) {
        deleteButton.addEventListener('click', () => {
            event.stopPropagation();
            const id = deleteButton.dataset.id;

            deleteComment({ id })
            .then((responseData) => {
                console.log(responseData);
    
                return fetchGet({ listElementData });
            })
            .catch((error) => {
                if (error.message === 'Неавторизованные пользователи не могут удалять комментарии') {
                  alert('Неавторизованные пользователи не могут удалять комментарии');
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