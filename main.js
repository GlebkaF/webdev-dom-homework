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
    
    commentsList.append(newComment);
    
    // Очищаем поля
    nameInput.value = '';
    textInput.value = '';
});

// Добавляем обработчик кликов на весь список комментариев
commentsList.addEventListener('click', function(event) {
    // Проверяем, что кликнули именно на кнопку лайка
    if (event.target.classList.contains('like-button')) {
        // Находим родительский элемент с лайками
        const likesElement = event.target.closest('.likes');
        // Находим счетчик внутри этого элемента
        const likesCounter = likesElement.querySelector('.likes-counter');
        
        // Получаем текущее количество лайков
        let currentLikes = parseInt(likesCounter.textContent);
        
        // Проверяем, активен ли уже лайк
        if (event.target.classList.contains('-active-like')) {
            // Убираем лайк - уменьшаем счетчик и убираем класс
            currentLikes--;
            event.target.classList.remove('-active-like');
        } else {
            // Ставим лайк - увеличиваем счетчик и добавляем класс
            currentLikes++;
            event.target.classList.add('-active-like');
        }
        
        // Обновляем счетчик на странице
        likesCounter.textContent = currentLikes;
    }
});