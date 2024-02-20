import { getComments, postComment } from "./api.js";
import { getCurrentDate } from "./getDate.js";
import { renderComments } from "./renderComments.js";


  // Получаем все необходимые элементы

  const body = document.querySelector(".container");
  const buttonDeleteComment = document.getElementById('delete-form-button');
  

  let comments = [

  ]

  export const mapData = () => {
    return getComments().then((resultData) => {
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
      renderComments( {comments} ); 
      console.log(loaderPage);
    })
    .then((resultData) => {

      console.log('2');
      //console.log('Загрузка страницы = ' + isLoadedPage);
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

  

  // buttonDeleteComment.addEventListener('click', () => {

  //   let arrList = Array.from(commentList.children)
  //   //const lastComment = commentList.innerHTML.lastIndexOf();
  //   console.log(arrList);
  //   arrList = arrList.pop();

  //   console.log(arrList);
  //   console.log(commentList);

  //   commentList.innerHTML = String.from(arrList);
  //   //commentList.innerHTML = arrList;

  //   //commentList.innerHTML = commentList - lastComment;
  // });


 