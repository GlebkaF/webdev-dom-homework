const load = document.querySelector(".load");
const commentElement = document.querySelector(".comments");
const newLoad = commentElement.innerHTML;
load.textContent = "Подождите, пожалуйста, комментарии загружаются...";

export const fetchComments = () => {
 return fetch("https://webdev-hw-api.vercel.app/api/v1/Ekaterina_Ivanova/comments", {
  method: "GET"
})
.then((response) => {
     return response.json();
})
};

 export const newComment = (formName, formText) =>{
    return fetch("https://webdev-hw-api.vercel.app/api/v1/Ekaterina_Ivanova/comments", {
    method: "POST",
    body: JSON.stringify({
      name: formName,
      text: formText,
      forceError: true,
    }),
  })
}