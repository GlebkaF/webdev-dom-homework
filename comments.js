const buttonElement = document.getElementById('add-button'); 
    const listElement = document.getElementById('list'); 
    const nameElement = document.getElementById('name');
    const commentsElement = document.getElementById('comments');
    const commentsListElement = document.getElementById('comments-list');
    const addingAComment = document.getElementById('adding');
    const commentsLoader = document.getElementById('loader');

    let commentList = []

    commentsLoader.className = "_hidden";
   

    const getComments = () => {
    const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v1/valeriy-poletaev/comments",
      {
        method: "GET"
      });

      fetchPromise.then((response) => {
        const jsonPromise = response.json();

      jsonPromise.then((responseData) => {
        addingAComment.className = "add-form";
        commentsLoader.className = "_hidden";
        console.log(responseData);
          commentList = responseData.comments.map((comment) => {
          let activeClass = ""
          if(comment.isLiked === true){
            activeClass = "-active-like"
          };
          return{
            name: comment.author.name,
               date: getDate(comment.date),
               text: comment.text,
               likes: comment.likes,
               activeLike: comment.isLiked,
              activeClass: activeClass, 
              isEdit: false,
          }
        })
        renderCommentList();
      })
      })
    };
    getComments();

    const postComment = (data) => {
      const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v1/valeriy-poletaev/comments",
        {
          method: "POST",
          body: JSON.stringify({
          name: nameElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
          date: new Date(),
          text: commentsElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
          likes: 0,
          activeLike: false,
          activeClass: ""
        })
      });
        fetchPromise.then((response) => {
          getComments();
        });
    };

const renderCommentList = () => {
const commentHtml = commentList.map((comment, index) => {
return `<li class="comment data-comment-content="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.activeClass}" data-button-like="${index}"></button>
            </div>
          </div>
        </li>`
  }).join('');
  listElement.innerHTML = commentHtml;
  replyComment();
  addLikeButton();
}



const getDate = (startDate) => {
  const date = new Date(startDate);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

    
    buttonElement.addEventListener("click", () => {
      if (nameElement.value === ""){
        alert("Пожалуйста введите имя!");
        return;
      };
      if (commentsElement.value === ""){
        alert("Пожалуйста введите коментарий!");
        return;
      };
      addingAComment.className = "_hidden";
      commentsLoader.className = "comments";

      postComment();
    });


    function addLikeButton(){
      const likeButtonElement = document.querySelectorAll('.like-button');
  for (const buttonLike of likeButtonElement) {
    buttonLike.addEventListener("click", (event) => {
      event.stopPropagation();
      index = buttonLike.dataset.buttonLike;
      if (commentList[index].activeLike === false) {
        commentList[index].activeLike = true
        commentList[index].likes += 1
        commentList[index].activeClass = "-active-like"
      } else {
        commentList[index].activeLike = false
        commentList[index].likes -= 1
        commentList[index].activeClass = ""
      }
      renderCommentList();
    })
  }
};

function replyComment(){
  const contentsReplyComments = document.querySelectorAll(".comment");
  contentsReplyComments.forEach((replyComment, index) => {
    replyComment.addEventListener("click", (event) => {
    if(event.target.classList.contains("like-button")){
      return;
    };
    const commentText = replyComment.querySelector(".comment-text").innerText
    const commentAuthor = replyComment.querySelector(".comment-header div").innerText
    const textarea = document.querySelector("#comments")
    // textarea.value = '&gt ' + commentText + "\n" + commentAuthor + "," ;
    textarea.value = `> ${commentText} \n ${commentAuthor} ,`;

    })
  })
};