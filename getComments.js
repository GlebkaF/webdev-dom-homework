const loader = document.querySelector(".loader");
function getComments() {
  const fetchPromise = fetch(
    "https://webdev-hw-api.vercel.app/api/v1/eldar/comments",
    {
      method: "GET",
    }
  );
  return fetchPromise.then((response) => {
    loader.hidden = true;
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {
      comments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: comment.date,
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
        };
      });
      renderComments();
    });
  });
}
// "https://webdev-hw-api.vercel.app/api/v1/eldar/comments",
