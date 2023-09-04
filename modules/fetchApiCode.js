export const methodApiGet = () => {
  return fetch(
    "https://wedev-api.sky.pro/api/v1/kirill-levchenkohw09/comments",
    {
      method: "GET",
    }
  ).then((response) => {
    return response.json();
  });
};

export const methodApiPost = (nameInput, commitInput) => {
  return fetch(
    "https://wedev-api.sky.pro/api/v1/kirill-levchenkohw09/comments",
    {
      method: "POST",
      body: JSON.stringify({
        name: nameInput.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        text: commitInput.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        forceError: true,
      }),
    }
  );
};
