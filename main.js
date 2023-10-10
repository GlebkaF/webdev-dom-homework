"use strict";

import { getComments } from "./api.js";

import { renderLogin } from "./loginPage.js";
import { renderComments } from "./renderComments.js";




// Массив данных из хранилища
let comments = [];

// GET
const fetchAndRenderComments = () => {
  getComments().then((responseData) => {
    comments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date).toLocaleString(),
        text: comment.text,
        likes: comment.likes,
      };
    });
    renderComments(comments);
  });
};

renderLogin({fetchAndRenderComments});
