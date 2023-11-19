"use strict";
import { getComments, postComments } from "./modules/api.js";
import { handleEnterKey, renderUsersOld } from "./modules/render.js";
import { currentDate } from "./modules/utils.js";
import { renderLogin } from "./modules/renderLogin.js";
import { inputNameElement, inputTextElement } from "./modules/render.js";
import { userAuthorization } from "./modules/login.js";

userAuthorization();
export let users = [];
// showLoadingIndicator();
renderUsersOld(users);
export function getFetch() {
  getComments().then((responseData) => {
    const appUsers = responseData.comments.map((comment, index) => {
      return {
        name: comment.author.name,
        date: currentDate(new Date(comment.date)),
        likes: comment.likes,
        text: comment.text,
        isLiked: false,
        id: index,
      };
    });

    users = appUsers;
    renderUsersOld(users);
    // hideLoadingIndicator();
  });
}
getFetch();
handleEnterKey();
