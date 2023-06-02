import { getUsers } from "./index.js"
import { token } from "./render.js"
const host = 'https://wedev-api.sky.pro/api/v2/denis-sokurenko/comments'
export function getComments({ token }) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        }
    })
        .then((response) => {
         return   response.json()
})
};


export function addComment({ buttonEnter, nameText, text, option, token }) {
    buttonEnter.disabled = true;
    buttonEnter.textContent = 'Комментарий добавляется';
    fetch(host, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            date: new Date().toLocaleDateString('ru-RU', option),
            likes: 0,
            isLiked: false,
            text: text.value.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            // name: nameText.value.replaceAll("&", "&amp;")
            //     .replaceAll("<", "&lt;")
            //     .replaceAll(">", "&gt;")
            //     .replaceAll('"', "&quot;"),
            forceError: true,
        }),

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
            getUsers({ token });
            buttonEnter.disabled = false;
            buttonEnter.textContent = 'Написать';
            nameText.value = "";
            text.value = "";
        })
        .catch((error) => {
            if (error.message === 'Проблема в имени и/или тексте') {
                alert('Проверьте имя и текст комментария. Строки должны быть заполнены и быть длиной не меннее 3х символов');
                buttonEnter.disabled = false;
                buttonEnter.textContent = 'Написать';
                return;
            };
            if (error.message === 'Ошибка на сервере') {
                addComment({ buttonEnter, nameText, text, option })
                return
            }
            alert('Проверьте интернет соединение');
            buttonEnter.disabled = false;
            buttonEnter.textContent = 'Написать';
        })
};



export function loginUser({ login, password }) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            login,
            password
          }),
    })
    .then((response) => {
        if (response.status === 400) {
            throw new Error ("неверный логин или пароль")
        }
      return response.json();
    })
}

export function registerUser({ login, password, name
}) {
    return         fetch("https://wedev-api.sky.pro/api/user", {
        method: "POST",
        body: JSON.stringify({
          login,
          password,
          name,
        }),

      })
        .then((response) => {
            if (response.status === 400) {
                throw new Error ("Пользователь уже существует")
            }
          return response.json();
        })
    
}

export function clickUp() {
    return fetch
}