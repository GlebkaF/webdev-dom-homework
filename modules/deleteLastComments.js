
removeFormButton.addEventListener('click', () => {
    const lastChild = listComments.lastChild;
    lastChild.remove();
    comments.pop();
})