    // Получаем элементы
    const commentsList = document.getElementById('commentsList');
    const nameInput = document.getElementById('nameInput');
    const textInput = document.getElementById('textInput');
    const addButton = document.getElementById('addButton');
    const errorMessage = document.getElementById('errorMessage');

    // Функция для получения текущей даты в формате "DD.MM.YY HH:MM"
    function getCurrentDate() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(2);
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    // Функция для проверки валидности полей
    function validateFields() {
      const name = nameInput.value.trim();
      const text = textInput.value.trim();
      
      // Убираем классы ошибок
      nameInput.classList.remove('error');
      textInput.classList.remove('error');
      
      let isValid = true;
      let errorMsg = '';
      
      if (!name) {
        nameInput.classList.add('error');
        isValid = false;
        errorMsg = 'Пожалуйста, укажите ваше имя';
      } else if (!text) {
        textInput.classList.add('error');
        isValid = false;
        errorMsg = 'Пожалуйста, введите текст комментария';
      }
      
      errorMessage.textContent = errorMsg;
      addButton.disabled = !isValid;
      
      return isValid;
    }

    // Функция для создания нового комментария
    function createComment(name, text) {
      // Создаем основной элемент li
      const li = document.createElement('li');
      li.className = 'comment';
      
      // Создаем header
      const header = document.createElement('div');
      header.className = 'comment-header';
      
      const nameDiv = document.createElement('div');
      nameDiv.textContent = name;
      
      const dateDiv = document.createElement('div');
      dateDiv.textContent = getCurrentDate();
      
      header.appendChild(nameDiv);
      header.appendChild(dateDiv);
      
      // Создаем body
      const body = document.createElement('div');
      body.className = 'comment-body';
      
      const textDiv = document.createElement('div');
      textDiv.className = 'comment-text';
      textDiv.textContent = text;
      
      body.appendChild(textDiv);
      
      // Создаем footer с лайками
      const footer = document.createElement('div');
      footer.className = 'comment-footer';
      
      const likes = document.createElement('div');
      likes.className = 'likes';
      
      const likesCounter = document.createElement('span');
      likesCounter.className = 'likes-counter';
      likesCounter.textContent = '0'; // Новый комментарий с 0 лайков
      
      const likeButton = document.createElement('button');
      likeButton.className = 'like-button';
      
      likes.appendChild(likesCounter);
      likes.appendChild(likeButton);
      footer.appendChild(likes);
      
      // Собираем все вместе
      li.appendChild(header);
      li.appendChild(body);
      li.appendChild(footer);
      
      return li;
    }

    // Функция добавления комментария
    function addComment() {
      const name = nameInput.value.trim();
      const text = textInput.value.trim();
      
      // Валидация
      if (!name || !text) {
        validateFields();
        return;
      }
      
      // Создаем новый комментарий
      const newComment = createComment(name, text);
      
      // Добавляем в конец списка
      commentsList.appendChild(newComment);
      
      // Очищаем поля
      nameInput.value = '';
      textInput.value = '';
      
      // Сбрасываем состояние кнопки
      addButton.disabled = true;
      errorMessage.textContent = '';
      
      // Убираем классы ошибок
      nameInput.classList.remove('error');
      textInput.classList.remove('error');
      
      // Фокусируемся на поле имени
      nameInput.focus();
    }

    // Обработчики событий на изменение полей
    nameInput.addEventListener('input', validateFields);
    textInput.addEventListener('input', validateFields);

    // Обработчик на кнопку "Написать"
    addButton.addEventListener('click', addComment);

    // Обработка нажатия Enter в полях
    nameInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        textInput.focus();
      }
    });

    textInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        addComment();
      }
    });

    // Инициализация - проверяем поля при загрузке
    validateFields();

    // Обработчик лайков для существующих и будущих комментариев
    commentsList.addEventListener('click', function(e) {
      const likeButton = e.target.closest('.like-button');
      if (!likeButton) return;
      
      const counter = likeButton.parentElement.querySelector('.likes-counter');
      if (!counter) return;
      
      let currentLikes = parseInt(counter.textContent, 10);
      if (isNaN(currentLikes)) currentLikes = 0;
      
      // Увеличиваем количество лайков
      counter.textContent = currentLikes + 1;
      
      // Добавляем анимацию (опционально)
      likeButton.style.transform = 'scale(1.2)';
      setTimeout(() => {
        likeButton.style.transform = 'scale(1)';
      }, 200);
    });

    console.log("It works!");