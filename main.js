import { fetchGet, setLoading } from "./api.js";
import { renderComments } from "./renderComments.js";
import { formatDate } from "./formatdate.js";

import { comLoader } from "./renderLoader.js";
import { renderForm, userLogin } from "./renderForm.js";

let comments = [];

export const fetchGetAndRenderComments = () => {
  fetchGet()
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          text: comment.text,
          like_active: comment.isLiked,
          like_count: comment.likes,
          date: formatDate(new Date(comment.date)),
          forceError: true,
        };
      });
      setLoading(false);
      comLoader();
      
      comments = appComments;
      renderComments(comments);

      const loginTextEl = document.getElementById("login-text");
      userLogin ? (loginTextEl.hidden = true) : (loginTextEl.hidden = false);
    })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        console.warn(error);
        alert(
          "Сбой подключения! Пожалуйста, проверьте подключение и обновите страницу."
        );
        comLoader.textContent =
          "Комментарии не загружены. Пожалуйста, проверьте подключение и обновите страницу.";
        return;
      }
      if (error.message === "Сервер сломался") {
        console.warn(error);
        console.log("Повторная загрузка");
        fetchGet();
        return;
      }
    });
};
fetchGetAndRenderComments();
renderForm();
//renderComments(comments);

