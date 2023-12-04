"use strict";
import { getComments, postComments, token } from "./modules/api.js";
import {
    renderUsersOld,
    showLoadingIndicator,
    hideLoadingIndicator,
} from "./modules/render.js";
import { renderLogin } from "./modules/renderLogin.js";
import { inputNameElement, inputTextElement } from "./modules/render.js";
import { userAuthorization } from "./modules/login.js";
import { format } from "date-fns";

userAuthorization();
console.log(token);
export let users = [];
export function getFetch() {
    getComments().then((responseData) => {
        const appUsers = responseData.comments.map((comment) => {
            const createDate = format(
                new Date(comment.date),
                "yyyy-MM-dd hh.mm.ss",
            );
            return {
                name: comment.author.name,
                date: createDate,
                likes: comment.likes,
                text: comment.text,
                isLiked: comment.isLiked,
                id: comment.id,
            };
        });

        users = appUsers;
        renderUsersOld();
    });
}
getFetch();
