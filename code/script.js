const words = [
    "book", "chair", "table", "pen", "phone", "bag", "shoe", "clock", "key", "lamp",
    "door", "hat", "glass", "watch", "cup", "box", "bed", "desk", "car", "ball",
    "bag", "door", "wall", "map", "coin", "fan", "ring", "bottle", "plate",
    "pencil", "window", "mirror", "garden", "camera", "wallet", "blanket", "pillow",
    "button", "remote", "charger", "laptop", "bottle", "candle", "notebook", "calendar"
];


const playGameDiv = document.querySelector('.playGame');
const playGameButton = playGameDiv.querySelector('button');

const mainVivDiv = document.querySelector('.mainViv');
const mainVivHeading = mainVivDiv.querySelector('h2');
const wordInput = mainVivDiv.querySelector('input[type="text"]');
const skipButton = mainVivDiv.querySelector('button.skipWord');
const submitButton = mainVivDiv.querySelector('button.submit');
const scoreParagraph = document.getElementById('score');

const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modalCon');
const modalText = modalContent.querySelector('h3');
const restartButton = modalContent.querySelector('button.restart');

let currentWord = "";
let finalScrambled = "";
let score = Number(localStorage.getItem('score')) || 0;

// Show stored score on page load
scoreParagraph.textContent = `Score: ${score}`;

// Start the game when start button clicked
playGameButton.addEventListener('click', () => {
    playGameDiv.classList.add('remove');
    mainVivDiv.classList.remove('remove');
    startNewRound();
});

// Enable/disable submit button depending on input
function inputCheck() {
    submitButton.disabled = wordInput.value.trim() === '';
}
inputCheck();
wordInput.addEventListener('input', inputCheck);

// Submit guess
submitButton.addEventListener('click', () => {
    const value = wordInput.value.trim().toLowerCase();
    if (value === currentWord) {
        score++;
        localStorage.setItem('score', score);
        scoreParagraph.textContent = `Score: ${score}`;
        if (score === 10) {
            wordInput.disabled = true;
            submitButton.disabled = true;
            skipButton.disabled = true;
            modal.classList.add('active');
            modalText.innerText = '🎉 You Win!';
        } else {
            startNewRound();
        }
    } else {
        modal.classList.add('active');
        modalText.innerText = 'You entered the wrong word!';
    }
    inputCheck();
});

// Skip to next word
skipButton.addEventListener('click', startNewRound);

function startNewRound() {
    const wordArray = generateRanWord();
    currentWord = wordArray.join('');
    const scrambledArray = scrambleWords([...wordArray]);
    finalScrambled = scrambledArray.join('');
    mainVivHeading.innerText = finalScrambled;
    wordInput.value = '';
    inputCheck();
}

// Pick a random word from the list
function generateRanWord() {
    const randomNum = Math.floor(Math.random() * words.length);
    return words[randomNum].toLowerCase().split('');
}

// Scramble the letters of a word (make sure scrambled !== original)
function scrambleWords(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const a = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[a]] = [arr[a], arr[i]];
    }
    if (arr.join('') === currentWord) return scrambleWords(arr);
    return arr;
}

// Restart game on modal button click
restartButton.addEventListener('click', () => {
    modal.classList.remove('active');
    score = 0;
    localStorage.removeItem('score');
    scoreParagraph.textContent = `Score: ${score}`;
    wordInput.disabled = false;
    submitButton.disabled = false;
    skipButton.disabled = false;
    startNewRound();
});
