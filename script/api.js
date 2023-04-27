const getCommentsApi = () => {
  return fetch(
    "https://webdev-hw-api.vercel.app/api/v1/Komoza_Maxim/comments",
    {
      method: "GET",
    }
  ).then((response) => response.json());
};

const postCommentsApi = () => {
  const inputName = document.querySelector(".add-form-name");
  const inputText = document.querySelector(".add-form-text");
  
  return fetch(
    "https://webdev-hw-api.vercel.app/api/v1/Komoza_Maxim/comments",
    {
      method: "POST",
      body: JSON.stringify({
        name: inputName.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        text: inputText.value
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll("[BEGIN_QUOTE]", "<div class='quote'>")
          .replaceAll("[END_QUOTE]", "</div>"),
        forceError: true,
      }),
    }
  ).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else if (response.status === 400) {
      response.json().then((data) => {
        const alertText = data.error
          .replace("name", "Имя")
          .replace("text", "Комментарий");

        alert(alertText);
      });
      throw Error("400");

      // тут должен быть код для записи ошибки в логи
    } else if (response.status === 500) {
      throw Error("500");
    } else {
      throw Error();
    }
  });
};

export { getCommentsApi, postCommentsApi };
