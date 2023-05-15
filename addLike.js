const initLikeButtonListener = () => {
  const commentFooter = document.querySelectorAll(".comment-footer");
  const commentTexts = document.querySelectorAll(".comment-text");

  commentTexts.forEach((commentText) => {
    commentText.addEventListener("click", (event) => {
      const index = commentText.dataset.index;
      const inputText = document.querySelector(".add-form-text");
      inputText.value = `< ${comments[index].name} ${comments[index].comment}`;
    });
  });
  commentFooter.forEach((element) => {
    const likesCounter = element.firstElementChild.firstElementChild;
    const likeButton = element.lastElementChild;
    likeButton.addEventListener("click", (event) => {
      const currentLikes = parseInt(likesCounter.textContent);
      const index = likeButton.dataset.index;

      if (comments[index].isLiked === true) {
        const oldLikes = currentLikes - 1;
        likesCounter.textContent = oldLikes;
        comments[index].isLiked = false;
        comments[index].likes = oldLikes;
      } else {
        const newLikes = currentLikes + 1;
        likesCounter.textContent = newLikes;
        comments[index].isLiked = true;
        comments[index].likes = newLikes;
      }

      renderComments();
    });
  });
};
