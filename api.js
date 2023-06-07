const listElement = document.getElementById("list");
const inputNameElement = document.getElementById("name");
const inputTextElement = document.getElementById("comment-text");
const addForm = document.getElementById("add-form-block");

export const fetchAndRenderTasks = () => {
    return fetch(
        "https://webdev-hw-api.vercel.app/api/v1/kostasdvor/comments",
        {
            method: "GET"
        }
    )
        .then((response) => response.json())
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                const commentDate = new Date(comment.date);
                const day = commentDate.getDate();
                const month = commentDate.getMonth() + 1;
                const year = commentDate.getFullYear();
                const formattedDate = `${day < 10 ? "0" : ""}${day}.${month < 10 ? "0" : ""}${month}.${year}`;
                const hours = commentDate.getHours();
                const minutes = commentDate.getMinutes();
                const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
                const formattedDateTime = `${formattedDate} ${formattedTime}`;

                return {
                    name: comment.author.name,
                    date: formattedDateTime,
                    text: comment.text,
                    likes: comment.likes,
                    isLikes: false,
                };
            });

            usersComments = appComments;
            renderUsersComments(usersComments, listElement);
        }).catch((error) => {
            alert("Что-то пошло не так, повторите попытку позже.");
            console.warn(error);
        });
}


let loadingForm = document.querySelector('.form-loading');
loadingForm.style.display = 'block';
addForm.style.display = 'none';



export const fetchPromise = fetch(
    "https://webdev-hw-api.vercel.app/api/v1/kostasdvor/comments",
    {
        method: "POST",
        body: JSON.stringify({
            // date: formatDateTime(currentDate),
            // likes: 0,
            // isLiked: false,
            text: inputTextElement.value,
            name: inputNameElement.value,
        }),
    }
);

fetchPromise
    .then((response) => {
        if (response.status === 500) {
            throw new Error("Сервер упал");
        } else if (response.status === 400) {
            throw new Error("Плохой запрос");
        }
        else {
            return response.json();
        }
    })
    .then((responseData) => {
        return fetchAndRenderTasks();
    }).then(() => {
        // addForm.innerHTML = `<input id="name" type="text" class="add-form-name" placeholder="Введите ваше имя" />
        // <textarea id="comment-text" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        // rows="4"></textarea>
        // <div class="add-form-row">
        // <button id="add-button" class="add-form-button">Написать</button>
        // </div>`;
        loadingForm.style.display = 'none';
        addForm.style.display = 'block';
        renderUsersComments(usersComments, listElement);

    })
    .catch((error) => {
        if (error.message === "Сервер упал") {
            alert("Сервер упал, повторите попытку позже");
        } else if (error.message === "Плохой запрос") {
            alert("Поля ввода должны содержать минимум 3 символа");
        } else {
            alert("Что-то пошло не так, повторите попытку позже.");
        };
        console.warn(error);
        loadingForm.style.display = 'none';
        addForm.style.display = 'block';

    });





