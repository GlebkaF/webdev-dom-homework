// Показать текст "Добавляю твой комментарий..."



export const showAddingCommentMessage = () => {
    const commentListElement = document.getElementById('commentList');
    const addingCommentMessage = document.createElement('div');
    addingCommentMessage.textContent = 'Добавляю твой комментарий...';
    addingCommentMessage.classList.add('adding-comment-message');
    commentListElement.appendChild(addingCommentMessage);
    document.getElementById('form-id').style.display = 'none'; // Скрыть форму добавления комментария
};

// Скрыть текст "Добавляю твой комментарий..."
export const hideAddingCommentMessage = () => {
    const commentListElement = document.getElementById('commentList');
    const addingCommentMessage = document.querySelector('.adding-comment-message');
    if (addingCommentMessage) {
        addingCommentMessage.remove();        
    };
};