import './style.css'

type State = {
  word: string[];
  guesses: string[];
  guessesLeft: number;
};

let state:State = {
  word: ['hello','bye','world', 'javascript', 'typescript'],
  guesses: [],
  guessesLeft: 5,
}

// showing the lines in the screen
let randomWord = state.word[Math.floor(Math.random() * state.word.length)];
console.log(randomWord);
function showLines() {
  let wordDisplay = '';
  for (let i = 0; i < randomWord.length; i++) {
    if (state.guesses.includes(randomWord[i])) {
      wordDisplay += randomWord[i]+ ' ';
    } else {
      wordDisplay += '_ ';
    }
  }
  
  console.log(typeof(wordDisplay));
  let divEl = document.querySelector('.letters-container');
  if(divEl===null)return;

  divEl.innerHTML = wordDisplay;

  if(wordDisplay===randomWord&&state.guessesLeft>0){
        youWon();
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
    if (!randomWord.includes(char)) {
      state.guessesLeft--;
    }
    render();
    console.log(`Guesses left ${state.guessesLeft}`);
  })
}

// getting mistakes

function getMistakes() {
  let mistakes = state.guesses.filter((char) => !randomWord.includes(char));
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
  // youWon();
}

render();
