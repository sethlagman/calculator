const btnNumbers = document.querySelector('.buttons.numbers')
const clearBtn = document.createElement('button')

clearBtn.setAttribute('id', 'clear')
clearBtn.className = 'clear'
clearBtn.textContent = 'C'
btnNumbers.appendChild(clearBtn)

for (let i = 0; i <= 9; i++) {
    const numButton = document.createElement('button')
    numButton.textContent = i
    numButton.classList.add(i)
    btnNumbers.appendChild(numButton)
}

const output = document.querySelector('.output')
const buttons = document.querySelectorAll('button')

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation()

        if (event.target.className != 'clear') {
            const number = event.target.textContent
            output.textContent += number
        } else {
            output.textContent = ''
        }
        
    })
})
