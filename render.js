
function renderComments(element, getListComments) {
    const commentsHTML = comments.map((comment, index) => getListComments(comment, index)).join('');
    element.innerHTML = commentsHTML;
    initlikeButtonsListeners();
    redactComments();
    initiateRedact();
}
export default renderComments;