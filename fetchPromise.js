import { comments, myDate, listElement, secureInput} from "./index.js";
import { myDate, secureInput, validateButton, initDisabledButtonElement} from "./optionalFunction.js";

export const loaderCommentsElement = document.getElementById('loaderComments');
export const getFetchPromise = () => {
    loaderCommentsElement.classList.remove('-display-none');
    return fetch('https://webdev-hw-api.vercel.app/api/v1/:natalvod/comments',{
      method: "GET"
    }).then((response) => {
      if (response.status === 200){
        return response.json();
     } else {
       throw new Error("Сервер сломался, попробуй позже")
      }
    //return response.json();
    }).then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: secureInput(comment.author.name),
          date: myDate(new Date(comment.date)),
          text: secureInput(comment.text),
          likes: comment.likes,
          isLike: false,
        };
      })
      comments = appComments;
      loaderCommentsElement.classList.add('-display-none');
      renderComments(listElement);
    }).catch((error) => {
      alert('Сервер не работает, повторите попытку позже');
      console.warn(error);
    });
  }
  getFetchPromise();

