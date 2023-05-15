function getComments() {
  const fetchPromise = fetch(
    "https://webdev-hw-api.vercel.app/api/v1/eldar/comments",
    {
      method: "GET",
    }
  );
  fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {
      comments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
        };
      });
      renderComments();
    });
  });
}
