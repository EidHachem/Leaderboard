import './styles/style.scss';
import { url, refresh } from './modules/variables.js';

const userScoreList = document.querySelector('.add-to-board');

userScoreList.innerHTML = '';

const getData = async () => {
  const response = await fetch(`${url}/games/Zl4d7IVkemOTTVg2fUdz/scores/`);
  const data = await response.json();
  userScoreList.innerHTML = data.result
    .map((score) => `<li>${score.user}: ${score.score}</li>`)
    .join('');
};

refresh.addEventListener('click', getData);
