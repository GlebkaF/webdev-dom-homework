export let comments = [];

const textInputElement = document.getElementById('textInput');
const nameInputElement = document.getElementById('nameInput');
const buttonElement = document.getElementById('add-button');

const host = 'https://wedev-api.sky.pro/api/v2/katerina-nosova';

const getComments = ({ token }) => {
    return fetch(host + '/comments', {
        method: 'GET',
        headers: {
            Authorization: token,
        }
    })
        .then((response) => {
            if (response.message === 500) {
                throw new Error('Сервер упал');
            }
            else if (response.status === 401) {
                throw new Error('Нет авторизации');
            }
            return response.json();
        })
        .then((responseData) => {
            comments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false
                };
            });

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

const postComments = ({ token, text, name }) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
            forceError: true
        }),
        headers: {
            Authorization: token,
        }
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
            return getComments({ token });
        })
        .catch((error) => {
            console.log(error);
            if (error.message === 'Сервер упал') {
                // alert('Сервер прилёг отдохнуть, попробуй позже');
                buttonElement.click();
            }
            else if (error.message === 'Плохой запрос') {
                alert('Имя и комментарий должны быть длиннее трёх символов');
            }
            else {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
                console.log(error);
            }

        });
};

const loginUser = ({login, password}) => {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            login,
            password
        })
    }).then((response) => {
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
    }).catch((error) => {
        if (error.message === 'Сервер упал') {
            // alert('Сервер прилёг отдохнуть, попробуй позже');
            buttonElement.click();
        }
        else if (error.message === 'Плохой запрос') {
            alert('Неверный логин или пароль');
        }
        else {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
            console.log(error);
        }
    });
};

const deleteComment = ({token, id}) => {
    return fetch(host + '/comments/' + id, {
        method: 'DELETE',
        headers: {
            Authorization: token
        }
    }).then((response) => {
        return response.json();
    });
};

export { getComments, postComments, loginUser, deleteComment };