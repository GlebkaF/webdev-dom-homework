


document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("nameInput");
    const commentInput = document.getElementById("commentInput");
    const addCommentButton = document.getElementById("addCommentButton");
    const commentList = document.getElementById("commentList");




    document.getElementById("commentInput", "nameInput")
        .addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("addCommentButton").click();
            }
        });





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
        newComment.innerHTML = `<strong>${name}</strong> (${dateString}): ${comment} <span class="likes">0</span>`;

        commentList.appendChild(newComment);

        newComment.classList.add('comment', `comments`, `comment-header`, 'comment-body', 'comment-text', 'comment-footer' );
    
    

        nameInput.value = "";
        commentInput.value = "";

    });
});




