import { fetchArray, arrayPost } from "./api.js"
import { renderComments } from "./render.js";


const nameElement = document.getElementById("inputName");
const textElement = document.getElementById("inputText");
const buttonElement = document.getElementById("buttonPush");

export function getToken() {
    const token = `Bearer ${autoInfo.user.token}`;
    return token;
}

export let autoInfo = JSON.parse(localStorage.getItem("user"));
export const userLogin = (dataInfo) => {
    autoInfo = dataInfo;

}



export let commentsArray = [

];

fetchArray();

export const setComments = (comments) => {
    commentsArray = comments;
};

export const initEdit = () => {
    let edit = document.querySelectorAll('.edit-button');

    for (const editButoon of edit) {
        const index = editButoon.dataset.edit;
        const isEditValue = commentsArray[index].isEdit;
        console.log(isEditValue);
        if (!isEditValue) {

            editButoon.addEventListener('click', (event) => {
                event.stopPropagation();
                const index = editButoon.dataset.edit;
                commentsArray[index].isEdit = true;

                renderComments(commentsArray);
            })
        } else {
            editButoon.addEventListener('click', (event) => {
                let textComment = document.querySelector('.text-comment');
                event.stopPropagation();

                const index = editButoon.dataset.edit;
                const comment = commentsArray[index].comment;

                const value = document.querySelector('input');

                commentsArray[index].comment = value.value;
                commentsArray[index].isEdit = false;
                renderComments(commentsArray);
            })
        }
    }


};



export const initDeleteButtonsListeners = () => {
    const deleteButtonsElements = document.querySelectorAll(".delete-button");
    for (const deleteButtonsElement of deleteButtonsElements) {
        deleteButtonsElement.addEventListener('click', (event) => {
            event.stopPropagation();
            console.log("Удаляю элемент...");
            const index = deleteButtonsElement.dataset.index;
            console.log(index);
            commentsArray.splice(index, 1);
            renderComments(commentsArray);



        });
    };

};





initDeleteButtonsListeners();


export const likes = () => {
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
            renderComments(commentsArray);
        });
    };
};


export const answer = () => {
    const answerElement = document.querySelectorAll(".answer-button");
    for (const answerElements of answerElement) {
        answerElements.addEventListener('click', (event) => {
            event.stopPropagation();

            const answerIndex = answerElements.dataset.answer;
            const addFormText = document.querySelector(".add-form-text");

            addFormText.value = `${commentsArray[answerIndex].name} \n ${commentsArray[answerIndex].comment}`


            renderComments(commentsArray);






        });

    };
};

answer();






export function fieldSubmit(event) {
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






export function addPost() {
    const nameElement = document.getElementById("inputName");
    const textElement = document.getElementById("inputText");
    const buttonElement = document.getElementById("buttonPush");
    buttonElement.addEventListener('click', () => {

        nameElement.classList.remove('error');
        textElement.classList.remove('error');

        if ((nameElement.value || textElement.value) === '') {
            nameElement.classList.add('error');
            textElement.classList.add('error');
            return;
        }





        arrayPost();






    });
}
