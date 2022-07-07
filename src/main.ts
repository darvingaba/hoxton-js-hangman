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
  
  console.log(typeof(wordDisplay));
  let divEl = document.querySelector('.letters-container');
  if(divEl===null)return;

  divEl.innerHTML = wordDisplay;

  if(wordDisplay===word&&state.guessesLeft>0){
    let h1El = document.createElement("h1");
    h1El.className = "lost-title";
    h1El.textContent = "You won";

    let restartButton = document.createElement("button");
    restartButton.className = "restart-button";
    restartButton.textContent = "Restart";
    restartButton.addEventListener('click', () => {
      location.reload();
    })
    divEl.append(h1El, restartButton);
  }
}
function youWon() {
  let wonTitle = document.createElement('h1');
  wonTitle.className = 'won-title';
  wonTitle.textContent = 'You won 👌';
  let restartButton = document.createElement('button');
  restartButton.className = 'restart-button';
  restartButton.textContent = 'Restart';
  restartButton.addEventListener('click', () => {
    location.reload();
  })
  let container = document.querySelector('.result');
  if (container === null) return;
  if(state.guessesLeft>0 && state.word===state.guesses.join('')){
    // container.innerHTML = "";
    container.append(wonTitle, restartButton);
  }
}
// getting the input from the user
function getInput() {
  window.addEventListener('keydown', (e) => {
    e.preventDefault();
    let char = e.key;
    if (char.length !== 1) return;
    if (state.guesses.includes(char)) return;
    state.guesses.push(char);
    if (!state.word.includes(char)) {
      state.guessesLeft--;
    }
    render();
    console.log(`Guesses left ${state.guessesLeft}`);
  })
}

// getting mistakes

function getMistakes() {
  let mistakes = state.guesses.filter((char) => !state.word.includes(char));
  let mistakeDisplay = `This are the mistakes : ${mistakes} (${mistakes.length})`;
  // let mistakeDisplay = mistakes.join(' ');
  let divEl = document.querySelector(".result");
  if (divEl === null) return;
  divEl.textContent = '';
  if(mistakes.length >=5){
    let h1El = document.createElement('h1');
    h1El.className = 'lost-title';
    h1El.textContent = 'You lost';

    let restartButton = document.createElement('button');
    restartButton.className = 'restart-button';
    restartButton.textContent = 'Restart';
    restartButton.addEventListener('click', () => {
      location.reload();
    })
    divEl.append(h1El,restartButton);
  }else{
    let wonTitle = document.createElement('h1');
    wonTitle.className = 'won-title';
    // wonTitle.textContent = 'You won 👌';
    divEl.append(mistakeDisplay);
  }
}

function render() {
  // let container = document.querySelector('#game-container');
  // if(container===null)return;
  // container.innerHTML = '';
  getMistakes();

  showLines();
  getInput();
  youWon();
}

render();
