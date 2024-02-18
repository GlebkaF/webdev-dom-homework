import { getComments } from "./api.js";
import { getCurrentDate } from "./getDate.js";
import { renderLogin } from "./loginPage.js";
import { renderCom } from "./renderComments.js";

  let comments = []

  // Функция рендера комментариев

  const mapData = () => {
    return getComments()
    .then((resultData) => {
      const resultComments = resultData.comments.map((comment) => {
        //console.log(comment.author.name);
        let currentDate = getCurrentDate(new Date(comment.date));
        return {
          author: comment.author.name,
          date: currentDate,
          text: comment.text,
          likeCount: comment.likes,
          myLike: comment.isLiked
        };
      });
      comments = resultComments;
      renderCom( {comments, mapData} );
    })
    .then((resultData) => {
      //console.log('Загрузка страницы = ' + isLoadedPage);
      loaderPage.style.display = "none";
    })
    .catch((error) => {
      alert("Упс, сервер упал");
      //console.log(error);
      loaderPage.style.display = "none";
    });
  }
  
  renderLogin( {mapData} );