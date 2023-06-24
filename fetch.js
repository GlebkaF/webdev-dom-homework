import { takeDate } from "./Date.js";
function getArr(comments) {    
    return fetch("https://wedev-api.sky.pro/api/v1/:sofia-iakovleva/comments", {
        method: "GET"
    })
        // Подписываемся на успешное завершение запроса с помощью then
        .then((response) => {
            // Запускаем преобразовываем "сырые" данные от API в json формат и 
            //подписываемся на успешное завершение запроса с помощью then:
            return response.json();
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    text: comment.text,
                    eachDate: takeDate(new Date(comment.date)),
                    like: comment.likes,
                    currentLike: false,
                    classLike: 'like-button -no-active-like',
                    isEdit: false,
                };
            });
            comments = appComments;
            return renderComments()
        })
        .then((data) => {
            document.body.classList.add('loaded');
        });
}

export { getArr};
