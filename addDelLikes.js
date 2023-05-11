const addLikes = (e) => {
    usersComments[e.target.dataset.id].likes = Number(usersComments[e.target.dataset.id].likes) + 1;
    usersComments[e.target.dataset.id].isLiked = true;
}

const delLikes = (e) => {
    usersComments[e.target.dataset.id].likes = Number(usersComments[e.target.dataset.id].likes) - 1;
    usersComments[e.target.dataset.id].isLiked = false;
}