"use strict"

const cardElements = document.getElementById("commentsId");
const btnElement = document.getElementById("btnId");
const inputName = document.getElementById("nameTextId");
const inputText = document.getElementById("commentTextId");
const likeElement = document.getElementsByClassName("like-button");

// массив людей
const commentators = [
    {
        name: 'Глеб Фокин',
        data: '12.02.22 12:18',
        textComment: "Это будет первый комментарий на этой странице",
        likeQuantity: 3,
        LikeActive: false
        
    },
    {
        name: 'Варвара Н.',
        data: '13.02.2022 19:22',
        textComment: "Мне нравится как оформлена эта страница! ❤",
        likeQuantity: 75,
        LikeActive: true
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
        element.parentElement.classList.add('del-card');
    }, 300)
    element.classList.remove('del');
    element.classList.add('exet-del');
}

const commentDel = () => {
    const btnFormElement = document.querySelectorAll(".del");
    btnFormElement.forEach((element) => {
        element.addEventListener('click', () => {
            getDelCard(element);
            setTimeout(() => {
                const indexElement = element.dataset.index;
                commentators.splice(+indexElement, 1);
                renderComments()
            },800)

        })
    })
}


function addLike () {
    Array.from(likeElement).forEach((element,index) => {
        element.addEventListener('click', () => {
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

const clickEventEditComment = () => {
    const redirectElements = document.querySelectorAll(".red");
    const textElements = document.querySelectorAll(".comment-text");
    redirectElements.forEach((redirectElement,indexDel) => {
        redirectElement.addEventListener('click', () => {
            let text;
            if (redirectElement.innerText === "Редактировать") {
                redirectElement.innerHTML = "Ок"
                
                textElements[indexDel].innerHTML = `<textarea type="textarea"  class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>`;
                
    
            } else { 
                redirectElement.innerHTML = "Редактировать"
                commentators[indexDel].textComment = '';
                commentators[indexDel].textComment = textElements[indexDel].value;
                renderComments();
            }
        })
    })
}


// Рендер

const getLikeClass = (element) => {
    return element ? "like-button -active-like" : "like-button";
}

const renderComments = () => {

    const commentatorsHtml = commentators.map((commentator, index) => {
        return `<li class="comment ${commentator.animationClass}">
        <i class='bx bx-x del' data-index="${index}"></i>
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
       <button  class="add-form-button red">Редактировать</button>
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
}

renderComments();


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

    renderComments();
    commentators[commentators.length - 1].animationClass = "";
    document.getElementById("nameTextId").value = '';
    document.getElementById("commentTextId").value = '';
}





document.addEventListener('keyup', (key) => {
    if(key.code === 'Enter'){
        clickEventAddComment()
    }
})

btnElement.addEventListener( 'click', () => clickEventAddComment())
log("It works!");