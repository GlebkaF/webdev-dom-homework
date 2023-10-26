<!DOCTYPE html>
<html>
  <head>
    <title>Комментарии</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="styles.css" />
  </head>
 
  <body>
     <div id="app"></div>
  
    <div class="container">
    <div class="autorization hidden" id="app"> 
     
      </div>
      
      
       <div class="list-loader hidden">
         <span>Комментарии загружаются...</span>
      </div>
      <ul id="list" class="comments">

      </ul>
      <div class="add-form hidden">
        <input id="name-input"
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea id="comment-input"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="add-button" class="add-form-button " onclick="new Audio('./ok.mp3').play(); return false;" >Написать</button>
        </div>
      </div>
      <div class="comment-loader hidden">
        <span>Комментарий отправляется</span>
      </div>
    </div>
  </div>
    <script type="module" src="./main.js"></script>
    
  </body>
  <style>
    .error {
      background-color:#EB7D7D;
    }
    .active-like {
      background-image: url("data:image/svg+xml,%3Csvg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.95 0C14.036 0 12.199 0.882834 11 2.26703C9.801 0.882834 7.964 0 6.05 0C2.662 0 0 2.6267 0 5.99455C0 10.1035 3.74 13.4714 9.405 18.5613L11 20L12.595 18.5613C18.26 13.4714 22 10.1035 22 5.99455C22 2.6267 19.338 0 15.95 0Z' fill='%23BCEC30'/%3E%3C/svg%3E")
    } 
  </style>

  



</html>



 