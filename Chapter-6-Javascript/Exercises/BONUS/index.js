// ===== Selecting DOM elements for use throughout the game =====
const rgbValue = document.getElementById('rgbValue');           // Display area for the target RGB color
const colorOptions = document.getElementById('colorOptions');   // Container where color buttons will be shown
const resultMsg = document.getElementById('resultMsg');         // Displays result feedback (correct/wrong)
const livesDisplay = document.getElementById('lives');          // Shows remaining lives
const scoreDisplay = document.getElementById('score');          // Displays current score
const replayBtn = document.getElementById('replayBtn');         // "Play Again" button for restarting the game

// ===== Game state variables =====
let correctColor = '';  // Holds the correct RGB value to guess
let score = 0;          // Tracks the current score
let lives = 3;          // Number of chances the player has

// ===== Utility function to generate a random RGB color =====
function getRandomRGB() {
    const r = Math.floor(Math.random() * 256); // Red: 0-255
    const g = Math.floor(Math.random() * 256); // Green: 0-255
    const b = Math.floor(Math.random() * 256); // Blue: 0-255
    return `rgb(${r}, ${g}, ${b})`;            // Return formatted RGB string
}

// ===== Initialize or reset the game =====
function startGame() {
    score = 0;
    lives = 3;
    replayBtn.classList.add('hidden');  // Hide the replay button if visible
    updateDisplay();                    // Update UI to reflect initial score/lives
    generateNewRound();                // Begin the first round
}

// ===== Refresh score and lives in the UI =====
function updateDisplay() {
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
}

// ===== Set up a new guessing round =====
function generateNewRound() {
    resultMsg.textContent = '';         // Clear previous result message
    colorOptions.innerHTML = '';        // Remove any existing color buttons

    correctColor = getRandomRGB();      // Choose a new correct color
    rgbValue.textContent = correctColor; // Show correct RGB value to the player

    // Create an array with the correct color + 2 unique incorrect colors
    let colors = [correctColor];
    while (colors.length < 3) {
        const newColor = getRandomRGB();
        if (!colors.includes(newColor)) colors.push(newColor);
    }

    // Randomize the order of the buttons
    colors.sort(() => Math.random() - 0.5);

    // Create a button for each color option
    colors.forEach(color => {
        const btn = document.createElement('button');
        btn.classList.add('color-btn');   // Add styling class
        btn.style.backgroundColor = color;

        // Add functionality: check if the clicked color is correct
        btn.addEventListener('click', () => handleGuess(color));

        // Add button to the DOM
        colorOptions.appendChild(btn);
    });
}

// ===== Logic to handle player's guess =====
function handleGuess(selectedColor) {
    if (selectedColor === correctColor) {
        resultMsg.textContent = '✅ Correct!';
        score++;  // Increase score for correct guess
    } else {
        resultMsg.textContent = '❌ Wrong!';
        lives--;  // Decrease lives for wrong guess
    }

    updateDisplay();  // Refresh the score/lives display

    if (lives === 0) {
        endGame();  // If no lives left, end the game
    } else {
        setTimeout(generateNewRound, 1000); // Wait briefly then start a new round
    }
}

// ===== Triggered when the player runs out of lives =====
function endGame() {
    resultMsg.textContent = `🎉 Game Over! Final Score: ${score}`;
    replayBtn.classList.remove('hidden');  // Show the replay button so the user can try again
}

// ===== Event listener to restart the game on button click =====
replayBtn.addEventListener('click', startGame);

// ===== Automatically start the game when the page loads =====
startGame();

