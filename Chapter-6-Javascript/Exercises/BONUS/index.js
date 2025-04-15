// DOM elements
const rgbValue = document.getElementById('rgbValue');
const colorOptions = document.getElementById('colorOptions');
const resultMsg = document.getElementById('resultMsg');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const replayBtn = document.getElementById('replayBtn');

let correctColor = '';
let score = 0;
let lives = 3;

// Generate a random RGB color
function getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Start or reset the game
function startGame() {
    score = 0;
    lives = 3;
    replayBtn.classList.add('hidden');
    updateDisplay();
    generateNewRound();
}

// Update score/lives UI
function updateDisplay() {
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
}

// Generate a new round
function generateNewRound() {
    resultMsg.textContent = '';
    colorOptions.innerHTML = '';

    correctColor = getRandomRGB();
    rgbValue.textContent = correctColor;

    // Generate 2 incorrect colors + 1 correct
    let colors = [correctColor];
    while (colors.length < 3) {
        const color = getRandomRGB();
        if (!colors.includes(color)) colors.push(color);
    }

    // Shuffle colors
    colors.sort(() => Math.random() - 0.5);

    // Create buttons
    colors.forEach(color => {
        const btn = document.createElement('button');
        btn.classList.add('color-btn');
        btn.style.backgroundColor = color;

        btn.addEventListener('click', () => handleGuess(color));
        colorOptions.appendChild(btn);
    });
}

// Handle user guess
function handleGuess(selectedColor) {
    if (selectedColor === correctColor) {
        resultMsg.textContent = '✅ Correct!';
        score++;
    } else {
        resultMsg.textContent = '❌ Wrong!';
        lives--;
    }

    updateDisplay();

    if (lives === 0) {
        endGame();
    } else {
        setTimeout(generateNewRound, 1000);
    }
}

// End of game
function endGame() {
    resultMsg.textContent = `🎉 Game Over! Final Score: ${score}`;
    replayBtn.classList.remove('hidden');
}

// Replay button click
replayBtn.addEventListener('click', startGame);

// Initialize game on load
startGame();

