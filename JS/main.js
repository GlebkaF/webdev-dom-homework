"use strict";
import { getFromApi, postToApi } from "./api.js";
import { renderComments } from "./renderComments.js";
import { getCommentsList } from "./CommentsList.js";
import { newComments } from "./api.js";

// const listElem = document.getElementById('list-comments');
// const commentBtn = document.getElementById('form-add-button');
// const addName = document.getElementById('add-name');
// const addComment = document.getElementById('add-comment');
const appElement = document.getElementById('app');


getFromApi(newComments);
renderComments(newComments, appElement, getCommentsList);