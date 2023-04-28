const addButton = document.querySelector('.add-form-button');
const commentName = document.querySelector('.add-form-name');
const commentText = document.querySelector('.add-form-text');
const commentsList = document.querySelector('.comments');
const addForm = document.querySelector('.add-form');

addButton.setAttribute('disabled', '');

commentName.addEventListener ('input', () => {
    if (commentText.value) {
        addButton.removeAttribute('disabled');
    } else 
    return;
})

commentText.addEventListener('input', () => {
    if (commentName.value) {
        addButton.removeAttribute('disabled');
    } else 
    return;
    })

addButton.addEventListener('click', ()=> {
    showNewComment();
})

addForm.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        showNewComment();
    }
})

function showNewComment() {
    commentName.classList.remove('error');
    if (commentName.value === '') {
        commentName.classList.add('error');
        return;
    }

    commentText.classList.remove('error');
    if (commentText.value === '') {
        commentText.classList.add('error');
        return;
    }

    const newCommentBlock = document.createElement('li');
    newCommentBlock.classList.add('comment');
    const newCommentHeader = document.createElement('div');
    newCommentHeader.classList.add('comment-header');
    const newCommentBody = document.createElement('div');
    newCommentBody.classList.add('comment-body');

    commentsList.appendChild(newCommentBlock);
    newCommentBlock.appendChild(newCommentHeader);
    newCommentBlock.appendChild(newCommentBody);

    const newCommentName = document.createElement('div');
    newCommentName.textContent = commentName.value;
    newCommentHeader.appendChild(newCommentName);

    const newCommentText = document.createElement('div');
    newCommentText.textContent = commentText.value;
    newCommentBody.appendChild(newCommentText);
    newCommentText.classList.add('comment-text');

    const commentDate = new Date();
    const year = commentDate.getFullYear() % 100;

    let month = commentDate.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }    

    let day = commentDate.getDate();
    if (day < 10) {
        day = '0' + day;
    } 

    let hours = commentDate.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    } 

    let minutes = commentDate.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    } 
    
    const currentDate = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;

    const dateBlock = document.createElement('div');
    dateBlock.textContent = currentDate;
    newCommentHeader.appendChild(dateBlock);

    const commentFooter = document.createElement('div');
    commentFooter.classList.add('comment-footer');
    newCommentBlock.appendChild(commentFooter);

    const likesBlock = document.createElement('div');
    likesBlock.classList.add('likes');
    commentFooter.appendChild(likesBlock);

    const likesCounter = document.createElement('span');
    likesCounter.classList.add('lokes-counter');
    likesBlock.appendChild(likesCounter);
    likesCounter.textContent = '0';

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likesBlock.appendChild(likeButton);

    commentName.value = '';
    commentText.value = '';
    addButton.setAttribute('disabled', '');

}

const removeButton = document.querySelector('.remove-form-button');

removeButton.addEventListener ('click', () => {
    const removedElement = commentsList.lastElementChild;
    removedElement.remove();
})
    