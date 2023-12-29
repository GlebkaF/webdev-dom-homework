import { studentsComments } from "./main.js";

const textAreaElement = document.getElementById('add-text');

//Цитируем комментарий в форму
export const initAnswerComments = () => {
    const commentsElements = document.querySelectorAll(".comment");
    for (const commentsElement of commentsElements) {
        commentsElement.addEventListener("click", () => {
            const index = commentsElement.dataset.index;
            //console.log(index);
            const commentText = studentsComments[index].text;
            const commentAuthor = studentsComments[index].name;
            //console.log(commentText, commentAuthor);
            textAreaElement.value = `${commentText} > ${commentAuthor}`;
        });
    };
};