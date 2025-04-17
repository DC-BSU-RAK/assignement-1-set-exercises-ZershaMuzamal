// Ensures the calculator updates dynamically as the user inputs values
window.onload = () => {
    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        input.addEventListener('input', calculate); // Changed from 'change' to 'input' for real-time updates
    });
}

function calculate() {
    // Retrieving values for petrol price and liters entered by the user
    const Petrol_Price = document.querySelector('#Petrol_Price').value;
    const liters = document.querySelector('#liters').value;

    // Return early if either field is empty
    if (!Petrol_Price || !liters) return;

    // Calculate total amount and format to two decimal places
    const totalAmount = (Petrol_Price * liters).toFixed(2); 

    // Display the calculated value on the screen
    document.querySelector('#totalAmount').innerText = totalAmount;
}
