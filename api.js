export function getFetch() {

  return fetch('https://wedev-api.sky.pro/api/v1/alexandr-trankov9/comments', {
    method: "GET"
  })
    .then((response) => {
      return response.json();
    })
  }
  
  export function hideAddForm() {
    const form = document.querySelector(".add-form");
    form.classList.add("hidden");
  }
  export function showAddForm() {
    const form = document.querySelector(".add-form");
    form.classList.remove("hidden");
  }
  export function showLoadingIndicatorComments() {
    const loader = document.querySelector(".comment-loader");
    loader.classList.remove("hidden");
  }
  export function deleteLoadingIndicatorComments() {
    const loader = document.querySelector(".comment-loader");
    loader.classList.add("hidden");
  }
  export function showLoadingIndicator() {
    const loader = document.querySelector(".list-loader");
    loader.classList.remove("hidden");
  }
  export function deleteLoadingIndicator() {
    const loader = document.querySelector(".list-loader");
    loader.classList.add("hidden");
  }
  
  export function postFetchApi({textInComment, nameInComment}){
   return fetch('https://wedev-api.sky.pro/api/v1/alexandr-trankov9/comments', {
      method: "POST",
      body: JSON.stringify({
        text: textInComment
          .replaceAll("<", "&lt")
          .replaceAll(">", "&gt")
          .replaceAll("&", "&amp;")
          .replaceAll('"', "&quot;"),
        name: nameInComment
          .replaceAll("<", "&lt")
          .replaceAll(">", "&gt")
          .replaceAll("&", "&amp;")
          .replaceAll('"', "&quot;"),
          
      })
    })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер упал, попробуй позже");
      } else if (response.status === 400) {
        throw new Error("Введите данные заново");
      } else {
        return response.json();
      };
    })
  }
