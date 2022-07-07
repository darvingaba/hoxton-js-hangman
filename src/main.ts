import './style.css'

type State = {
  word: string;
  guesses: string[];
  guessesLeft: number;
};

let state:State = {
  word: 'hello',
  guesses: [],
  guessesLeft: 5,
}

// showing the lines in the screen

function showLines() {
  let word = state.word;
  let wordDisplay = '';
  for (let i = 0; i < word.length; i++) {
    if (state.guesses.includes(word[i])) {
      wordDisplay += word[i]+ ' ';
    } else {
      wordDisplay += '_ ';
    }
  }
  let divEl = document.querySelector('.letters-container');
  if(divEl===null)return;
  divEl.innerHTML = wordDisplay;
}
// getting the input from the user
function getInput() {
  window.addEventListener('keydown', (e) => {
    e.preventDefault();
    let char = e.key;
    if (char.length !== 1) return;
    if (state.guesses.includes(char)) return;
    state.guesses.push(char);
    render();
  })
}

// getting mistakes

function getMistakes() {
  let mistakes = state.guesses.filter((char) => !state.word.includes(char));
  let mistakeDisplay = `This are the mistakes : ${mistakes}`;
  // let mistakeDisplay = mistakes.join(' ');
  let divEl = document.querySelector(".result");
  if (divEl === null) return;
  divEl.textContent = '';
  divEl.append(mistakeDisplay);
}

function render() {
  // let container = document.querySelector('#game-container');
  // if(container===null)return;
  // container.innerHTML = '';
  getMistakes();

  showLines();
  getInput();
}

render();
