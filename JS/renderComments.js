
const renderComments = (data, elem, getList) => {
    const commentsHtml = data
        .map((comment, index) => getList(comment, index))
        .join('');

    elem.innerHTML = commentsHtml;
    // likeButtonsListeners();
};


export { renderComments };