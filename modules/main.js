"use strict";

import { AddComment, getComments } from "./addForm.js";
import { getApiComments, postApiComment } from "./api.js";
import { switcher } from "./comments.js";

let idCounter = 2;

getComments();
AddComment();





const getUnsafeString = (str) => str.trim()
.replaceAll("&amp;", "&")
.replaceAll("&lt;", "<")
.replaceAll("&gt;", ">")
.replaceAll("&quot;", '"')





console.log("It works!");