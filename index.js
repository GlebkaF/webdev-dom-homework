const {log} = console;
// ------------------
"use strict"
// Добавляем ДОМ элементы
const cardElements = document.getElementById("commentsId");
const btnElement = document.getElementById("btnId");
const inputName = document.getElementById("nameTextId");
const inputText = document.getElementById("commentTextId");
const likeElement = document.getElementsByClassName("like-button");
const formBg = document.querySelector('.add-form'); 
let commentators = [];
// let textAnswerHtml = "no";
let indexOld = 0;
// массив людей оставивших комменты

log(likeElement);
const getAPI = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/:nik/comments',
        {
            method: "GET"
        })
        .then(data => data.json())
        .then(dataJson => {
            commentators = dataJson.comments;
            renderComments();
        })
    }

getAPI()



// const commentators = [
//     {
//         name: 'Глеб Фокин',
//         date: '12.02.22 12:18',
//         text: "Это будет первый комментарий на этой странице",
//         likes: 3,
//         isLiked: false,
//         isEdit: false,
//         isQuote: false,
//         animationClass: "",
//         isAnswers: "",
//         isReduction: false
        
//     },
//     {
//         name: 'Варвара Н.',
//         date: '13.02.22 19:22',
//         text: "Мне нравится как оформлена эта страница! ❤",
//         likes: 75,
//         isLiked: true,
//         isEdit: false,
//         isQuote: false,
//         animationClass: "",
//         isAnswers: "",
//         isReduction: false
//     }
// ]

// Вспомогательные функции

const addDate = (date) =>{
    date = new Date(date);
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
        element.closest('.comment').classList.add('del-card');
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
    // const btnElement = document.getElementById("btnId"); 
    comments.forEach((comment,index) => {
        comment.addEventListener('click', () => {
            formBg.classList.add('comment-new-bg');
            const commentator = commentators[index]
            const oldComment = commentator.text
            inputText.placeholder = `Введите Ответ Пользователю ${commentator.author.name}`;
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
            if (commentator.isLiked === true) {
                commentator.isLiked = false;
                commentator.likes -= 1;
                renderComments();
                
            } else {
                commentator.isLiked = true;
                commentator.likes += 1;
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
                comment.text = edit.value;
                if (comment.text.length === 0) {
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
        return `<li id="#form" class="comment ">
        <i class='bx bx-x del' data-index="${index}"></i>
      <div class="comment-header">
        <div>${commentator.author.name}</div>
        <div>${addDate(commentator.date)}</div>
      </div>
      <div class="comment-body">
            ${commentator.isAnswers !== undefined && isNaN(commentator.isAnswers) && commentator.isAnswers.length !== 0 ? `<div class="c">${commentator.isAnswers}</div>`: ""}
          <div class="comment-text">${commentator.text}</div>
   
      <div class="comment-footer comment-footer_new">
       
          <span class="likes-counter">${commentator.likes}</span>
          <button class="${getLikeClass(commentator.isLiked)}"></button>
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



btnElement.addEventListener( 'click', () => {
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

    // formBg.classList.remove('comment-new-bg');
    // inputText.placeholder = 'Введите ваш коментарий'
    // const commentText = document.querySelectorAll('.comment-text');
    // const test = () =>{
    //     if (commentText[indexOld] !== undefined) {
    //         const isAnswerTest =  commentText[indexOld].innerText === textAnswerHtml;
    //         return isAnswerTest ? textAnswerHtml : "";
    //     }
    //     return "";
    // }

    fetch('https://wedev-api.sky.pro/api/v1/:nik/comments',
    {
        method: "POST",
        body: JSON.stringify({
            text: inputText.value,
            name: inputName.value
        })
    })
    .then(data => {
        log(data)
        return data.json()
    })
    .then(dataJson => {
        log(dataJson);
        return dataJson;
    })

    getAPI()
    renderComments()
    

    // commentators.push(
    //     {
    //         name: eventErrors(inputName.value),
    //         text: eventErrors(inputText.value),
    //         date: addDate(),
    //         likes: 0,
    //         animationClass: "comment_animation",
    //         isQuote: false,
    //         isAnswers: test(),
    //         isReduction: true
    //         }
    // )
    renderComments();
    commentators[commentators.length - 1].animationClass = "";
    document.getElementById("nameTextId").value = '';
    document.getElementById("commentTextId").value = '';
    textAnswerHtml = ""
})
log("It works!");


