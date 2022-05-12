import './styles/style.scss';
import swal from 'sweetalert';
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
  if (user.value !== '' && score.value !== '') {
    setData(post).then(() => {
      e.target.reset();
      getData();
    });
  } else if (user.value === '') {
    swal('Please Add Name', {
      buttons: {
        cancel: 'close',
        catch: {
          text: 'Adjust Input',
          value: 'Adjust Input',
        },
        defeat: false,
      },
    })
      .then((value) => {
        switch (value) {
          case 'Adjust Input':
            user.focus();
            break;
          default:
        }
      });
  } else if (score.value === '') {
    swal('Please Add Score', {
      buttons: {
        cancel: 'close',
        catch: {
          text: 'Adjust Input',
          value: 'Adjust Input',
        },
        defeat: false,
      },
    })
      .then((value) => {
        switch (value) {
          case 'Adjust Input':
            score.focus();
            break;
          default:
        }
      });
  }
});
