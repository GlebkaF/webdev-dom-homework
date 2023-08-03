export function likeComment(comments, renderComments) {
    const likeButtonElements = document.querySelectorAll('.like-button');

    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = likeButtonElement.dataset.index;

            if (comments[index].isLiked) {
                comments[index].isLiked = false;
                comments[index].likes--;
            } else {
                comments[index].isLiked = true;
                comments[index].likes++;
            }
            renderComments();
        });
    }
};

