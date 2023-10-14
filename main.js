import { getComments } from "./api.js";

import { renderComments } from "./renderComments.js";

// Массив данных из хранилища
export let comments = [];

export const setComments = (newComments) => {
  comments = newComments;
}

// GET
export const fetchAndRenderComments = () => {
  getComments().then((responseData) => {
    comments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date).toLocaleString(),
        text: comment.text,
        likes: comment.likes,
      };
    });
    renderComments();
  });
};

fetchAndRenderComments();







