const {log} = console;
// ------------------
"use strict"
// Добавляем ДОМ элементы
const cardElements = document.getElementById("commentsId");
const btnElement = document.getElementById("btnId");
const inputName = document.getElementById("nameTextId");
const inputText = document.getElementById("commentTextId");
const likeElement = document.getElementsByClassName("like-button");

// массив людей оставивших комменты

const commentators = [
    {
        name: 'Глеб Фокин',
        data: '12.02.2022 12:18',
        textComment: "Это будет первый комментарий на этой странице",
        likeQuantity: 3,
        animationClass: ""
    },
    {
        name: 'Варвара Н.',
        data: '13.02.2022 19:22',
        textComment: "Мне нравится как оформлена эта страница! ❤",
        likeQuantity: 75,
        animationClass: ""
    }
]

// Вспомогательные функции

const addDate = () =>{
    const date = new Date();
    let time = {
        hour: 'numeric',
        minute: 'numeric',
    };
    let year = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }

    return  date.toLocaleString("ru", year) + " " + date.toLocaleString('ru', time);
}

const getDelCard = (element) => {
    element.parentElement.parentElement.classList.add('del-card');
}
const btnErrAdd = () => {
    btnElement.classList.add("btn-error");
    setTimeout(() =>{
        btnElement.classList.remove("btn-error");
    },500)

}


const commentDel = () => {
    const btnFormElement = document.querySelectorAll(".del");
    btnFormElement.forEach((element) => {
        element.addEventListener('click', () => {
            getDelCard(element)
            setTimeout(() => {
                const indexElement = element.dataset.index;
                commentators.splice(+indexElement, 1);
                renderComments()
            },500)

        })
    })
}

// рендер




// Функция добавления лайка
function search () {
    Array.from(likeElement).forEach((element,index) => {
        element.addEventListener('click', () => {
            const condition = element.className.split(" ")
            if (condition.includes("-active-like")){
                element.classList.remove("-active-like");
                const parent = element.parentElement;
                const number = parent.firstElementChild;
                number.innerHTML = +(number.innerText) - 1;
            } else {
                element.classList.add("-active-like")
                const parent = element.parentElement;
                const number = parent.firstElementChild;
                number.innerHTML = +(number.innerText) + 1;
            }

        })
    })
}

// function red () {
//     const redButtonElement = document.querySelectorAll(".red");
//     const delButtonElement = document.querySelectorAll(".del");
//     const commentTextElement = document.querySelectorAll(".comment-text")
//
//     redButtonElement.forEach((element, index) => {
//         element.addEventListener('click',() =>{
//             const ok = delButtonElement[index];
//             const myObject = commentators[index]
//             log(myObject)
//
//             if (element.innerHTML === "Отмена"){
//                 delButtonElement[index].innerHTML = "Удалить";
//                 element.innerHTML = "Редактировать";
//                 return;
//             }
//             ok.innerHTML = "Ок";
//             element.innerHTML = "Отмена";
//             const inputOnComment = commentTextElement[index];
//             inputOnComment.innerHTML = `<input
//             type="text"
//             placeholder="Введите ваш коментарий"
//             class="add-form-name"
//             />`;
//
//
//
//             ok.addEventListener('click', () => {
//                 const text  = inputOnComment.value
//                 console.log(inputOnComment.value)
//                 myObject.textComment = text
//                 setTimeout(() => {
//                     commentators.push(myObject);
//                     renderComments()
//                 },500)
//             })
//
//         })
//     })
// }

// Рендер

const renderComments = () => {
    const commentatorsHtml = commentators.map((commentator, index) => {
        return `<li class="comment ${commentator.animationClass}">
      <div class="comment-header">
        <div>${commentator.name}</div>
        <div>${commentator.data}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${commentator.textComment}
        </div>
      </div>
      <div class="comment-footer comment-footer_new">
       <button data-index="${index}" class="add-form-button del">Удалить</button>
        <div class="likes">
          <span class="likes-counter">${commentator.likeQuantity}</span>
          <button class="like-button"></button>
        </div>
      </div>
    </li>`;
    }).join("");
    cardElements.innerHTML = commentatorsHtml;
    // red()
    commentDel();
    search();
}

renderComments();

// Функция добавления нового комментария

const clickEvent = () => {
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
        btnErrAdd()
        return;
    }

    if (inputText.value.length === 0) {
        inputText.classList.add("error");
        btnErrAdd()
        return;
    }

    commentators.push(
        {
            name: inputName.value,
            data: addDate(),
            likeQuantity: 0,
            textComment: inputText.value,
            animationClass: "comment_animation"
        }
    )

    // рендер

    renderComments()
    commentators[commentators.length - 1].animationClass = ""
    document.getElementById("nameTextId").value = '';
    document.getElementById("commentTextId").value = '';
}





document.addEventListener('keyup', (key) => {
    if(key.code === 'Enter'){
        clickEvent()
    }
})

btnElement.addEventListener( 'click', () => clickEvent())
log("It works!");