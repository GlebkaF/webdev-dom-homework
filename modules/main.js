"use strict";

import { init } from "./addForm.js";
import { init as initComments } from "./comments.js";
import { init as deleteComment } from "./deleteLastComments.js";
import { loadComments } from "./comments.js";

loadComments();
init();
initComments();
deleteComment();

console.log("It works!");