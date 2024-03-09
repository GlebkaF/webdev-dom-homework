// Показать текст "Добавляю твой комментарий..."
export const showAddingCommentMessage = (commentListElement) => {
    const addingCommentMessage = document.createElement('div');
    addingCommentMessage.textContent = 'Добавляю твой комментарий...';
    addingCommentMessage.classList.add('adding-comment-message');
    commentListElement.appendChild(addingCommentMessage);
    document.getElementById('form-id').style.display = 'none'; // Скрыть форму добавления комментария
};

// Скрыть текст "Добавляю твой комментарий..."
export const hideAddingCommentMessage = (commentListElement) => {
    const addingCommentMessage = document.querySelector('.adding-comment-message');
    if (addingCommentMessage) {
        addingCommentMessage.remove();        
    };
};