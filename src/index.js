import './styles/style.scss';
import Swal from 'sweetalert2';
import {
  url, refresh, form, user, score,
} from './modules/variables.js';

const userScoreList = document.querySelector('.add-to-board');

userScoreList.innerHTML = '';

const getData = async () => {
  const response = await fetch(`${url}/games/RSDbPUrD0EJ9ol3LEOlh/scores/`);
  const data = await response.json();
  userScoreList.innerHTML = data.result
    .sort((a, b) => b.score - a.score)
    .map((score) => `<li>${score.user}: ${score.score}</li>`)
    .join('');
};

refresh.addEventListener('click', getData);

const setData = async (post) => {
  await fetch(`${url}/games/RSDbPUrD0EJ9ol3LEOlh/scores/`, {
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
  if (user.value.trim() === '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a name!',
    });
  } else if (score.value.trim() === '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a score!',
    });
  } else if (score.value < 0 || score.value > 100) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a valid score! (positive number between 0 and 100)',
    });
  } else {
    setData(post).then(() => {
      e.target.reset();
      getData();
    });
  }
});
