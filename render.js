
import { initEventListeners, replayToComment } from "./main.js";


const renderComments = ( element, comments, listComments ) => {

    const commentsHtml = comments.map((comment, index) => listComments(comment, index)).join('');

    element.innerHTML = commentsHtml;
    initEventListeners(); 
    replayToComment();
};

export {renderComments};