import { getComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { format } from "date-fns";

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
        date: format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss'),
        text: comment.text,
        likes: comment.likes,
      };
    });
    renderComments();
  });
};

fetchAndRenderComments();







