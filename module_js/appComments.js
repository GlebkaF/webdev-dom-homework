
import { renderApp, renderComments } from "./render.js";
import { token } from "./login_components.js";
import { format } from "date-fns";

export const getAppComments = (response, array) => {
  return response.json().then((responseData) => {
    array = responseData.comments;
    array = array.map((comment) => {
      const reDate = format(new Date(comment.date), "dd/MM/yyyy hh:mm")
      return {
        name: comment.author.name,
        date: reDate,
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