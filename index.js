const {log} = console;
// ------------------
"use strict"
// Добавляем ДОМ элементы
const formBg = document.querySelector('.add-form'); 
let loud = false;

// рендерим форму отправки
const formRender =  () => {
    if(loud){
        if(!formBg.classList.contains('new-form')){
            formBg.classList.add('new-form');
        }
        formBg.innerHTML = `<img class="louder" src="./loud.gif" alt="louding">`
    } else {
        formBg.classList.remove('new-form');
        formBg.innerHTML = `<input
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
        id="nameTextId"
        />
        <textarea
                type="textarea"
                class="add-form-text"
                placeholder="Введите ваш коментарий"
                rows="4"
                id="commentTextId"
        ></textarea>
        <div class="add-form-row">
            <button class="add-form-button" id="btnId">Написать</button>
        </div>`;
        renderClickBtn()
    }
}
// 
const cardElements = document.getElementById("commentsId");
const likeElement = document.getElementsByClassName("like-button");
const btnElement = document.getElementById("btnId");

let commentators = [];
let isAnswer = "";
let indexOld = 0;
// массив людей оставивших комменты
const getAPI = () => {
    if(!loud){
        loud = true;
        formRender()
    }
    return fetch('https://wedev-api.sky.pro/api/v1/:ni/comments',
        {
            method: "GET"
        })
        .then(data => data.json())
        .then(dataJson => {
            commentators = dataJson.comments;
            renderComments();
        })
        .then(() => {
            loud = false;
            formRender();
        })
        
    }
getAPI()


const postAPI = (inputText,inputName) => {
    return fetch('https://wedev-api.sky.pro/api/v1/:ni/comments',
    {
        method: "POST",
        body: JSON.stringify({
            text: inputText.value,
            name: inputName.value
        })
    })
        .then(() => {
            getAPI();
        })
}



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
            commentator.text = `@mail@${commentator.text}@mail@`
            inputText.placeholder = `Введите Ответ Пользователю ${commentator.author.name}`;
            isAnswer = commentator.text;    
            indexOld = index;
            isAnswer = isAnswer.replaceAll('@mail@', "")
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


    const test = () =>{
        const commentText = document.querySelectorAll('.comment-text');
        if (commentText[indexOld] !== undefined) {
            const isAnswerTest =  commentText[indexOld].innerText === isAnswer;
            return isAnswerTest ? true : false;
        }
        return false;
    }


// Рендер

const getLikeClass = (element) => {
    return element ? "like-button -active-like" : "like-button";
}

// рендер комментариев

const renderComments = () => {
    const commentatorsHtml = commentators.map((commentator, index) => {
        return `<li id="#form" class="comment ">
        <i class='bx bx-x del' data-index="${index}"></i>
      <div class="comment-header">
        <div>${commentator.author.name}</div>
        <div>${addDate(commentator.date)}</div>
      </div>
      <div class="comment-body">
            ${test(isAnswer) ? `<div class="c">${isAnswer}</div>`: ""}
          <div class="comment-text">${commentator.text}</div>
   
      <div class="comment-footer comment-footer_new">
       
          <span class="likes-counter">${commentator.likes}</span>
          <button class="${getLikeClass(commentator.isLiked)}"></button>
        </div>
      </div>
    </li>`;
    }).join("");
    cardElements.innerHTML = commentatorsHtml;
    // commentDel();
    addLike();
    // clickEventEditComment();
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

function renderClickBtn () {

    const inputName = document.getElementById("nameTextId");
    const inputText = document.getElementById("commentTextId"); 
    const btnElement = document.getElementById("btnId");

    function btnErrAdd () {
        btnElement.classList.add("btn-error");
        setTimeout(() =>{
            btnElement.classList.remove("btn-error");
        },500)
    }

    // function btnCompete () {
    //     btnElement.classList.add("btn-complete");
    // }

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
    loud = true;
    formRender();

    postAPI(inputText,inputName);
    

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
    // btnCompete()

    renderComments();

})
}



log("It works!");


