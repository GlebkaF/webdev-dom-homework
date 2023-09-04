import { renderFunction } from "./renderFunction.js";

export const editButton = ({ comments }) => {

    const editButtons = document.querySelectorAll('.edit-button');
  
    for (const editButton of editButtons) {
  editButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const index = editButton.dataset.index; 
    //console.log(comments[edit].isEdit);
      if (comments[index].isEdit === true) {
        const newTexts = document.querySelectorAll('.edit-text');
        for (const newText of newTexts) {
         comments[index].text = newText.value;
         comments[index].isEdit = false;
          }
      } else if (comments[index].isEdit === false) {
        comments[index].isEdit = true;
      }
      renderFunction({ comments });
  
  })
    }
  }