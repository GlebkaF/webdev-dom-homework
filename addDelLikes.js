function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
}

function AddLikeOrDelLike (e) {
    e.target.classList.add('loading-like')
      const comment = usersComments[e.target.dataset.id];
      delay(2000).then(() => {
        comment.likes = comment.isLiked
          ? comment.likes - 1
          : comment.likes + 1;
        comment.isLiked = !comment.isLiked;
        comment.isLikeLoading = false;
        e.target.classList.remove('loading-like')
        renderComments();
      });
}