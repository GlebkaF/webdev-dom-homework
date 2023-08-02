
"use strict"
// Добавляем ДОМ элементы
const cardElements = document.getElementById("commentsId");
const btnElement = document.getElementById("btnId");
const inputName = document.getElementById("nameTextId");
const inputText = document.getElementById("commentTextId");
const likeElement = document.getElementsByClassName("like-button");
const formBg = document.querySelector('.add-form'); 
let textAnswerHtml = "";
let indexOld = 0;
// массив людей оставивших комменты
log(likeElement);
const commentators = [
    {
        name: 'Глеб Фокин',
        data: '12.02.22 12:18',
        textComment: "Это будет первый комментарий на этой странице",
        likeQuantity: 3,
        LikeActive: false,
        isEdit: false,
        isQuote: false,
        animationClass: "",
        isAnswers: "",
        isReduction: true
        
    },
    {
        name: 'Варвара Н.',
        data: '13.02.22 19:22',
        textComment: "Мне нравится как оформлена эта страница! ❤",
        likeQuantity: 75,
        LikeActive: true,
        isEdit: false,
        isQuote: false,
        animationClass: "",
        isAnswers: "",
        isReduction: true
    }
]
// Вспомогательные функции
const addDate = () =>{
    const date = new Date();
    let time = {
        hour: 'numeric',
        minute: 'numeric'
    };
    let year = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
    }
    return  date.toLocaleString("ru", year) + " " + date.toLocaleString('ru', time);
}
const btnErrAdd = () => {
    btnElement.classList.add("btn-error");
    setTimeout(() =>{
        btnElement.classList.remove("btn-error");
    },500)
}
const getDelCard = (element) => {
    setTimeout(() => {
        element.closest('.like-button').classList.add('del-card');
    }, 300)
    element.classList.remove('del');
    element.classList.add('exet-del');
}
const commentDel = () => {
    const btnFormElement = document.querySelectorAll(".del");
    btnFormElement.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            getDelCard(element);
            setTimeout(() => {
                const indexElement = element.dataset.index;
                commentators.splice(indexElement, 1);
                renderComments()
            },800)
        })
    })
}
const answComment = () => {
    const comments = document.querySelectorAll('.comment-text');
    comments.forEach((comment,index) => {
        comment.addEventListener('click', () => {
            formBg.classList.add('comment-new-bg');
            const commentator = commentators[index]
            const oldComment = commentator.textComment
            inputText.placeholder = `Введите Ответ Пользователю ${commentator.name}`;
            textAnswerHtml = oldComment;    
            indexOld = index;
        })
    });
} 
// Функция добавления лайка
function addLike () {
    Array.from(likeElement).forEach((element,index) => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            const commentator = commentators[index];
            if (commentator.LikeActive === true) {
                commentator.LikeActive = false;
                commentator.likeQuantity -= 1;
                renderComments();
                
            } else {
                commentator.LikeActive = true;
                commentator.likeQuantity += 1;
                renderComments()
            }
        })
    })
}
// Функция редактирования комментария
const clickEventEditComment = () => {
    const redirectElements = document.querySelectorAll(".red");
    redirectElements.forEach((redirectElement, indexEl) => {
        redirectElement.addEventListener('click', (e) => {
            e.stopPropagation();
            log(redirectElement.innerHTML); 
            const index = redirectElement.dataset.index;
            const comment =  commentators[index];
            log(comment);
            if (comment.isEdit) {
                const edit = document.querySelector('.add-edit');
                log(edit);
                comment.textComment = edit.value;
                if (comment.textComment.length === 0) {
                    commentators.splice(index,1);
                }
                comment.isEdit = false;
            } else {
                comment.isEdit = true;
            }
            renderComments();
        })
    })
}
// Рендер
const getLikeClass = (element) => {
    return element ? "like-button -active-like" : "like-button";
}
const renderComments = () => {
    
    const commentatorsHtml = commentators.map((commentator, index) => {
        const edit = commentator.isEdit;
        return `<li class="comment ${commentator.animationClass}">
        <i class='bx bx-x del' data-index="${index}"></i>
      <div class="comment-header">
        <div>${commentator.name}</div>
        <div>${commentator.data}</div>
      </div>
      <div class="comment-body">
            ${commentator.isAnswers.length !== 0 ? `<div class="c">${commentator.isAnswers}</div>`: ""}
          ${edit ? `<textarea type="textarea" class="add-form-text add-edit" placeholder="Введите ваш коментарий" rows="4">${commentator.textComment}</textarea>` : `<div class="comment-text">${commentator.textComment}</div>`}
   
      <div class="comment-footer comment-footer_new">
        ${commentator.isReduction ? `<button  class="add-form-button red" data-index="${index}">Редактировать</button>` : ''}
        <div class="likes">
          <span class="likes-counter">${commentator.likeQuantity}</span>
          <button class="${getLikeClass(commentator.LikeActive)}"></button>
        </div>
      </div>
    </li>`;
    }).join("");
    cardElements.innerHTML = commentatorsHtml;
    commentDel();
    addLike();
    clickEventEditComment();
    answComment();
}


renderComments();

const eventErrors = (element) => {
    return element
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
}
// Функция добавления нового комментария
const clickEventAddComment = () => {
    inputText.classList.remove("error");
    inputName.classList.remove("error");
    if (inputText.value.length === 0 && inputName.value.length === 0) {
        inputName.classList.add("error");
        inputText.classList.add("error");
        btnErrAdd()
        return;
    }
    if (inputName.value.length === 0) {
        inputName.classList.add("error");
        btnErrAdd();
        return;
    }
    if (inputText.value.length === 0) {
        inputText.classList.add("error");
        btnErrAdd()
        return;
    }
    formBg.classList.remove('comment-new-bg');
    inputText.placeholder = 'Введите ваш коментарий'
    const commentText = document.querySelectorAll('.comment-text');
                const isAnswerTest =  commentText[indexOld].innerText === textAnswerHtml;
    const test = () => isAnswerTest ? textAnswerHtml : "";
    commentators.push(
        {
            name: eventErrors(inputName.value),
            textComment: eventErrors(inputText.value),
            data: addDate(),
            likeQuantity: 0,
            animationClass: "comment_animation",
            isQuote: false,
            isAnswers: test(),
            isReduction: true
            }
    )
    renderComments();
    commentators[commentators.length - 1].animationClass = "";
    document.getElementById("nameTextId").value = '';
    document.getElementById("commentTextId").value = '';
    textAnswerHtml = ""
}
document.addEventListener('keyup', (key) => {
    if(key.code === 'Enter'){
        clickEventAddComment()
    }
})
btnElement.addEventListener( 'click', () => clickEventAddComment())
log("It works!");