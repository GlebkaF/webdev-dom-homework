import * as login from './renderLogin.js';

const renderStartPage = ({userComment, addComment}) => {
    const app = document.querySelector('.app');
    const commentsHtml = userComment.map((comments, index) => {
    return `
    <li class="comment" data-index=${index}>
    <div class="comment-header">
        <div>${comments.name}</div>
        <div>${comments.date}</div>
    </div>
    <div class="comment-body">
        <div class="comment-text">
            ${comments.comment}
        </div>
    </div>
    <div class="comment-footer">
        <div class="likes">
			<span class="likes-counter">${comments.likes}</span>
			<button class="like-button ${comments.isLike ? "" : "-active-like"}" data-index=${index} data-like=${comments.isLike}></button>
        </div>
    </div>
    </li>`
    }).join('');
    app.innerHTML = `
    <ul class="comments">
        ${commentsHtml}
    </ul>
    <br>
    <div class='authorization'>
        Для добавления нового комментария требуется  
        <button class='authorization_btn'>авторизация</button>
    </div>`
    
    const btnGoAuthorization = document.querySelector('.authorization_btn');
    btnGoAuthorization.addEventListener('click', () => {
        login.renderLogin({userComment, addComment});
    })

    const likeBtns = document.querySelectorAll('.like-button');
    for (const likeBtn of likeBtns) {
        likeBtn.addEventListener('click', () => {
            alert('Авторизируйтесь!')
        })
    }
}

export {renderStartPage}