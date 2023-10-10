


document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("nameInput");
    const commentInput = document.getElementById("commentInput");
    const addCommentButton = document.getElementById("addCommentButton");
    const commentList = document.getElementById("commentList");





    function fieldSubmit(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("addCommentButton").click();
        }
    }


    document.getElementById("commentInput")
    document.addEventListener("keyup", fieldSubmit);




    addCommentButton.addEventListener("click", function () {


        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();
        nameInput.classList.remove('error');
        commentInput.classList.remove('error');

        if (name === "") {
            nameInput.classList.add('error');


            return;
        } else if (comment === "") {
            commentInput.classList.add('error');
            return;
        }

        const currentDate = new Date();
        const dateString = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

        const newComment = document.createElement("li");
        // newComment.innerHTML = `<strong>${name}</strong> (${dateString}): ${comment} <span class="likes">0</span>`;
        newComment.innerHTML = `
        <li class="comment">
        <div class="comment-header">
        <div>${name}</div>
        <div>${dateString}</div>
        </div>
        <div class="comment-body">
        <div class="comment-text">
            ${comment}
        </div>
        </div>
        <div class="comment-footer">
        <div class="likes">
            <span class="likes-counter">3</span>
            <button class="like-button"></button>
        </div>
        </div>
        </li>
    `;

        commentList.appendChild(newComment);






        nameInput.value = "";
        commentInput.value = "";




    });
});




