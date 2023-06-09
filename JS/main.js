"use strict";
import { getFromApi } from "./api.js";
import { renderApp } from "./renderApp.js";
import { getCommentsList } from "./CommentsList.js";
import { newComments } from "./api.js";

const appElement = document.getElementById('app');


getFromApi(newComments);
renderApp(newComments, appElement, getCommentsList);