const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const buttonElement = document.getElementById("add-button");

export function enableButton({ buttonElement }) {
    buttonElement.disabled = true;
    if (nameInputElement.length === 0 && commentInputElement.length === 0) {
      buttonElement.disabled = true;
      }
    }

    nameInputElement.addEventListener('input', function () {
        if (nameInputElement.value === '' || commentInputElement.value === '') {
          buttonElement.setAttribute('disabled', 'disabled')
        }else{
          buttonElement.removeAttribute('disabled')
        }
      });
      commentInputElement.addEventListener('input', function () {
        if (nameInputElement.value === '' || commentInputElement.value === '') {
          buttonElement.setAttribute('disabled', 'disabled')
        }else{
          buttonElement.removeAttribute('disabled')
        }
      });