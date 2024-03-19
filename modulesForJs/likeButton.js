// Кнопка для лайка 

export function initLikeButtonListeners({ comments, renderComments, reply, removeValidation, delay }) {

    const addLikesButtonsElements = document.querySelectorAll('.like-button');


    for (const addLikesButtonsElement of addLikesButtonsElements) {

        const index = addLikesButtonsElement.dataset.index;
        const counter = addLikesButtonsElement.dataset.like;

        addLikesButtonsElement.addEventListener('click', () => {

            addLikesButtonsElement.classList.add('-loading-like')

            delay(4000).then(() => {

                if (comments[index].isLiked === false) {

                    const result = Number(counter) + 1;
                    comments[index].likesCounter = result;

                    comments[index].isLiked = true;

                } else {

                    if (comments[index].likesCounter === 0) {

                        comments[index].likesCounter = 0;

                        comments[index].isLiked = false;

                    } else {

                        comments[index].likesCounter = Math.max(0, comments[index].likesCounter - 1);

                        comments[index].isLiked = false;
                    };
                };
                renderComments({ comments, initLikeButtonListeners, reply, removeValidation, delay });
            });
        });
    };
};
