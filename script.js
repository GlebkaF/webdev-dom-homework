const addButton = document.querySelector('.add-form-button');
const commentName = document.querySelector('.add-form-name');
const commentText = document.querySelector('.add-form-text');
const commentsList = document.querySelector('.comments');
const addForm = document.querySelector('.add-form');

let comments = [];

function getData () {
    fetch("https://webdev-hw-api.vercel.app/api/v1/daria/comments", {
        method: "GET",
    })
    .then((response) => {
        return response.json();
})
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date).toLocaleString().slice(0,-3),
                    text: comment.text,
                    likes: comment.likes,
                    likeStatus: false,
                }
            })
    
            comments = appComments;
            renderComments();       
        })
}
getData();


const initLikesButton = () => {
    const likesButtons = document.querySelectorAll('.like-button');

    for (const likesButton of likesButtons) {
        likesButton.addEventListener('click', (event) => {
            event.stopPropagation();

            const index = likesButton.dataset.index;
            const status = comments[index].likeStatus;
            const value = +comments[index].likes;

            if (status === '-active-like') {
                comments[index].likes = value - 1;
                comments[index].likes
                comments[index].likeStatus = '';
                likesButton.classList.remove('-active-like');
            } else {
                comments[index].likes = value + 1;
                console.log(comments[index].likes)
                comments[index].likeStatus = '-active-like';
                likesButton.classList.add('-active-like');
            }

            renderComments();
        })
    }
}

const addReply = () => {
    const commentsElements = document.querySelectorAll('.comment');

    for (const commentsElement of commentsElements) {

        commentsElement.addEventListener('click', () => {

            const index = commentsElement.dataset.index;
            const mentionText = comments[index].text;
            const mentionName = comments[index].name;
            const newCommentText = `QUOTE_BEGIN ${mentionText} \n ${mentionName} QUOTE_END \n`;
            commentText.value = newCommentText;

            renderComments();
        })
    }
}

function formatDate() {
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
    return currentDate;
}

const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {

        return `<li class="comment" data-index="${index}">
        <div class="comment-header">
            <div>${comment.name.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")} </div>
            <div>${comment.date} </div>
        </div>
        <div class="comment-body"> 
            <div class="comment-text">
            ${comment.text.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
                .replaceAll('QUOTE_BEGIN', "<div class='quote'>")
                .replaceAll('QUOTE_END', "</div>")
            }
        <button class="edit-button" data-index="${index}">Редактировать</button>
            </div>
        </div>
        <div class="comment-footer"> 
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button ${comment.likeStatus}" data-index="${index}"</button>
            </div>
        </div> 
    </li>`
    }).join("");

    commentsList.innerHTML = commentsHtml;

    initLikesButton();
    addReply();
}

renderComments();

const addToServer = (comment) => {
    
    fetch ("https://webdev-hw-api.vercel.app/api/v1/daria/comments", {
        method: "POST",
        body: JSON.stringify(comment)
    }).then((response) => {
        return response.json();
    })
    .then((responseData) => {
            console.log(responseData);
            return getData();
        })
    }

const addToList = () => {

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

    const newComment = {
        name: commentName.value
        .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        text: commentText.value
        .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        date:     formatDate(),
        like: 0,
        likeStatus: false,
    }

    console.log(newComment);

    addToServer(newComment);

    commentName.value = '';
    commentText.value = '';
    addButton.setAttribute('disabled', '');
}

addButton.setAttribute('disabled', '');

commentName.addEventListener('input', () => {
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

addButton.addEventListener('click', () => {
    addToList();
})

addForm.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        addToList();
    }
})

const removeButton = document.querySelector('.remove-form-button');

removeButton.addEventListener('click', () => {

    comments.pop();
    renderComments();
});