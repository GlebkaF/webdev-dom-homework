export const renderLike = (comments, element, listComment) => {
    const likeHtml = comments.map((comment, index) => listComment(comment, index)).join("");
    element.innerHTML = likeHtml;
  };