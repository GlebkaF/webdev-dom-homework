// import comments from "./main.js";
// import renderComments from "./main.js";

// const commentsContainer = document.getElementById("commentsContainer");
// commentsContainer.style.display = 'none';
// const commentAdding = document.createElement('div'); 
// commentAdding.innerText = 'Пожалуйста подождите, загружаю комментарии...';
// commentsContainer.parentNode.insertBefore(commentAdding, commentsContainer);
// const fetchPromise = () => {
//     fetch("https://webdev-hw-api.vercel.app/api/v1/olya-myalo/comments", {
//       method: "GET"
//     })
//     .then((response) => (response.json()))
//     .then((responseData) => { 
//     const appComments = responseData.comments.map((comment) => { 
//       return { 
//         name: comment.author.name,  
//         date: formatDate(new Date(comment.date)),  
//         text: comment.text, 
//         active: false,
//         like: comment.likes, 
//         }; 
//       }); 
//       comments = appComments; 
//       renderComments();
//       })
//       .then((data) => {
//         commentAdding.style.display = 'none';
//         commentsContainer.style.display = 'block';
//         });
// };

// export default fetchPromise;