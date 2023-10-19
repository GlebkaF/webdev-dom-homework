const nameElement = document.getElementById("inputName");
const textElement = document.getElementById("inputText");
const buttonElement = document.getElementById("buttonPush");
const ulElement = document.getElementById("ul");
const text = document.getElementById("comment-text");
const editButton = document.getElementById("edit-button");



const initEdit = () => {
    let edit = document.querySelectorAll('.edit-button');


    for (const editButoon of edit) {
        const index = editButoon.dataset.edit;
        const isEditValue = commentsArray[index].isEdit;
        if (!isEditValue) {



            editButoon.addEventListener('click', () => {

                const index = editButoon.dataset.edit;

                const commentEdit = commentsArray[index];

                commentsArray[index].isEdit = true;




                renderComments();
            })
        } else {
            editButoon.addEventListener('click', () => {
                let textComment = document.querySelectorAll('.comment-text');
                console.log(textComment)

                const index = editButoon.dataset.textComment;
                const indexArr = commentsArray[index];
                console.log(indexArr)


                textComment.value = commentsArray[index].comment;
                renderComments();
            })
        }
    }


};



const initDeleteButtonsListeners = () => {
    const deleteButtonsElements = document.querySelectorAll(".delete-button");
    for (const deleteButtonsElement of deleteButtonsElements) {
        deleteButtonsElement.addEventListener('click', (event) => {
            event.stopPropagation();
            console.log("Удаляю элемент...");
            const index = deleteButtonsElement.dataset.index;
            console.log(index);
            commentsArray.splice(index, 1);
            renderComments();



        });
    };

};




const commentsArray = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        comment: 'Это будет первый комментарий на этой странице',
        like: 3,
        userLike: false,
        paint: '',
        isEdit: false
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        comment: 'Мне нравится как оформлена эта страница! ❤',
        like: 75,
        userLike: true,
        paint: '-active-like',
        isEdit: false
    }
];

initDeleteButtonsListeners();


const likes = () => {
    const likeButtons = document.querySelectorAll('.like-button');
    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = likeButton.dataset.index;
            if (commentsArray[index].userLike === false) {
                commentsArray[index].paint = '-active-like';
                commentsArray[index].like += 1;
                commentsArray[index].userLike = true;
            } else {
                commentsArray[index].paint = '';
                commentsArray[index].like -= 1;
                commentsArray[index].userLike = false;
            }
            renderComments();
        });
    };
};


const answer = () => {
    const answerElement = document.querySelectorAll(".answer-button");
    for (const answerElements of answerElement) {
        answerElements.addEventListener('click', () => {

            const answerIndex = answerElements.dataset.answer;
            const addFormText = document.querySelector(".add-form-text");

            addFormText.value = `${commentsArray[answerIndex].name} \n ${commentsArray[answerIndex].comment}`


            renderComments();






        });

    };
};

answer();



const renderComments = () => {
    const commentsHtml = commentsArray.map((item, index) => {

        return `
          <li class="comment" data-answer="${index}">
                <div class="comment-header">
                  <div>${item.name}</div>
                  <div>${item.date}</div>
                </div>
                <div class="comment-body">
                ${!item.isEdit ? `<div data-comment='${index}' class="comment-text" >
                ${item.comment}
                
                
              </div > ` : `<input value='${item.comment}'>`}

    
                  
                </div >
    <div class="comment-footer">
    <button data-answer="${index}" class="answer-button">Ответить</button>
        <button data-edit="${index}" class="edit-button">${!item.isEdit ? "Редактировать" : "Сохранить"}</button>
        <button data-index='${index}' class="delete-button">Удалить</button>
        

        <div class="likes">
            <span class="likes-counter">${item.like}</span>
            <button data-index='${index}' class="like-button ${item.paint}"</button>

    </div>
                </div >
                
              </li >
    `})
        .join('');
    ulElement.innerHTML = commentsHtml;
    likes();
    initDeleteButtonsListeners();
    initEdit();
    answer();




};
renderComments();


buttonElement.disabled = true;
nameElement.addEventListener('input', () => {
    if ((nameElement.value === '') || (textElement.value === '')) {
        buttonElement.disabled = true;
        return;
    }
    else {
        buttonElement.disabled = false;
        return;
    }
});

textElement.addEventListener('input', () => {
    if ((textElement.value === '') || (nameElement.value === '')) {
        buttonElement.disabled = true;
        return;
    }
    else {
        buttonElement.disabled = false;

        return;
    }
})








function fieldSubmit(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("buttonPush").click();
    }
}

document.getElementById("textElement")
document.addEventListener("keyup", fieldSubmit);




function buttonHide() {
    if (!textElement.value || !nameElement.value) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    };

};


nameElement.addEventListener("input", buttonHide);
textElement.addEventListener("input", buttonHide);



buttonElement.addEventListener('click', () => {
    nameElement.classList.remove('error');
    textElement.classList.remove('error');

    if ((nameElement.value || textElement.value) === '') {
        nameElement.classList.add('error');
        textElement.classList.add('error');
        return;
    }



    const currentDate = new Date();
    const dateString = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()} `;

    commentsArray.push({
        name: nameElement.value,
        date: dateString,
        comment: textElement.value 
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;"),
        like: 0,
        userLike: false,
        paint: '',
        isEdit: false

    });
    renderComments();

    nameElement.value = '';
    textElement.value = '';
    buttonElement.disabled = true;
});

buttonElement.disabled = true;
