export function getFetch() {
  return fetch("https://wedev-api.sky.pro/api/v1/arseny-kulikov/comments", {
    method: "GET",
  }).catch((error) => {
    throw new Error(`Кажется, у вас сломался интернет, попробуйте позже...`);
  });
}
export function postFetch() {
  const addFormButtonIdNew = document.getElementById(
    `add-form-buttonListIdNew`
  );
  //const listButton = document.getElementById(`add-form-buttonListId`);
  return fetch("https://wedev-api.sky.pro/api/v1/arseny-kulikov/comments", {
    method: "POST",
    body: JSON.stringify({
      text: commentTextNew.value
        .replaceAll("QUOTE_BEGIN", "<textarea>")
        .replaceAll("QUOTE_END", "</textarea><br>"),
      name: commentNameNew.value,
      forceError: true,
    }),
  }).catch((error) => {
    addFormButtonIdNew.disabled = false;
    throw new Error(`Кажется, у вас сломался интернет, попробуйте позже...`);
  });
}
export function postFetchFirst() {
  //const addFormButtonIdNew = document.getElementById(`add-form-buttonListIdNew`);
  const listButton = document.getElementById(`add-form-buttonListId`);
  return fetch("https://wedev-api.sky.pro/api/v1/arseny-kulikov/comments", {
    method: "POST",
    body: JSON.stringify({
      text: commentText.value
        .replaceAll("QUOTE_BEGIN", "<textarea>")
        .replaceAll("QUOTE_END", "</textarea><br>"),
      name: commentName.value,
      forceError: true,
    }),
  }).catch((error) => {
    //addFormButtonIdNew.disabled = false;
    listButton.disabled = false;
    throw new Error(`Кажется, у вас сломался интернет, попробуйте позже...`);
  });
}
