//Функция для имитации запросов в API для кнопки лайка
function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }

 
  
  // Добавление лайка
  export const getLikes = ({ comments, renderComments }) => {
    const likeButtons = document.querySelectorAll('.like-button');
  
      for (const likeButton of likeButtons) {
          likeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            likeButton.style.animation = 'rotating 2s linear infinite';
                        
          const commentIndex = parseInt(likeButton.dataset.index);
         // console.log(commentIndex);
          const comment = comments[commentIndex];
  
          delay(2000).then(() => {
            comment.likes = comment.isLiked
            if (!comment.isLiked) {
              comment.counter += 1;
              comment.isLiked = true;
    
            } else {
              comment.counter -= 1;
              comment.isLiked = false
            }
            renderComments({ comments });
          });
  
        });
      }
  
  }