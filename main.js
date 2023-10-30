import { commentsGet } from "./api.js";
import { editButton } from "./editButton.js";
import { likedFunction } from "./isliked.js";
import { formatDateToRu, formatDateToUs } from "./lib/formatDate/formatDate.js";
import { renderFunction } from "./renderFunction.js";

const text = document.querySelector(".add-form-text");
const name = document.querySelector(".add-form-name");
const button = document.querySelector(".add-form-button");
const date = new Date();

const country = "ru";

export let comments = [];

export const apiCommentsGet = ({ comments }) => {
  commentsGet()
    .then((responseData) => {
      const apiComments = responseData.comments.map((comment) => {
        // const now = new Date();
        // const createDate = format(comment.date, "MM-dd-yyyy hh:mm");
        return {
          name: comment.author.name,
          date: comment.date,
          text: comment.text,
          like: comment.likes,
          isLiked: false,
          isEdit: false,
        };
      });
      comments = apiComments;
      renderFunction({ comments, apiCommentsGet });
    })
    .then(() => {
      const downloadAlert = document.querySelector("h2");
      downloadAlert.style = "display: none";
    });
};

apiCommentsGet({ comments });
likedFunction({ comments, apiCommentsGet });
editButton({ comments });

export const answerElement = () => {
  const answerTexts = document.querySelectorAll(".comment-text");
  for (const answerText of answerTexts)
    answerText.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = answerText.dataset.index;
      text.value = `BEGIN_QUOTE > ${comments[index].name} \n  ${comments[index].text} QUOTE_END \n`;

      renderFunction({ comments, apiCommentsGet });
    });
};
