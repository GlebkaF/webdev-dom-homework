document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('nameInput').value;
    var comment = document.getElementById('commentInput').value;

    if (name.trim() === '' || comment.trim() === '') {
        alert('Ошибка! Заполните все поля.');
        return;
    }

    var time = new Date().toLocaleTimeString();
    var newComment = document.createElement('li');
    newComment.innerHTML = '<strong>' + name + '</strong> (' + time + '): ' + comment;

    document.getElementById('commentList').appendChild(newComment);

    document.getElementById('nameInput').value = '';
    document.getElementById('commentInput').value = '';
});