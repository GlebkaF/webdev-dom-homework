export const addLike = (LIST, renderFunction) => {
    const likeButtons = document.querySelectorAll(".like-button");
    likeButtons.forEach((likeButtonEl, index) => {
        likeButtonEl.addEventListener("click", () => {
            let likeEl = LIST[index];
            // console.log(likeEl);
            if (likeEl.isLiked === false) {
                likeEl.isLiked = true;
                likeEl.likes++;
                renderFunction();
            } else {
                likeEl.isLiked = false;
                likeEl.likes--;
                renderFunction();
            }
        });
    });
};

export const getLike = (elementPeople) => {
    return elementPeople ? "like-button -active-like" : "like-button";
};
