import './styles/style.scss';
import {
  url, refresh, form, user, score,
} from './modules/variables.js';

const userScoreList = document.querySelector('.add-to-board');

userScoreList.innerHTML = '';

const getData = async () => {
  const response = await fetch(`${url}/games/Zl4d7IVkemOTTVg2fEid/scores/`);
  const data = await response.json();
  userScoreList.innerHTML = data.result
    .map((score) => `<li>${score.user}: ${score.score}</li>`)
    .join('');
};

refresh.addEventListener('click', getData);

const setData = async (post) => {
  await fetch(`${url}/games/Zl4d7IVkemOTTVg2fEid/scores/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(post),
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const post = {
    user: `${user.value}`,
    score: `${score.value}`,
  };
  setData(post).then(() => {
    e.target.reset();
    getData();
  });
});
