document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("nameInput");
    const commentInput = document.getElementById("commentInput");
    const addCommentButton = document.getElementById("addCommentButton");
    const commentList = document.getElementById("commentList");


    const studentElements = document.querySelectorAll(".comment");


    const commentInfo = [

        {
            name: "Глеб Фокин",
            date: "12.02.22 12:18",
            comment: "Это будет первый комментарий на этой странице",


        }
    ];

    const renderCommentInfo = () => {
        const commentsInfo = commentInfo.map((commentinfos) => {
            return `

        
            <li class="comment">
            <div class="comment-header">
            <div>${commentinfos.name}</div>
            <div>${commentinfos.date}</div>
            </div>
            <div class="comment-body">
            <div class="comment-text">
                ${commentinfos.comment}
            </div>
            </div>
            
            <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">3</span>
                <button class="like-button"></button>
                <button class="delete-button">Удалить</button>
                
                
                
            </div>
            
            </div>
            
            </li>
        `;
        }).join('');

        HTMLDataListElement.innerHTML = commentsInfo;


        initEventListeners();
        initDeleteButtonsListeners();
    };



    function toggleLike(commentId) {
        const likeButton = document.getElementById(commentId).querySelector('.like-button');
        const likeCount = likeButton.querySelector('.like-count');
        const currentLikes = parseInt(likeButton.getAttribute('data-likes'));

        if (likeButton.classList.contains('liked')) {
            likeButton.classList.remove('liked');
            likeButton.setAttribute('data-likes', currentLikes - 1);
            likeCount.textContent = currentLikes - 1;
        } else {
            likeButton.classList.add('liked');
            likeButton.setAttribute('data-likes', currentLikes + 1);
            likeCount.textContent = currentLikes + 1;
        }
    }
    






    const initEventListeners = () => {
        for (const studentElement of studentElements) {
            studentElement.addEventListener('click', () => {
                console.log(1);

            });
        }
    };



    const initDeleteButtonsListeners = () => {
        const deleteButtonsElements = document.querySelectorAll(".delete-button");
        for (const deleteButtonsElement of deleteButtonsElements) {
            deleteButtonsElement.addEventListener('click', () => {
                console.log("Удаляю элемент...");

            });
        };
    };

    renderCommentInfo();









    function fieldSubmit(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("addCommentButton").click();
        }
    }

    document.getElementById("commentInput")
    document.addEventListener("keyup", fieldSubmit);




    function buttonHide() {
        if (!commentInput.value || !nameInput.value) {
            addCommentButton.disabled = true;
        } else {
            addCommentButton.disabled = false;
        };

    };


    nameInput.addEventListener("input", buttonHide);
    commentInput.addEventListener("input", buttonHide);


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









        renderCommentInfo();

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
                <button class="like-button" "like-button"></button>
                <button class="delete-button">Удалить</button>



            </div>

            </div>

            </li>
        `;




        toggleLike();
        commentList.appendChild(newComment);

        nameInput.value = "";
        commentInput.value = "";

        addCommentButton.disabled = true;






    });

});




