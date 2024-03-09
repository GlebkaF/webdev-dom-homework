// Пишем функцию рендера для создания разметки
export function renderPeoples(peoples, commentListElement, textInputElement) {
    const commentsHtml = peoples
        .map((people, index) => {
            return `
                <li data-index=${index} class="comment">
                    <div class="comment-header">
                        <div>${people.name}</div>
                        <div>${people.time}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">${people.text
                            .replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
                            .replaceAll("END_QUOTE%", "</div>")}
                        </div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${people.likes}</span>
                            <button data-index=${index} class="like-button ${people.isLiked ? 'active-like' : ''}"></button>
                        </div>
                    </div>
                </li>`;
        })
        .join("");

    commentListElement.innerHTML = commentsHtml;

    // Красим кнопку лайка и увеличиваем счетчик
    for (let button of document.querySelectorAll(".like-button")) {
        button.addEventListener("click", (event) => { 
            event.stopPropagation();
            const index = event.currentTarget.dataset.index;    
            const currentPeople = peoples[index];                    

            if (currentPeople.isLiked) {
                currentPeople.likes--;
            } else {
                currentPeople.likes++;
            };

            currentPeople.isLiked = !currentPeople.isLiked;

            renderPeoples(peoples, commentListElement, textInputElement);
        });
    };

    // Ответ на комментарий
    for (const commentElement of document.querySelectorAll(".comment")) {
        commentElement.addEventListener("click", (event) => {
            const index = event.currentTarget.dataset.index;
            const currentPost = peoples[index];

            textInputElement.value = `%BEGIN_QUOTE${currentPost.text} : ${currentPost.name}END_QUOTE%`;
            textInputElement.style.whiteSpace = 'pre-line';
        });
    };
};
