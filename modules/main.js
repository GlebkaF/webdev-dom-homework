import { getComments } from "./api.js";
import { commentsRender } from "./render.js";
import { clickCommentContainer } from "./listeners.js";
import { commentInputClick } from "./listeners.js";
import { commentTextClick } from "./listeners.js";
import { commentBtnClick } from "./listeners.js";
import { newCommentContainerClick } from "./listeners.js";
import { validateInput } from "./utils.js";
import { comments } from "./data.js";

const commentsContainer = document.querySelector(".comments");
validateInput();
clickCommentContainer();
commentInputClick();
commentTextClick();
commentBtnClick();
newCommentContainerClick();
commentsContainer.disabled = true;
commentsContainer.innerHTML =
  "<p style='color: white; text-align: center;'>Загрузка...</p>";

getComments()
  .then((data) => {
    comments.length = 0;
    comments.push(...data.comments);
    commentsRender();
  })
  .catch((error) => {
    console.error("Ошибка при загрузке:", error);
    commentsContainer.innerHTML = "<p>Ошибка загрузки</p>";
  });
