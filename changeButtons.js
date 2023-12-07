export function changeFormButton (isDisabled, color, addFormButton) {
    addFormButton.disabled = isDisabled;
    addFormButton.style.backgroundColor = color;
}

export function changeLikeButton(likeElement, comments){
    if (comments[likeElement.dataset.index].isLiked === true) {
        comments[likeElement.dataset.index].likesCount -= 1;
        comments[likeElement.dataset.index].isLiked = false;
    } else if (comments[likeElement.dataset.index].isLiked === false) {
        comments[likeElement.dataset.index].likesCount += 1;
        comments[likeElement.dataset.index].isLiked = true;
    }
}