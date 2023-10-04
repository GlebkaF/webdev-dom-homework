export function getComments() {
  return fetch(
        'https://wedev-api.sky.pro/api/v1/evgeniya-ko/comments',
        {
          method: "GET",
        })
        .then((response) => {
        return response.json();//const jsonPromise = response.json();
        });
}