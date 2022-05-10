import './styles/style.scss';
import scorelist from './modules/array.js';

const userScoreList = document.querySelector('.add-to-board');

userScoreList.innerHTML = '';
scorelist.forEach((score) => {
  userScoreList.innerHTML += `
    <li class="list-item">Name: ${score}</li>
    `;
});
