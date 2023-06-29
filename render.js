// const renderUsers = () => {
//       const usersHtml = users.map((user, index) => {
//         return `<li class="comment" data-index="${index}">
//           <div class="comment-header">
//             <div> ${user.name}</div>
//             <div>${user.date}</div>
//           </div>
//           <div class="comment-body">
//             <div class="comment-text">
//               ${user.comments}
//             </div>
//           </div>
//           <div class="comment-footer">
//             <div class="likes">
//               <span class="likes-counter">${user.like}</span>
//               <button class="like-button ${user.active}" data-index = ${index}></button>
//             </div>
//         </li>`
//        }).join(''); 
//        listElement.innerHTML = usersHtml; 
//        likeFunctions();   
       

//       // Функция ответа на комментарий 

//       const userElements = document.querySelectorAll(".comment");
//       const answerComment = () => {
//       for (const userElement of userElements) {
//         const index = userElement.dataset.index;
//         userElement.addEventListener("click", () => {
//           commentInput.value = `> ${users[index].comments}
//           ${users[index].name}, `;    
//           renderUsers();   
//         })
//       }; 

//     }; answerComment();   
//     }; renderUsers(); 