const defaultUserInfo = {
  name: 'Demo User',
  image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_1280.png',
  id: "5dd5314f2424e65638f4a54c"
};

export default function reducer(state = {
  user: defaultUserInfo
}, action) {
  return state;
}