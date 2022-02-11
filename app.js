// grabbing dom Elements
const levelElement = document.querySelector('.current-level');
const timerElement = document.querySelector('.timer');
const digitDisplay = document.querySelector('.digit-display');
const userInput = document.querySelector('.user-input');
const submitBtn = document.querySelector('.submit-btn');
const againBtn = document.querySelector('.again-button');

let LEVEL = 2;
let choosenNumberByComputer = [];
let interval;

const generateNumber = function(level) {
    const max = Math.pow(10 , level);
    const min = Math.pow(10 , level -1);
    let number = Math.trunc(Math.random() * max);
    while (number <= min) {
        number = Math.trunc(Math.random() * max);
    }
    return Array.from(String(number) , Number)
}

// console.log(generateNumber())


const displayComputerChoice =  function(level  , delay) {
    // we prevent the user from typing in the input while displaying 
    userInput.disabled = true
    choosenNumberByComputer = generateNumber(level)
    console.log(choosenNumberByComputer)
    choosenNumberByComputer.forEach((digit  , i)  => {
        setTimeout(( ) => {
            digitDisplay.textContent = digit
            // console.log(`the ${i  + 1}`);
        }  , delay * (i + 1))
    })

    setTimeout(() => {
        startTimer()
    }, (choosenNumberByComputer.length + 1) * delay)

}

const startTimer = function() {
    // we activate the autofocus
    userInput.autofocus = true
    // we delete the last digit from the secreen 
    digitDisplay.textContent = ''
    // we allow the user from typing in the input while displaying 
    userInput.disabled = false;
    // we activate the click event listener 
    allowUserToSubmit()
    seconds = 10;
    console.log(`Timer is starting now`)
    timerElement.innerHTML = ""
    interval = setInterval(() => {
        timerElement.innerHTML = seconds;
        seconds = seconds - 1;
        if (seconds == -1) {
            stopTimer(interval)
        }
    }, 1000)
    // clearInterval(interval)
}


const stopTimer = function (x) {
    clearInterval(x);
}

const getUserInput = () => {
    return userInput.value
};

const evaluateUserInput = function() {
    const userInput = getUserInput();
    const computerChoice = choosenNumberByComputer
                            .toString()
                            .replaceAll(',','');
    console.log(`the user input is ${userInput}`);
    console.log(`the computer choice is ${computerChoice}`)

    return userInput === computerChoice
}
const allowUserToSubmit = function () {
    submitBtn.addEventListener('click' , func1)
}

const func1 = function ( ) {
    if (evaluateUserInput()){
        stopTimer(interval);
        console.log('good memory');
        LEVEL  = LEVEL + 1;
        userInput.value = "";
        displayComputerChoice(LEVEL , 1000);
    }
    else {
        stopTimer(interval);
        console.log('wrong guess');
        userInput.value = "";
        displayComputerChoice(LEVEL , 1000);
    }
}


displayComputerChoice(LEVEL , 1000);






