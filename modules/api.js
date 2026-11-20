const PERSONAL_KEY = 'zelimkhan-khazhmuradov';
const BASE_URL = `https://wedev-api.sky.pro/api/v1/${PERSONAL_KEY}/comments`;

// Получить список комментариев с сервера
export async function fetchComments() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error('Не удалось загрузить комментарии');
  }

  const data = await response.json();
  return data.comments;
}

// Отправить новый комментарий на сервер
export async function postComment(name, text) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({ name, text }),
  });

  if (response.status === 400) {
    const data = await response.json();
    throw new Error(data.error);
  }
  if (!response.ok) {
    throw new Error('Не удалось отправить комментарий');
  }

  return response.json();
}