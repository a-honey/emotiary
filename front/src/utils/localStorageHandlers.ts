const getUserId = localStorage.getItem('userId');
const getUsername = localStorage.getItem('username');
const getToken = localStorage.getItem('token');
const getUserimg = localStorage.getItem('userImg');
const getRefreshToken = localStorage.getItem('refreshToken');
const getEmail = localStorage.getItem('email');

const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('userImg');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('email');
};

export default getUserId;

export { getRefreshToken, getToken, getUserimg, getUsername, getEmail, logout };
