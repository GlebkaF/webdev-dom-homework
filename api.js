import renderUserComments from "./renderComments.js";

const commentInputElement = document.getElementById("comment-input");
const nameInputElement = document.getElementById("name-input");

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
          forceError: false,
        }),
      })
      .then((response) => {
        if (response.status === 500) {
          alert("Сервер сломался, попробуй позже");
          throw new Error("Сервер сломался, попробуй позже");
        } 
        else if (response.status === 400) {
          alert("Имя и комментарий должны быть не короче 3 символов"); 
          throw new Error("Имя и комментарий должны быть не короче 3 символов"); 
        } else {
          return response.json();
        };
      })
      .then((response) => {
        return fetchComments();
      })
      .then((response) => {
        let loadingComments = document.getElementById('new-comment-loader');
        loadingComments.classList.add('hidden');
        let newComment = document.getElementById('new-comment-section');
        newComment.style.display = '';
        nameInputElement.value = "";
        commentInputElement.value = "";
      })
      .catch((error) => {
        if (error.message !== "Сервер сломался, попробуй позже" && error.message !== "Имя и комментарий должны быть не короче 3 символов") 
        {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
        let loadingComments = document.getElementById('new-comment-loader');
        loadingComments.classList.add('hidden');
        let newComment = document.getElementById('new-comment-section');
        newComment.style.display = '';
      });
    };

    postComment();

    renderUserComments();
    
    export { fetchComments, postComment };

  