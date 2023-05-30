import renderComments from "./renderComments.js";
import { getListComments } from "./listComments.js";
import { commentos } from "./api.js";
import { comments } from "./script.js";



let delay = (interval = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};


const initLikeButtonsListeners = () => {
    let likeButtonsElements = document.querySelectorAll('.like-button');
  
    
  
    for(const likeButtonElement of likeButtonsElements) {
  
      likeButtonElement.addEventListener('click', (event) => {
  
        event.stopPropagation();
  
        const index = likeButtonElement.dataset.index;
        // console.log(index);
        likeButtonElement.classList.add('-loading-like');
        delay(2000)
        .then(() => {
          if(commentos[index].isLiked) {
            commentos[index].likes -= 1;
            commentos[index].isLiked = !commentos[index].isLiked;
          } else {
            commentos[index].likes += 1;
            commentos[index].isLiked = !commentos[index].isLiked;
          }
        })
        .then(() => {
          likeButtonElement.classList.remove('-loading-like');
          renderComments(comments, getListComments);
        });
      });
    }
  };

  export default initLikeButtonsListeners;