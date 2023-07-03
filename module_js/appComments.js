import { formatDate } from "./option.js";
import { renderApp, renderComments } from "./render.js";
import { token } from "./login_components.js";

export const getAppComments = (response, array) => {
  return response.json().then((responseData) => {
    array = responseData.comments;
    array = array.map((comment) => {
      return {
        name: comment.author.name,
        date: formatDate(comment.date),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });
    if(!token) {
      renderComments(array);
    } else renderApp(array);
    
  });
};