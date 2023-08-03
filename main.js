import { getComments, postComments } from "./api.js";
import { likeComment } from "./liking.js";


let comments = [];

const fetchComments = () => {
    // Show loading message when fetching comments begins
    const loadingMessageTop = document.querySelector('.loading-message-top');
    loadingMessageTop.style.display = 'block';

    getComments().then((responseData) => {
        comments = responseData.comments;
        renderComments();
    })
        .then(() => {
            // Hide loading message when comments are rendered 
            loadingMessageTop.style.display = 'none';
        });
};

const generateHtml = (comments) => {
    const commentsListHtml = comments.map((comment, index) => {
        const likeButtonClass = comment.isLiked ? 'like-button liked' : 'like-button';
        const formattedDate = new Date(comment.date).toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
        return `
    <li class="comment">      
      <div class="comment-header">        
        <div class="commentator-name" data-name='${comment.author.name}'>${comment.author.name}</div>
        <div>${formattedDate}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text" data-text="${comment.text}">${comment.text}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="${likeButtonClass}" data-index="${index}"></button>
        </div>
      </div>
    </li>`;
    }).join('');
    return commentsListHtml;
};

const renderComments = () => {
    const commentsList = document.querySelector('.comments');
    commentsList.innerHTML = generateHtml(comments);

    const commentElements = document.querySelectorAll('.comment');

    for (const commentElement of commentElements) {
        const commentTextElement = commentElement.querySelector('.comment-text');
        const commentatorNameElement = commentElement.querySelector('.commentator-name');

        commentElement.addEventListener('click', () => {
            const comment = commentTextElement.dataset.text;
            const name = commentatorNameElement.dataset.name;

            document.querySelector('.add-form-text').value = `${comment}\n> ${name}`;
        });
    }

    likeComment(comments, renderComments);
};



const addComment = () => {
    const name = document.querySelector('.add-form-name').value;
    const comment = document.querySelector('.add-form-text').value;

    if (name === '' || comment === '') {
        return; // Validation failed, do not add the comment
    }

    // Show loading message when adding comment begins
    const loadingMessageBottom = document.querySelector('.loading-message-bottom');
    loadingMessageBottom.style.display = 'block';

    const addCommentElement = document.querySelector('.add-form');
    addCommentElement.style.display = 'none';

    const newComment = {
        text: comment.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        name: name.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        forceError: true
    };

    // POST the new comment to the server
    postComments(newComment).then((responseData) => {
            return fetch('https://wedev-api.sky.pro/api/v1/adam-batukaev/comments', {
                method: "GET",
            });
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((responseData) => {
            comments = responseData.comments;
            renderComments();
        })
        .then(() => {
            // Clear input
            document.querySelector('.add-form-name').value = '';
            document.querySelector('.add-form-text').value = '';
            // Hide loading message when comments are rendered 
            loadingMessageBottom.style.display = 'none';
            addCommentElement.style.display = 'flex';
        })
        .catch((error) => {
            loadingMessageBottom.style.display = 'none';
            addCommentElement.style.display = 'flex';
            if (error === "Bad request") {
                alert('Сообщение не может быть короче трех символов')
            } else {
                alert("Проверьте подключение к сети Интернет");
            }

            //TODO Caught Errors 
            console.warn(error);
        });
};

const addButton = document.querySelector('.add-form-button');
addButton.addEventListener('click', addComment);

// Fetch initial comments from the server
fetchComments();
