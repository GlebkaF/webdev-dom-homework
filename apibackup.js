export function getTodos(){
    return fetch("https://webdev-hw-api.vercel.app/api/todos", {
         method: "GET",
       })
         .then((response) => {
           return response.json();
         })
 }
 
 export function deleteTodo({id}){
 
     return fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
             method: "DELETE",
           })
             .then((response) => {
               return response.json();
             })
 }
 
 export function postTodo({text}){
     return fetch("https://webdev-hw-api.vercel.app/api/todos", {
         method: "POST",
         body: JSON.stringify({
           text: text,
         }),
       })
         .then((response) =>{
           return response.json();
         }) 
 }