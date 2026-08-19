const savedComments = localStorage.getItem('comments');

const commentsArr = savedComments ? JSON.parse(savedComments) : [
    {
        id: 1,
        author: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likesCount: 3,
        likedByMe: false,
    },
    {
        id: 2,
        author: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likesCount: 75,
        likedByMe: false,
    },
];

export { savedComments, commentsArr };