function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

export const likeBtn = ({ likeButton, comments }) => {
    const loadingLike = () => {
        if (isLikeLoading) {
            return likeButton.classList.add('-loading-like');
        } else {
            return likeButton.classList.remove('-loading-like');
        }
    }
    //состояние загрузки
    let isLikeLoading = true;
    loadingLike();
    //Присвоила индексу весь элемент массива
    const index = likeButton.dataset.index;
    delay(2000)
        .then(() => {
            if (comments[index].isLike) {
                comments[index].isLike = false;
                comments[index].likes -= 1;
            } else {
                comments[index].isLike = true;
                comments[index].likes += 1;
            }

        }).then((data) => {
            isLikeLoading = false;
            return loadingLike();
        })
}

//ответ на комментарий
export const initUpdateCommentListener = ({ comments }) => {
    const formComments = document.querySelectorAll('.comment');
    for (const formComment of formComments) {
        formComment.addEventListener('click', () => {
            const index = formComment.dataset.index;
            document.querySelector('.add-form-name').value = '';
            document.querySelector('.add-form-text').value = `%BEGIN_QUOTE ${comments[index].author.name}: 
        ${comments[index].text}END_QUOTE%`;
            console.log(comments[index]);
        })
    }
}
