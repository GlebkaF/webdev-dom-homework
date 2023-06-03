import renderComments from "./render.js";
import { getComments } from "./comments.js";
import { commentaries } from "./api.js";
import { listElement } from "./main.js";





const initLikeButtonListeners = () => {
    const likesElements = document.querySelectorAll(".like-button");
  //console.log(likesElements);
    for (const likeElement of likesElements) {
      //console.log(likeElement);
      likeElement.addEventListener ("click", (event) => {
        event.stopPropagation();
        //const likes = likeElement.dataset.likes
        //console.log(likes);
        const index = likeElement.dataset.index;
        //console.log(index);

        if(commentaries[index].isLiked) {
          commentaries[index].isLiked = !commentaries[index].isLiked;
          commentaries[index].likes -= 1;
          renderComments(listElement, getComments);
          //initLikeButtonListeners();
          //initCommentsListeners();
        } else {
          commentaries[index].isLiked = !commentaries[index].isLiked;
          commentaries[index].likes += 1;
          renderComments(listElement, getComments);
          //initLikeButtonListeners();
          //initCommentsListeners();
        }

      });
    }
  };

  export default initLikeButtonListeners;