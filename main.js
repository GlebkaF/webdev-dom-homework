import { getComments } from "./api.js";
import { renderLogin } from "./loginPage.js";
import { renderComments } from "./renderComments.js";



const fetchAndRenderComments = () => {
    getComments().then((responseData) => {

        const appComments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,

                date: new Date(comment.date),

                text: comment.text,
                like: comment.likes,

                isLiked: false,
                // isEdit: false,
                // isLoading: false,
            };
        });

        comments = appComments;

        renderComments({ comments, fetchAndRenderComments });
    })
}

renderLogin({ fetchAndRenderComments });

//        ОБРАБОТЧИК на LIKES,  РЕАЛИЗАЦИЯ ЛАЙКОВ

export const initLikesButtonListeners = () => {

    const buttonElements = document.querySelectorAll(".like-button");

    for (const buttonElement of buttonElements) {
        buttonElement.addEventListener("click", (event) => {

            event.stopPropagation();

            // индекс номер объекта в массиве, получаем из data-атрибута кнопки на к-ую нажимаем
            const index = buttonElement.dataset.index;
            //обращаемся к свойству isLiked объекта, к-ый получили из массивы comments по индексу
            if (comments[index].isLiked) {
                comments[index].isLiked = false;
                comments[index].like--;
            } else {
                comments[index].isLiked = true;
                comments[index].like++;
            }

            renderComments({ comments, fetchAndRenderComments });
        })

        renderComments({ comments, fetchAndRenderComments });

    }

}


//        РЕДАКТИРОВАНИЕ КОММЕНТАРИЕВ

export const initEditButtonListeners = () => {
    const buttonEditElements = document.querySelectorAll(".edit-comment");

    for (const buttonEditElement of buttonEditElements) {
        buttonEditElement.addEventListener("click", (event) => {
            event.stopPropagation();

            const index = buttonEditElement.dataset.index;
            const textarea = document.getElementById(`textarea-${index}`);


            if (comments[index].isEdit) {
                comments[index].isEdit = false;
                comments[index].text = textarea.value;

                renderComments({ comments, fetchAndRenderComments })
            } else {
                comments[index].isEdit = true;
            }

            renderComments({ comments, fetchAndRenderComments });
        })
    }
}

//  Homework 2.11

//        Ответы на комменты

export const initEditCommentListeners = () => {
    const answerElements = document.querySelectorAll(".comment");


    for (const answerElement of answerElements) {

        answerElement.addEventListener('click', () => {

            const index = answerElement.dataset.index;

            const text = answerElement.dataset.text;
            const name = answerElement.dataset.name;

            // когда нажимаю = &{comment.text} должен появляться в commentInputElement (тексте добавления комментариев)
            // commentInputElement.value = `> ${text} \n ${name}, `;

            if (comments[index].isEdit === false) {

                commentInputElement.value = `BEGIN_QUOTE ${text} ${name} QUOTE_END`;

                renderComments({ comments, fetchAndRenderComments });

            }

        })
    }
}



//        ФОРМИРОВАНИЕ НОВОГО СПИСКА КОММЕНТОВ

let comments = [];


fetchAndRenderComments();
renderComments({ comments, fetchAndRenderComments });



// //       РЕАЛИЗАЦИЯ - КНОПКА УДАЛИТЬ

const buttonDelComment = document.getElementById("del-comment");


buttonDelComment.addEventListener('click', () => {

    let lastComment = listElement.lastChild;
    lastComment.parentNode.removeChild(lastComment);

})


console.log("It works!");