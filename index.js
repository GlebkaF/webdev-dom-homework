const addFormButton = document.getElementById("add-form-button");
const addFormName = document.getElementById("add-form-name");
const addFormText = document.getElementById("add-form-text");
const commentsElement = document.getElementById("comments");


// создаем переменную коммент
const commentElements = document.querySelectorAll(".comment");
// создаем массив со списком комментариев
const comments = [
    {
        name: "Глеб Фокин",
        time: "12.02.22 12:18",
        text: "Это будет первый комментарий на этой странице",
        counter: 3,
        isLiked: false
    },
    {
        name: "Варвара Н.",
        time: "13.02.22 19:22",
        text: "Мне нравится как оформлена эта страница! ❤",
        counter: 75,
        isLiked: true
    }
];


// Оживляем кнопку лайков и счетчик
const initLikeButtons = () => {
    const likeButtonsElements = commentsElement.querySelectorAll('.like-button');

    for (const likeButtonElement of likeButtonsElements) {
        likeButtonElement.addEventListener('click', () => {
            const index = likeButtonElement.dataset.index;

            if (comments[index].isLiked == false) {
                comments[index].isLiked = true;
                comments[index].counter += 1;

            } else if (comments[index].isLiked === true) {
                comments[index].isLiked = false;
                comments[index].counter -= 1;
            }

            renderComments();
        })
    }
}

const commentsList = document.querySelector('ul.comments');


initLikeButtons();

// создаем рендер функцию
const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment">
    <div class="comment-header">
      <div data-name="${comment.name}">${comment.name}</div>
      <div data-time="${comment.time}">${comment.time}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text" data-text="${comment.text}">${comment.text}</div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter" data-counter="${comment.counter}">${comment.counter}</span>
        <button data-index=${index} class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
      </div>
    </div>
  </li>`
    })
    commentsElement.innerHTML = commentsHtml;
};

renderComments();

// вводим обработчик клика 
addFormButton.addEventListener("click", () => {
    // если поля ввода пустые, не пускаем дальше
    if (addFormName.value === "" || addFormText.value === "") {
        return;
    }
    // вводим переменную с необходимым формато даты
    const options = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: '2-digit'
    };
    let now = new Date().toLocaleString('ru-RU', options);

    //   пополняем список после заполнения полей ввода

    comments.push({
        name: addFormName.value,
        time: now,
        text: addFormText.value,
        counter: 0,
        isLiked: false
    });

    initLikeButtons();
    renderComments();
    //   очищать поля ввода после добавления списка
    addFormName.value = "";
    addFormText.value = "";
});

initLikeButtons();
renderComments();