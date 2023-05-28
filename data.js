

import {renderUsers, renderBlank} from "./render.js"
export let allUsersAndComments = [];
const listComments = document.getElementById("list-comments");
const buttonEnter = document.getElementById("button-enter");
const option = {
    hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'
};
const text = document.getElementById("input-text");
const nameText = document.getElementById("input-name");
export function getUsers() {
    fetch("https://webdev-hw-api.vercel.app/api/v1/denis-sokurenko/comments", {
        method: "GET",
    })
        .then((response) => {
            response.json()
                .then((responseData) => {
                    allUsersAndComments = responseData.comments;
                    renderUsers(listComments, renderBlank);
                });
        });

}


export function addComment() {
    buttonEnter.disabled = true;
    buttonEnter.textContent = 'Комментарий добавляется';
    fetch("https://webdev-hw-api.vercel.app/api/v1/denis-sokurenko/comments", {
        method: "POST",
        body: JSON.stringify({
            date: new Date().toLocaleDateString('ru-RU', option),
            likes: 0,
            isLiked: false,
            text: text.value.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            name: nameText.value.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            forceError: true,
        })
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Проблема в имени и/или тексте')
            };
            if (response.status === 500) {
                throw new Error('Ошибка на сервере')
            };
            return response.json();
        })
        .then(() => {
            getUsers();
            buttonEnter.disabled = false;
            buttonEnter.textContent = 'Написать';
            nameText.value = "";
            text.value = "";
        })
        .catch((error) => {
            if (error.message === 'Проблема в имени и/или тексте') {
                alert('Проверьте имя и текст комментария. Строки должны быть заполнены и быть длиной не менее 3х символов');
                buttonEnter.disabled = false;
                buttonEnter.textContent = 'Написать';
                return;
            };
            if (error.message === 'Ошибка на сервере') {
                addComment()
                return
            }
            alert('Проверьте интернет соединение');
            buttonEnter.disabled = false;
            buttonEnter.textContent = 'Написать';
        })
}





