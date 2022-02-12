// import * as Tone from './node_modules/tone/Tone';

// grabbing dom Elements
const levelElement = document.querySelector(".current-level");
const startGame = document.querySelector(".start-game")
const timerElement = document.querySelector(".timer-span");
const digitDisplay = document.querySelector(".digit-display");
const userInput = document.querySelector(".user-input");
const submitBtn = document.querySelector(".submit-btn");
const mainGameDispaly = document.querySelector('.main-game-display')
const againBtn = document.querySelector(".again-button");

let LEVEL = 2;
let choosenNumberByComputer = [];
let interval;

// by default the aginBtn is disabled
againBtn.disabled = true;


const generateNumber = function (level) {
  const max = Math.pow(10, level);
  const min = Math.pow(10, level - 1);
  let number = Math.trunc(Math.random() * max);
  while (number <= min) {
    number = Math.trunc(Math.random() * max);
  }
  return Array.from(String(number), Number);
};

// console.log(generateNumber())

const displayComputerChoice = function (level, delay) {
  // we prevent the user from typing in the input while displaying
  userInput.disabled = true;
  choosenNumberByComputer = generateNumber(level);
  console.log(choosenNumberByComputer);
  digitDisplay.style.visibility = 'visible';
  choosenNumberByComputer.forEach((digit, i) => {
    setTimeout(() => {
      digitDisplay.textContent = digit;
      // console.log(`the ${i  + 1}`);
    }, delay * (i + 1));
  });

  setTimeout(() => {
    startTimer();
  }, (choosenNumberByComputer.length + 1) * delay);
};

const startTimer = function () {
  // we make the try again button disabled
  againBtn.disabled = true;
  // we delete the red color on timer span 
  timerElement.classList.remove('danger')
  // we activate the autofocus
  userInput.focus();
  // we delete the last digit from the secreen
  digitDisplay.style.visibility = "hidden";
  // we allow the user from typing in the input while displaying
  userInput.disabled = false;
  // we activate the click event listener
  allowUserToSubmit();
  seconds = 10;
  console.log(`Timer is starting now`);
  // timerElement.innerHTML = "";
  interval = setInterval(() => {
    timerElement.innerHTML = `${seconds}`;
    seconds = seconds - 1;
    if ( seconds <= 4) {
      timerElement.classList.add('danger')
    }
    if (seconds == -1) {

      stopTimer(interval);
    }
  }, 1000);
  // clearInterval(interval)
};

const stopTimer = function (x) {
  clearInterval(x);
  // we make the try again button activated again
  againBtn.disabled = false;
  againBtn.addEventListener('click' , tryPlayingAgain)
};

const getUserInput = () => {
  return userInput.value;
};

const evaluateUserInput = function () {
  const userInput = getUserInput();
  const computerChoice = choosenNumberByComputer.toString().replaceAll(",", "");
  console.log(`the user input is ${userInput}`);
  console.log(`the computer choice is ${computerChoice}`);

  return userInput === computerChoice;
};
const allowUserToSubmit = function () {
  submitBtn.addEventListener("click", func1);
};

const tryPlayingAgain = function () {
  displayComputerChoice(LEVEL , 1000)
}

const func1 = function () {
  if (evaluateUserInput()) {
    stopTimer(interval);
    timerElement.innerHTML = '00'
    console.log("good memory");
    LEVEL = LEVEL + 1;
    // we update the level in the DOM
    levelElement.textContent = LEVEL + 1;
    userInput.value = "";
    displayComputerChoice(LEVEL, 1000);
  } else {
    stopTimer(interval);
    timerElement.innerHTML = '00'
    console.log("wrong memory");
    userInput.value = "";
    againBtn.addEventListener('click' , tryPlayingAgain)
  }
};

const startTheGame = function ( ) {
  startGame.classList.add('d-none');
  mainGameDispaly.classList.remove('d-none')
  displayComputerChoice(LEVEL , 1000)
}


document.addEventListener('keypress'  , startTheGame , {once : true})

document.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
})