"use strict";
    
const commentList = document.querySelector('.comments');
const startingElement = document.querySelector('.starting');
const addFormElement = document.querySelector('.add-form');
const waitingElement = document.querySelector('.add-waiting');
const nameElement = document.querySelector('.add-form-name');
const textElement = document.querySelector('.add-form-text');
const addButton = document.querySelector('.add-form-button');
const removeButton = document.querySelector('.remove-form-button');

let comments = [];
let isStarting = true;
let isWaiting = false;

const startFetch = () => {
    fetch("https://webdev-hw-api.vercel.app/api/v1/dmitry-teleganov/comments", {
        method: "GET"
    })
    .then(response => response.json())
    .then(responseData => {
        comments = responseData.comments;
        isStarting = false;
        isWaiting = false;

        renderComments();
    });
}
const renderComments = () => {
    commentList.innerHTML = comments.map((comment, index) => {
        return `
            <li class="comment" data-index="${index}">
                <div class="comment-header">
                    <div>${comment.author.name}</div>
                    <div>${correctDate(comment.date)}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">
                        ${comment.text}
                    </div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button 
                            class="like-button 
                                ${comment.isLiked ? '-active-like' : ''} 
                                ${comment.isLikeLoading ? '-loading-like' : ''}" 
                            data-index="${index}"></button>  
                    </div>
                </div>
            </li>`;
    }).join('');

    checkFirstStart();
    checkWaiting();
    checkAddButton();
    activateAddButton();
    likeComment();
    answerComment();
}

const checkFirstStart = () => {
    if (isStarting) {
        startingElement.classList.remove('hidden');
        commentList.classList.add('hidden');
    } else {
        commentList.classList.remove('hidden');
        startingElement.classList.add('hidden');
    }
}
const checkWaiting = () => {
    if (isWaiting) {
        waitingElement.classList.remove('hidden');
        addFormElement.classList.add('hidden');
    } else {
        addFormElement.classList.remove('hidden');
        waitingElement.classList.add('hidden');
    }
}
const checkAddButton = () => {
    if (!nameElement.value.trim() || !textElement.value.trim()) {
    addButton.disabled = true;
    }
}
const activateAddButton = () => {
    nameElement.addEventListener('input', () => {
    if (textElement.value.trim()) {
        addButton.disabled = false;
    }
    });
    textElement.addEventListener('input', () => {
    if (nameElement.value.trim()) {
        addButton.disabled = false;
    }
    });
}
const likeComment = () => {
    const likeButtons = document.querySelectorAll('.like-button');

    for (let button of likeButtons) {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        
        let index = button.dataset.index;
        comments[index].isLikeLoading = true;

        renderComments();

        delay(2000).then(() => {
        if(comments[index].isLiked) {
            comments[index].likes--;
        } else {
            comments[index].likes++;
        }

        comments[index].isLiked = !comments[index].isLiked;
        comments[index].isLikeLoading = false;

        renderComments();
        });
    });
    }
}
const answerComment = () => {
    const commentElements = document.querySelectorAll('.comment');

    for (let element of commentElements) {
    element.addEventListener('click', () => {
        let index = element.dataset.index;

        textElement.value = `START_QUOTE${comments[index].author.name}:\n${comments[index].text.replaceAll('<div class="comment-quote">', 'START_QUOTE').replaceAll('</div>', 'END_QUOTE')}END_QUOTE`;
    });
    }
}
const handlePostClick = () => {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/dmitry-teleganov/comments", {
    method: "POST",
    body: JSON.stringify({
        name: replaceValue(nameElement.value),
        text: replaceValue(textElement.value)
        .replaceAll('START_QUOTE', '<div class="comment-quote">')
        .replaceAll('END_QUOTE', '</div>'),
        forceError: true
    })
    })
    .then(response => {
    if (response.status === 400) throw new Error('Ошибка 400');
    if (response.status === 500) throw new Error('Ошибка 500');

    response.json();
    })
    .then(() => {
    nameElement.value = '';
    textElement.value = '';

    return startFetch();
    })
    .catch(error => {
    if (error.message === 'Ошибка 400') {
        alert('Имя и комментарий должны быть не короче 3 символов');
    } else if (error.message === 'Ошибка 500') {
        alert('Сервер сломался, попробуй позже');
    } else {
        alert('Кажется, у вас сломался интернет, попробуйте позже');
    }

    isWaiting = false;

    renderComments();
    });
}

const addComment = () => {
    if (!nameElement.value.trim()) {
    nameElement.classList.add('form-error');
    checkAddButton();
    return;
    } else if (!textElement.value.trim()) {
    textElement.classList.add('form-error');
    checkAddButton();
    return;
    } else {
    isWaiting = true;

    renderComments();

    fetch("https://webdev-hw-api.vercel.app/api/v1/dmitry-teleganov/comments", {
        method: "POST",
        body: JSON.stringify({
        name: replaceValue(nameElement.value),
        text: replaceValue(textElement.value)
            .replaceAll('START_QUOTE', '<div class="comment-quote">')
            .replaceAll('END_QUOTE', '</div>'),
        forceError: true
        })
    })
    .then(response => {
        if (response.status === 400) throw new Error('Ошибка 400');
        if (response.status === 500) throw new Error('Ошибка 500');

        response.json();
    })
    .then(() => {
        nameElement.value = '';
        textElement.value = '';

        return startFetch();
    })
    .catch(error => {
        if (error.message === 'Ошибка 400') {
        alert('Имя и комментарий должны быть не короче 3 символов');
        } else if (error.message === 'Ошибка 500') {
        alert('Сервер сломался, попробуй позже');

        handlePostClick();
        } else {
        alert('Кажется, у вас сломался интернет, попробуйте позже');
        }

        isWaiting = false;

        renderComments();
    });
    }

    nameElement.classList.remove('form-error');
    textElement.classList.remove('form-error');
}
const deleteLastComment = () => {
    comments.pop();

    renderComments();
}

const delay = (interval = 300) => {
    return new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, interval);
    });
}
const replaceValue = value => {
    return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
const correctDate = date => {
    let year = editYear((new Date(date)).getFullYear());
    let month = addZeroBefore((new Date(date)).getMonth() + 1);
    let day = addZeroBefore((new Date(date)).getDate());
    let hours = addZeroBefore((new Date(date)).getHours());
    let minutes = addZeroBefore((new Date(date)).getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}
const addZeroBefore = num => String(num).length < 2 ? '0' + num : num;
const editYear = year => String(year)[2] + String(year)[3];

startFetch();
renderComments();

addButton.addEventListener('click', addComment);
textElement.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
    addComment();
    }
});
removeButton.addEventListener('click', deleteLastComment);