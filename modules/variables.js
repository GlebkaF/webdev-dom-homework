export let token;
export const getToken = (newToken) => {
  token = newToken;
  return token;
};