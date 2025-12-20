const btnNumbers = document.querySelector('.buttons.numbers')

for (let i = 0; i <= 9; i++) {
    const numButton = document.createElement('button')
    numButton.textContent = i
    btnNumbers.appendChild(numButton)
}

