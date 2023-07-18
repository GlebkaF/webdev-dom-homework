
export const checkFields = () => {
    const buttonElement = document.getElementById('write-button');
    const nameElement = document.getElementById('name-input');
    const commentElement = document.getElementById('comment-input');

    if (nameElement.value && commentElement.value) {
        buttonElement.disabled = false;
    } else {
        buttonElement.disabled = true;
    }
};