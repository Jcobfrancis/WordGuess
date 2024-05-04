const hint = document.querySelector('.hint')
const countGuess= document.querySelector('.attempts');
const wrongAttempts= document.querySelector('.wrong-letters');
const wrapper = document.querySelector('.wrapper');
const userInput = document.querySelector('.typing-input');
const resetBtn = document.querySelector('.reset-game');
let displayInput= '';

let randomWord = wordList[Math.round(Math.random() * wordList.length)];
hint.innerText = randomWord.hint;
let wrongLetters = [];
let correctLetters = [];


console.log(randomWord.word + " - " + randomWord.hint);

function startGame() {
  for (let i = 0; i < randomWord.word.length; i++) {
    wrapper.innerHTML += '<div class="hold-input"><span class="display-input"></span></div>';
  }
  
  if (randomWord.word.length > 4) {
      countGuess.innerText = 8;
    } else if (randomWord.word.length < 5) {
      countGuess.innerText = 6;
    }
  
  function count() {
    countGuess.innerText--;
    if (countGuess.innerText <= 0) {
      alert("Game over. You've used up all your guesses");
      for (let i = 0; i < randomWord.word.length; i++) {
        displayInput = document.querySelectorAll('.display-input')[i];
        displayInput.innerText = randomWord.word[i];
        userInput.disabled = 'true';
      }
    }
  }
  
  function checkRightAttempts(index) {
    if (!correctLetters.includes(userInput.value)) {
        correctLetters.push(userInput.value);
        if (correctLetters.length == randomWord.word.length) {
          alert("Congrats! You found the word " + randomWord.word.toUpperCase());
          location.reload();
        }
    }
  }

  function checkWrongAttempts() {
   if (!wrongLetters.includes(userInput.value)) {
      wrongLetters.push(userInput.value);
      wrongAttempts.innerText = wrongLetters;
      count();
    }
  } 
  
  userInput.addEventListener('input', function() {
    
    userInput.value = userInput.value.toLowerCase();
    let index = randomWord.word.indexOf(userInput.value);
    if (randomWord.word.includes(userInput.value)) {
      displayInput = document.querySelectorAll('.display-input')[index];
      displayInput.innerText = userInput.value;
      checkRightAttempts(index);
      userInput.value = "";
    } else {
      checkWrongAttempts();
      userInput.value = "";
    }
  })
  
}

resetBtn.addEventListener('click', () => location.reload()
)


startGame();
