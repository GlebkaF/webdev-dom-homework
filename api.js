const fetchComments = () => {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/mariia-goppa/comments", {
    method: "GET",
  }).then((response) => {
    let loadingComments = document.getElementById('comments-loader');
    loadingComments.style.display = 'none';
  return response.json();
  })
  .then((responseData) => {
      userComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date).toLocaleString().slice(0, -3),
        comment: comment.text,
        likeCounter: 0,
        isLiked: false,
        active: "",
        isEdit: false,
        };
    });

      renderUserComments();
    });
  };

  fetchComments();



  const postComment = () => {
    let loadingComments = document.getElementById('new-comment-loader');
    loadingComments.classList.remove('hidden');
    let newComment = document.getElementById('new-comment-section');
    newComment.style.display = 'none';
      fetch("https://webdev-hw-api.vercel.app/api/v1/mariia-goppa/comments", {
        method: "POST",
        body: JSON.stringify({ 
          text: commentInputElement.value, 
          name: nameInputElement.value,
          dates: time(),
          likeCounter: 0,
        }),
      })
      .then((response) => {
        return fetchComments();
      })
      .then((response) => {
        let loadingComments = document.getElementById('new-comment-loader');
        loadingComments.classList.add('hidden');
        let newComment = document.getElementById('new-comment-section');
        newComment.style.display = '';
      });
    };

    postComment();

  