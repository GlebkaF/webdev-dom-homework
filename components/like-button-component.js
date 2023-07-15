export function initLikeButton(users) {
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (const likeButtonElement of likeButtonElements){
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeButtonElement.dataset.index;
      if (users[index].isLiked === false) {
        users[index].likes = users[index].likes + 1;
        users[index].isLiked = true;
      } else {
        users[index].likes = users[index].likes - 1;
        users[index].isLiked = false;
      }
      renderApp();
      }
    )
  }
}