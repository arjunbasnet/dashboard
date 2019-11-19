const defaultUserInfo = {
  name: 'Demo User',
  image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_1280.png'
};

export default function reducer(state = {
  user: defaultUserInfo
}, action) {
  return state;
}