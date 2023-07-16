import * as api from './api.js';
import * as render from './render.js';

const btn = document.querySelector(".add-form-button");
const nameUser = document.querySelector(".add-form-name");
const commentUser = document.querySelector(".add-form-text");
const form = document.querySelector(".add-form");
const del = document.querySelector(".remove-form-button");
let isLoadingAllComments;
let isLoading;
const userComments = document.querySelector('.comments');
let userComment = [];

function formatCommentDate(date) {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = (date.getFullYear() - 2000).toString();
	const hour = date.getHours().toString().padStart(2, '0');
	const minute = date.getMinutes().toString().padStart(2, '0');
	return `${day}.${month}.${year} ${hour}:${minute}`;
}

function apiGet() {
    isLoadingAllComments = true;
    api.getFetch()
    .then((responseData) => {
        isLoading = false;
        isLoadingAllComments = false;
        userComment = responseData.comments.map((comment) => {
        let date = new Date(comment.date);
        date = formatCommentDate(date);

        return {
            id: comment.id,
            name: comment.author.name,
            date: date,
            comment: comment.text,
            likes: comment.likes,
            isLike: true,
            isEdit: false,
        };
        })
        renderUserComments();
    })
        .catch((error) => {
            api.catchFetch(error);
        })
};
apiGet();

function addComment() {
    //? Работаем с API POST
    isLoading = true;
	api.postFetch()
    .then(() => {
		renderUserComments();
		return apiGet();
    })
    .catch((error) => {
		api.catchFetch(error);
    });
}

const initLikesBtn = () => {
    const likeBtns = document.querySelectorAll('.like-button');
    for (const likeBtn of likeBtns) {
        const index = likeBtn.dataset.index;
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (userComment[index].isLike === true) {
                userComment[index].likes = userComment[index].likes += 1;
                userComment[index].isLike = false;
            }
            
            else if (userComment[index].isLike === false) {
                userComment[index].likes = userComment[index].likes -= 1;
                userComment[index].isLike = true;
            }
            renderUserComments();
        });
    }
}

const changeComment = () => {
    const changeBtns = document.querySelectorAll('.change-button');
    for (const changeBtn of changeBtns) {
        changeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = changeBtn.dataset.index;
            let findComment = document.getElementById('changedText');
                if (userComment[index].isEdit === true) {
                    userComment[index].comment = findComment.value;
                    userComment[index].isEdit = false;
                }
                else if (userComment[index].isEdit === false) {
                    userComment[index].isEdit = true;
                }
            renderUserComments();
        });
    }
}

const findTextarea = () => {
    const textareas = document.querySelectorAll('.add-form-text_comment');
    for (const textarea of textareas) {
        textarea.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

function commentComment() {
    const comments = document.querySelectorAll(".comment");
    for (const comment of comments) {
        comment.addEventListener('click', () => {
        const index = comment.dataset.index;
        commentUser.value =`QUOTE_BEGIN ${userComment[index].name + ':' + ' ' + userComment[index].comment} QUOTE_END`;
        });
    };
}

btn.addEventListener("click", () => {
    addComment();
});

form.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        addComment();
    }
});

del.addEventListener("click", () => {
    ul.lastElementChild.remove();
});

function checkFields() {
    if (nameUser.value && commentUser.value) {
        btn.disabled = false;
        btn.classList.remove('btn-gray');
    } else {
        btn.disabled = true;
        btn.classList.add('btn-gray');
    }
}

nameUser.addEventListener('input', checkFields);
commentUser.addEventListener('input', checkFields);

const renderLoadingAllComments = () => {
    if (isLoadingAllComments === true) {
        userComments.innerHTML = `<li class="comment">Идет загрузка комментариев.</li>`
    }
};

renderLoadingAllComments();

const renderLoadingLastComment = () => {
    const html = isLoading === true ? `<li class="comment">Идет загрузка комментария.</li>` : ``;
    userComments.insertAdjacentHTML("beforeend", html);
};

const renderUserComments = () => {
    render.renderUserComments({userComments, userComment});

    initLikesBtn();
    changeComment();
    commentComment();
    findTextarea();
    renderLoadingLastComment();
    checkFields();
    };