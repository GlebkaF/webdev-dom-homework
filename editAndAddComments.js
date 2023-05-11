function getComments () {
  const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v1/yan-lagun/comments", {
    method: "GET"
  });
  fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {
      usersComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked
        }
      });
      loadedComment = false
      renderForm(loadedComment)
      renderComments();
    });
  });
}


function addNewComment() {
      const dateNow = new Date();
      let loadedComment = true
      renderForm(loadedComment)
      fetch("https://webdev-hw-api.vercel.app/api/v1/yan-lagun/comments", {
    method: "POST",
    body: JSON.stringify({
      "text": newComment.value.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replace("|", "<div class='quote'>")
            .replace("|", "</div>"),
      "name": newName.value.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
    })}).then((response) => {
        response.json().then((responseData) => {
          getComments()
            renderComments();

        })
    })
    
      cleareInputs()
      renderComments()
      commentClickListener()
}
getComments()

function formatDate(date) {
  
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    
    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
    
    let hh = date.getHours() % 100
    if (hh < 10) hh = '0' + hh;
  
    let mi = date.getMinutes() % 100
    if (mi < 10) mi = '0' + mi;
    return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + mi;
}

function cleareInputs () {
    newName.value = ''
    newComment.value = ''
    addButton.setAttribute('disabled', 'disabled')
}