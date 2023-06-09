"use strict";
import { getFromApi } from "./api.js";
import { appElement, renderApp } from "./renderApp.js";
import { getCommentsList } from "./CommentsList.js";
import { newComments } from "./api.js";


getFromApi(newComments);
renderApp(newComments, appElement, getCommentsList);