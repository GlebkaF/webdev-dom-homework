import { commentsArray, setComments } from "./main.js";
import { renderComments } from "./render.js";

export const fetchArray = () => {


    fetch("https://wedev-api.sky.pro/api/v1/fomin_denis/comments", {
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
        document.getElementById("loadingFeed").style.display = 'none';

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
    document.getElementById("form-add").style.display = 'none';
    document.getElementById("loadingMessage").style.display = 'block';




    fetch("https://wedev-api.sky.pro/api/v1/fomin_denis/comments", {
        method: "POST",
        body: JSON.stringify({
            text: textElement.value
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;"),
            name: nameElement.value
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;"),
            forceError: true,

        })



    }).then((thenresponse) => {
        if (thenresponse.status === 500) {
            arrayPost();
            // throw new Error("Ошибка сервера");
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
                document.getElementById("form-add").style.display = 'flex';
                document.getElementById("loadingMessage").style.display = 'none';

            }, 1000);

        });

};