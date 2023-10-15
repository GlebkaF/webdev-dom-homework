export function getRegistration(login, passowrd) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      passowrd,
    }),
  }).then((response) => {
    return response.json();
  });
}
