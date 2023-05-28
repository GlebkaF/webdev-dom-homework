"use strict";



const buttonEnter = document.getElementById("button-enter");
let listComments = document.getElementById("list-comments");

import {renderUsers} from "./render.js";
import {addComment} from "./data.js";


buttonEnter.addEventListener("click", () => {
    addComment()
});






