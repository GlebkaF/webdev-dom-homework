const commentsList = document.querySelector('.comments');
const nameInput = document.querySelector('.add-form-name');
const textInput = document.querySelector('.add-form-text');
const addButton = document.querySelector('.add-form-button');

addButton.addEventListener('click', function() {
    // проверка на пустые плдя
    if (nameInput.value === '' || textInput.value === '') {
        alert('Заполните все поля');
        return;
    }
    
    // создание комента 
    const newComment = document.createElement('li');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <div class="comment-header">
            <div>${nameInput.value}</div>
        </div>
        <div class="comment-body">
            <div class="comment-text">
                ${textInput.value}
            </div>
        </div>
        <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">0</span>
                <button class="like-button"></button>
            </div>
        </div>
    `;
    
    //  в начало списка
    commentsList.append(newComment);
    
    // Очищаем поля
    nameInput.value = '';
    textInput.value = '';
});