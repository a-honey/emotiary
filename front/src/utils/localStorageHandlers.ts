const getUserId = localStorage.getItem('userId');
const getUsername = localStorage.getItem('username');
const getToken = localStorage.getItem('token');
const getUserimg = localStorage.getItem('userImg');
const getRefreshToken = localStorage.getItem('refreshToken');

export default getUserId;

export { getRefreshToken, getToken, getUserimg, getUsername };
