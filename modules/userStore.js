export const getUser = () => {
  const user = localStorage.getItem('user');
  const res = JSON.parse(user)
  return res;
}

export const setUser = (usr) => {
  if (!usr) return;
  const res = JSON.stringify(usr);
  localStorage.setItem('user', res);
}

export const logout = () => {
  localStorage.removeItem('user');
}
