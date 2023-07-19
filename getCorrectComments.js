//Исправление комментария 

export const getCorrectComments = ({ comments, renderComments }) => {
  const correctButtons = document.querySelectorAll('.add-correct-button');
   
    for (const correctButton of correctButtons) {
      
      correctButton.addEventListener('click', (event) => {
       event.stopPropagation();
          const correctIndex = parseInt(correctButton.dataset.index);
          console.log(correctIndex);
    
          const comment = comments[correctIndex];
        
        if (!comment.isEdit) {
          correctButton.innerHTML = 'Сохранить'; 
          comment.isEdit = true;
          comment.text = comment.text;
        } else {
          correctButton.innerHTML = 'Редактировать';
          comment.isEdit = false;
          
          //const newCommentText = document.getElementById('correct-textarea');
          const newCommentText = document.querySelector('.correct-form-text');
          console.log(newCommentText);
          comment.text = newCommentText.value;   
        }
        console.log('paботает!');
        renderComments({ comments });
      });
    }
  };