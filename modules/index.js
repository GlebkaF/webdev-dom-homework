import { getComments, postComment, getUsers, postRegistration, postLogIn, setToken} from "./api.js";
import { renderAddingList } from "./render.js"


    const buttonElement = document.getElementById('add-button');
    const addingAComment = document.getElementById('adding');
    const commentsLoader = document.getElementById('loader');
    const nameElement = document.getElementById('name');
    const commentsElement = document.getElementById('comments');
    const linkButtonElement = document.getElementById('link-button');
    const commentEntrance = document.getElementById('entrance');
    let auth = document.getElementById('auth');
    let registrationElement = document.getElementById('form-registration');
    let registrationButton = document.getElementById('registration-button');
    let entranceElement = document.getElementById('form-entrance');
    let button = document.getElementById('button');
    let exitButton = document.getElementById('exit-button');
    let buttonButton = document.getElementById('button-button');



    

    let commentList = []
   
    addingAComment.classList.add("_hidden");


    console.log(commentsLoader);
    commentsLoader.classList.add("_hidden");
   
    buttonElement.addEventListener("click", () => {
    
      if (commentsElement.value === ""){
        alert("Пожалуйста введите коментарий!");
        return;
      };
      addingAComment.classList.add("_hidden");
      commentsLoader.classList.remove("_hidden");
      postComment();
    });

linkButtonElement.addEventListener("click", () =>{
  renderAddingList();
  registrationElement = document.getElementById('form-registration');
  button = document.getElementById('button');
  exitButton = document.getElementById('exit-button');
  buttonButton = document.getElementById('button-button');
  buttonButton.addEventListener("click", (user) => {
    const loginValue = document.getElementById('login').value;
    const passwordValue = document.getElementById('password').value;
    postLogIn(loginValue, passwordValue).then((user) => {
      setToken(`Bearer ${user.user.token}`);
      auth = document.getElementById('auth');
      auth.classList.add("_hidden");
      getComments();
      addingAComment.classList.remove("_hidden");
      // renderCommentList(commentList)
    });
  })

  registrationButton = document.getElementById('registration-button')
  registrationButton.addEventListener("click", () => {
    registrationElement.classList.remove("_hidden");
    entranceElement = document.getElementById('form-entrance');
    entranceElement.classList.add("_hidden");
    buttonButton = document.getElementById('button-button');
    buttonButton.classList.add("_hidden");
    button = document.getElementById('button');
    button.classList.remove("_hidden");
    exitButton = document.getElementById('exit-button');
    exitButton.classList.remove("_hidden");
    registrationButton = document.getElementById('registration-button');
    registrationButton.classList.add("_hidden");
    exitButton = document.getElementById('exit-button');

    button.addEventListener("click", () => {
      postRegistration();
      getComments();
      addingAComment.classList.remove("_hidden");
      postComment();
    });

    exitButton.addEventListener("click", () => {
      renderAddingList();
      registrationElement = document.getElementById('form-registration');
      button = document.getElementById('button');
      exitButton = document.getElementById('exit-button');
      registrationButton = document.getElementById('registration-button');
      commentEntrance.classList.add("_hidden");
      registrationElement.classList.add("_hidden");
      button.classList.add("_hidden");
      exitButton.classList.add("_hidden");
    })
  })
  commentEntrance.classList.add("_hidden");
  registrationElement.classList.add("_hidden");
  button.classList.add("_hidden");
  exitButton.classList.add("_hidden");
 });
 
  getUsers();
  getComments();

  

    


