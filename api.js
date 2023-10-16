export function getFetch() {

  return fetch('https://wedev-api.sky.pro/api/v1/alexandr-trankov5/comments', {
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