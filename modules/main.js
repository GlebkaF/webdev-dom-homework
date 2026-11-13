import { errorMoment } from "./utils.js";
import { formatDate } from "./utils.js";
import { postFetchFunction } from "./api.js";
import { getComments } from "./api.js";
import { commentsRender } from "./render.js";
import { clickCommentContainer } from "./listeners.js";
import { commentInputClick } from "./listeners.js";
import { commentTextClick } from "./listeners.js";
import { commentBtnClick } from "./listeners.js";
import { newCommentContainerClick } from "./listeners.js";
import { validateInput } from "./utils.js";
import { comments } from "./data.js";
import { delay } from "./utils.js";

const commentsContainer = document.querySelector(".comments");
const commentInput = document.querySelector(".add-form-name");
const commentText = document.querySelector(".add-form-text");
const commentLikes = document.querySelector(".likes-counter");
const commentBtn = document.querySelector(".add-form-button");
const commentLi = document.querySelector(".comment");
const commentLikeBtn = document.getElementById("cooment-like--btn");
validateInput();
delay()
clickCommentContainer();
commentsRender();
commentInputClick();
commentTextClick();
commentBtnClick();
newCommentContainerClick();
commentsContainer.disabled = true;
commentsContainer.innerHTML =
  "<p style='color: white; text-align: center;'>Загрузка...</p>";

getComments();
