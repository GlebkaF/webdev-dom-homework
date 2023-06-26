import { commentsElement } from "./main.js";
import { initEventListeners, replayToComment } from "./main.js";


const renderComments = ( comments, listComments ) => {

    const commentsHtml = comments.map((comment, index) => listComments(comment, index)).join('');

    commentsElement.innerHTML = commentsHtml;
    initEventListeners(); 
    replayToComment();
};

export {renderComments};