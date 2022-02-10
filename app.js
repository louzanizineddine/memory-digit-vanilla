// grabbing dom Elements

const levelElement = document.querySelector('.current-level');
const timerElement = document.querySelector('.timer');
const digitDisplay = document.querySelector('.digit-display');
const userInput = document.querySelector('.user-input');
const submitBtn = document.querySelector('.submit-btn')

const LEVEL = 0;
let choosenNumberByComputer = [];
    

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
    choosenNumberByComputer = generateNumber(level)
    choosenNumberByComputer.forEach((digit  , i)  => {
        setTimeout(( ) => {
            // we delett the h4 elemetns if exists 
            if (digitDisplay.children.length != 0) {
                digitDisplay.children[0].remove();
            }
            const element = document.createElement('h4');
            element.innerHTML = digit;
            digitDisplay.appendChild(element);

            console.log(digitDisplay.children);
        }  , delay * (i + 1))
    })
}


const arrayToStr = function(array) {
    str = ""
    array.forEach(digit => {
        str += digit
    })
    return str
}
const evaluateUserInput = function(str) {
    return str === arrayToStr(choosenNumberByComputer)
}
// we evaluate the user input in two cases 
// if he submits the answer or the timer runs out

const getUserInput = function() {
    console.log(userInput.value)
    console.log(evaluateUserInput(userInput.value))
}

submitBtn.addEventListener('click' , getUserInput)


displayComputerChoice(3 , 1000)

getUserInput()
