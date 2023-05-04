const form = document.querySelector('.add-form');
const newName = form.querySelector('.add-form-name');
const newComment = form.querySelector('.add-form-text');
const addButton = form.querySelector('.add-form-button');
const comments = document.querySelector('.comments');
const delButton = form.querySelector('.del-form-button');
const boxOfComments = document.querySelector('.comments');
const boxOfCommentsTexts = boxOfComments.querySelectorAll('.comment')


const usersComments = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    comment: "Это будет первый комментарий на этой странице",
    likes: "3",
    Iliked: false,
    isEdit: false
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    comment: "Мне нравится как оформлена эта страница! ❤",
    likes: "75",
    Iliked: false,
    isEdit: false
  }
]





