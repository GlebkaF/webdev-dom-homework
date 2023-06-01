export let comments = [];

const textInputElement = document.getElementById('textInput');
const nameInputElement = document.getElementById('nameInput');
const buttonElement = document.getElementById('add-button');

const getComments = () => {
    return fetch('https://webdev-hw-api.vercel.app/api/v1/katerina-nosova/comments', {
        method: 'GET'
    })
        .then((response) => {
            if (response.message === 500) {
                throw new Error('Сервер упал');
            }
            else {
                return response.json();
            }
        })
        .then((responseData) => {
            //преобразование данных формата api в наш формат
            comments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false
                };
            });
            // renderComments(commentsListElement, getListComments);
        })
        .catch((error) => {
            console.log(error);
            if (error.message === 'Сервер упал') {
                alert('Упс, сервер упал');
            } else {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
            }
        })
};

const postComments = () => {
    return fetch('https://webdev-hw-api.vercel.app/api/v1/katerina-nosova/comments', {
        method: 'POST',
        body: JSON.stringify({
            text: textInputElement.value,
            name: nameInputElement.value,
            forceError: true
        })
    })
        .then((response) => {
            console.log(response);
            if (response.status === 500) {
                throw new Error('Сервер упал');
            }
            if (response.status === 400) {
                throw new Error("Плохой запрос");
            }
            else {
                return response.json();
            }
        })
        .then((responseData) => {
            comments = responseData.comments;
            return getComments();
        })
        .catch((error) => {
            console.log(error);
            if (error.message === 'Сервер упал') {
                //alert('Сервер прилёг отдохнуть, попробуй позже');
                buttonElement.click();
            }
            else if (error.message === 'Плохой запрос') {
                alert('Имя и комментарий должны быть длиннее трёх символов');
            }
            else {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
                console.log(error);
            }
            // toggleForm(false);
        });
};

export { getComments, postComments };