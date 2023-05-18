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

// fetch("https://webdev-hw-api.vercel.app/api/v1/eldar/comments", {

//         })
//           .then((response) => {
//             console.log("Время", Date.now() - dateNow);
//             return response;
//           })
//           .then((response) => {
//             console.log(response);
//             return response.json();
//           })
//           .then((response) => {
//             console.log("Время", Date.now() - dateNow);
//             return response;
//           })
//           .then(() => {
//             return getComments();
//           })
//           .then((data) => {
//             addFormButton.disabled = false;
//             addFormButton.textContent = "Написать";
//           });
//       }
