const getComments = () => {
    return fetch(
      "https://webdev-hw-api.vercel.app/api/v1/ramal.bakirov/comments",
      {
        method: "GET",
      }
    ).then((response) => {
      return response.json();
    });
  };
  function postMethod(nameElements, textElements) {
   return fetch("https://webdev-hw-api.vercel.app/api/v1/ramal.bakirov/comments", {
      method: "POST",
      body: JSON.stringify({
        name: nameElements,
        text: textElements,
      }),
    }) .then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер сломался");
        } else if (response.status === 400) {
          throw new Error("Короткое имя или текст");
        } else {
          return response.json();
        }
      })
  };
  
  export { getComments, postMethod };
  