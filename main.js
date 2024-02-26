import { getComments } from "./api.js";
import { getCurrentDate } from "./getDate.js";
import { renderComments } from "./renderComments.js";
import { format } from "date-fns";
import _ from 'lodash'

  // Получаем все необходимые элементы

  const loaderPage = document.querySelector(".page-loader");
  let comments = [];

  export const mapData = () => {
    return getComments().then((resultData) => {
      loaderPage.style.display = "block";
      const resultComments = resultData.comments.map((comment) => {
        //let currentDate = getCurrentDate(new Date(comment.date));
        let currentDate = format(new Date(comment.date), "yyyy-MM-dd hh.mm.ss");
        return {
          author: comment.author.name,
          date: currentDate,
          text: comment.text,
          likeCount: comment.likes,
          myLike: comment.isLiked
        };
      });
      comments = resultComments;
      renderComments( {comments} );
    })
    .then((resultData) => {
      loaderPage.style.display = "none";
      
    })
    .catch((error) => {
      alert("Упс, сервер упал");
      loaderPage.style.display = "none";
    });
  }
  mapData();    

  //Функция рендера комментариев
  renderComments( {comments} );

  

 