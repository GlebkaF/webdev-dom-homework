import { getComments } from "./api.js";
import { renderComments } from "./renderComments.js";

const loadingComment = document.querySelector(".loading-comment");

let comments = [];

export const fetchComments = () => {
    getComments().then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString(),
          text: comment.text,
          likes: comment.likes,
          isLikeLoading: false,
          isLike: false,
        }
      });
      comments = appComments;
      renderComments({ comments });
    })
  .then(() => {
    loadingComment.classList.add("hidden");
  });
  };