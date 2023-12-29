//"use strict"; Модули по умолчанию работают в строгом режиме,
// писать use strict в начале не нужно.
import { getTodos, postTodo } from "./api.js";
import {renderStudentsComments} from "./renderStudentsComments.js";
import { formatDateTime } from "./date.js";
import { addCommentButton } from "./addCommentsButton.js";
export { studentsComments, fetchAndRenderComments };

 let studentsComments = [];

const fetchAndRenderComments = () => {

        getTodos().then((responseData) => {
            console.log(responseData);
            const addComments = responseData.comments.map((comment) => {
                return {
                    // Достаём имя автора
                    name: comment.author.name,
                    // Преобразуем дату-строку в Date
                    date: formatDateTime(new Date(comment.date)),
                    text: comment.text,
                    likes: comment.likes,
                    // в апи пока вообще нет признака лайкнутости
                    // поэтому пока добавляем заглушку
                    isLiked: false,
                };
            });
            
            // добавим таймер при получении данных с сервера
            setTimeout(() => {
                // обратимся по дереву к span в начале html-кода через его класс и к его css,
                // где выключим отображение фразы, записанной в span
                // Через style мы обращаемся к css
                document.querySelector(".alert").style.display = 'none';
                studentsComments = addComments;
                console.log(addComments);
                renderStudentsComments({studentsComments, fetchAndRenderComments});
            }, 1000);
        })
        .catch((error) => {
            console.warn(error);
            alert("К сожалению у вас пропал интернет, вам нужно повторить попытку добавить комментарий позже");
        })
};
fetchAndRenderComments();
renderStudentsComments({studentsComments, fetchAndRenderComments});
addCommentButton();

