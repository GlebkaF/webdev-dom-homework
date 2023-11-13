import { saveUserInLocalStorage } from "./helpers.js";
import { autoInfo, commentsArray, getToken, setComments, userLogin } from "./main.js";
import { renderComments } from "./render.js";

export const fetchArray = () => {


    fetch("https://wedev-api.sky.pro/api/v2/fomin_denis/comments", {
        method: "GET",

    }
    ).then((response) => {
        if (response.status === 500) {
            throw new Error("Ошибка сервера")
        };
        return response.json();
    }).then((responseData) => {


        let newComments = responseData.comments.map((element) => {
            const newDate = new Date(element.date);
            return {
                comment: element.text,
                name: element.author.name,
                like: element.likes,
                userLike: element.isLiked,
                date: newDate.toLocaleString(),


            }


        }



        )
        setComments(newComments)
        

        renderComments(commentsArray);
    }).catch((Error) => {
        if (Error.message === 'Failed to fetch') {
            alert("Проблемы с интернетом");
        } else {
            alert(Error.message)
        }
    })
};
fetchArray();


export const arrayPost = () => {
    const nameElement = document.getElementById("inputName");
    const textElement = document.getElementById("inputText");
    const buttonElement = document.getElementById("buttonPush");
    




    fetch("https://wedev-api.sky.pro/api/v2/fomin_denis/comments", {
        method: "POST",
        body: JSON.stringify({
            text: textElement.value
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;"),
            name: nameElement.value
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;"),
            forceError: true,

        }),
        headers: {
            Authorization: getToken(),
        }



    }).then((thenresponse) => {
        if (thenresponse.status === 500) {
            arrayPost();
            
        } else if (thenresponse.status === 400) {
            throw new Error("Имя или текст комментария должны иметь 3 и более символов");
        }
        if (thenresponse.ok) {


            nameElement.value = '';
            textElement.value = '';
            buttonElement.disabled = true;
        }
        fetchArray();
    }).catch((cathError) => {
        if (cathError.message === 'Failed to fetch') {
            alert("Проблемы с интернетом");
        } else {


            alert(`${cathError.message}`)
        }
    })
        .finally(() => {


            setTimeout(function () {
            

            }, 1000);

        });

};



export const fetchLogin = (loginInput, passwordInput) => {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            login: loginInput,
            password: passwordInput,
        })
    }).then((response) => {
        if (response.status === 500) {

            throw new Error("Ошибка сервера");
        } else if (response.status === 400) {
            throw new Error("Невыерный логин или пароль");
        } else {
            return response.json()
        }
    }).then((response) => {
        userLogin(response);
        saveUserInLocalStorage(response);
        console.log(autoInfo)
    }).catch((catchErorr) => {
        if (catchErorr.message === 'Failed to fetch') {
            alert("Проблемы с интернетом");
        } else {
            alert(catchErorr.message)
        }
    })
}


export const fetchRegistration = (loginInput, passwordInput, name) => {
    return fetch('https://wedev-api.sky.pro/api/user/', {
        method: 'POST',
        body: JSON.stringify({
            login: loginInput,
            password: passwordInput,
            name
        })
    }).then((response) => {
        if (response.status === 500) {

            throw new Error("Ошибка сервера");
        } else if (response.status === 400) {
            throw new Error("Пользователь с таким логином уже существует");
        } else {
            return response.json()
        }
    }).then((response) => {
        userLogin(response);
        saveUserInLocalStorage(response);
        console.log(autoInfo)
    }).catch((catchErorr) => {
        if (catchErorr.message === 'Failed to fetch') {
            alert("Проблемы с интернетом");
        } else {
            alert(catchErorr.message)
        }
    })
}