"use strict";

import { formString } from "./modules/formString.js";
import { API_LINK, getTodos } from "./modules/API.js";
import { renderPeople } from "./modules/RENDER.js";
import { addComment } from "./modules/addComment.js";
import { appPromise } from "./modules/app_promise.js";

// const inputName = document.getElementById("add-form-name");
// const inputText = document.getElementById("add-form-text");
// const buttonSend = document.querySelector(".add-form-button");
// const formTemplate = formItem.innerHTML;
// const formItem = document.querySelector(".add-form");

let PEOPLE = [];

appPromise(PEOPLE, getTodos, renderPeople, addComment, API_LINK, formString);
addComment(PEOPLE, API_LINK, appPromise);
renderPeople(PEOPLE);
