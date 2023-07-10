import { renderCommentList } from "./modules/render.js";


const nameElement = document.getElementById('name');
const commentsElement = document.getElementById('comments');


export function addErrors(){
    nameElement.classList.add("_error");
    commentsElement.classList.add("_error");
    setTimeout(() => {
      nameElement.classList.remove("_error");
      commentsElement.classList.remove("_error");
    },1000)
  };

// export const getDate = (startDate) => {
//     const date = new Date(startDate);
  
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear().toString().slice(-2);
//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
  
//     return `${day}.${month}.${year} ${hours}:${minutes}`;
//   };

  export function addLikeButton(commentList){
    const likeButtonElement = document.querySelectorAll('.like-button');
for (const buttonLike of likeButtonElement) {
  buttonLike.addEventListener("click", (event) => {
    event.stopPropagation();
    let index = buttonLike.dataset.buttonLike;
    if (commentList[index].activeLike === false) {
      commentList[index].activeLike = true
      commentList[index].likes += 1
      commentList[index].activeClass = "-active-like"
    } else {
      commentList[index].activeLike = false
      commentList[index].likes -= 1
      commentList[index].activeClass = ""
    }
   renderCommentList(commentList);
  })
}
};

export function replyComment(){
const contentsReplyComments = document.querySelectorAll(".comment");
contentsReplyComments.forEach((replyComment, index) => {
  replyComment.addEventListener("click", (event) => {
  if(event.target.classList.contains("like-button")){
    return;
  };
  const commentText = replyComment.querySelector(".comment-text").innerText
  const commentAuthor = replyComment.querySelector(".comment-header div").innerText
  const textarea = document.querySelector("#comments")
  textarea.value = `> ${commentText} \n ${commentAuthor} ,`;
  })
})
// getComments();
};

