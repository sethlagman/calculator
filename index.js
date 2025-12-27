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

const backspace = document.createElement('button')
backspace.className ='backspace'
backspace.textContent = '⌫'
btnNumbers.appendChild(backspace)

const output = document.querySelector('.output')
const buttons = document.querySelectorAll('button')

document.addEventListener('keydown', (event) => {
    const key = event.key
    const allowedKeys = [
        '0', '1', '2', '3',
        '4', '5', '6', '7',
        '8', '9', '10', '+',
        '-', '*', '/',
    ]
    
    if (allowedKeys.includes(key)) {
        output.textContent += key

    } else if (key == 'Backspace') {
        const input = output.textContent.trim()
        const splitExpression = input.split('')
        splitExpression.pop()
        output.textContent = splitExpression.join('')

    } else if (key == 'Enter') {
        const input = output.textContent.trim()
        const value = calculate(input)
        output.textContent = value

    } else if (key == '.') {
        const input = output.textContent.trim()
        
        if (!input) return

        const splittedExpression = input.split(/([*\/]|\b\s*-|\b\s*\+)/g)
        const digits = splittedExpression.filter((digit) => {
            if (!['+', '-', '*', '/'].includes(digit)) return digit
        })
        
        if (!digits.at(-1).includes('.')) {
            output.textContent += '.'
        }
    }

})

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation()

        if (event.target.className == 'clear') {
            output.textContent = ''

        } else if (event.target.className == 'equal') {
            const input = output.textContent.trim()
            const value = calculate(input)
            output.textContent = value

        } else if (event.target.className == 'point') {
            const input = output.textContent.trim()
            
            if (!input) return

            const splittedExpression = input.split(/([*\/]|\b\s*-|\b\s*\+)/g)
            const digits = splittedExpression.filter((digit) => {
                if (!['+', '-', '*', '/'].includes(digit)) return digit
            })
            const decimal = event.target.textContent
            
            if (!digits.at(-1).includes('.')) {
                output.textContent += decimal
            }

        } else if (event.target.className == 'backspace') {
            const input = output.textContent.trim()
            const splitExpression = input.split('')
            splitExpression.pop()
            output.textContent = splitExpression.join('')

        } else {
            const number = event.target.textContent
            output.textContent += number
        }
        
    })
})

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate([num1, op, num2]) {
    let n1 = parseFloat(num1)
    let n2 = parseFloat(num2) 
    switch (op) {
        case '+':
            return add(n1, n2)
        case '-':
            return subtract(n1, n2)
        case '*':
            return multiply(n1, n2)
        case '/':
            return divide(n1, n2)
    }
}

function calculate(expression) {
    const opr = ['*', '/', '-', '+']
    let splitExpression = expression.split(/([*\/]|\b\s*-|\b\s*\+)/g)

    for (op of opr) {
        while (splitExpression.includes(op)) {
            const indexOp = splitExpression.indexOf(op)
            const subExpression = splitExpression.splice(indexOp - 1, 3)
            splitExpression.splice(indexOp - 1, 0, operate(subExpression))
        }
    }
    const calculated = splitExpression[0]

    switch (isNaN(calculated) || calculated) {
        case true:
            return 'Invalid input'
        case Infinity:
        case -Infinity:
            return 'Division by zero not allowed'
        default:
            return calculated
    }

}
