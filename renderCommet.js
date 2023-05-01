const renderComments = (comments, element, getComment) => {
    const commentsHtml = comments
      .map((comment, index) => getComment(comment, index))
      .join("");
  
    element.innerHTML = commentsHtml;
  };

  export default renderComments