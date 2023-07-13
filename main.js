
export { initLikeButton, initEditButton };
import renderUserComments from "./renderComments.js";
import { fetchComments} from "./api.js";


    // Data in array


   export let userComments = [];

         // Like button

         const initLikeButton = (userComments) => {
          const likeButtonElements = document.querySelectorAll(".like-button");
          for (const likeButtonElement of likeButtonElements) {
            const index = likeButtonElement.dataset.index;
            likeButtonElement.addEventListener("click", (event) => {
              event.stopPropagation();
              if (!userComments[index].isLiked) {
                userComments[index].isLiked = true;
                userComments[index].active = "-active-like";
                userComments[index].likeCounter += 1;
              } else {
                userComments[index].isLiked = false;
                userComments[index].active = "";
                userComments[index].likeCounter -= 1;
              }
              renderUserComments(userComments);
            });
          }
        };

      // Data from API
    
      fetchComments();


     // Edit button

     const initEditButton = (userComments) => {
      const editButtonElements = document.querySelectorAll(".edit-button");
      for (const editButtonElement of editButtonElements) {
        const index = editButtonElement.dataset.index;
        editButtonElement.addEventListener("click", (event) => {
          event.stopPropagation();
          if (!userComments[index].isEdit) {
            userComments[index].isEdit = true;
          } else {
            userComments[index].isEdit = false;
          }
          renderUserComments(userComments);
        });
      }
    };

  
    
   