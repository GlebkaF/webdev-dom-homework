import { allUsersAndComments, getUsers } from "./data.js"
const listComments = document.getElementById("list-comments");

getUsers();

export const renderBlank = (user, index) => {
    return `<li class="comment">
    <div class="comment-header">
      <div class="name-user">${user.author.name}</div>
      <div>${user.date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${user.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${user.likes}</span>
        <button class="${user.isLiked ? 'like-button -active-like' : 'like-button'}" data-index=${index}></button>
      </div>
    </div>
    </li>`;

}



export const renderUsers = (listComments, renderBlank) => {
    const usersHtml = allUsersAndComments.map((user, index) => renderBlank(user, index)).join("");
    listComments.innerHTML = usersHtml;
    likesChange();
};



function likesChange() {

    const likesUp = document.querySelectorAll(".like-button");
    for (const likeUp of likesUp) {
        likeUp.addEventListener('click', (event) => {
            event.stopPropagation();
            let found = allUsersAndComments[likeUp.dataset.index];
            if (found.isLiked) {

                found.likes--;
                found.isLiked = false;

            } else {

                found.likes++;
                found.isLiked = true;

            };
            renderUsers();
        });

    };


}



