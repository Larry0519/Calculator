class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.history = [];
        this.clear()
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)

    }

    // user choose the number and click, then add number to screen
    appendNumber(number){
        // only one period happen    
        if (number === '.' && this.currentOperand.includes('.')) return 
         // append number instead of add number, so transfer to string first
        this.currentOperand = this.currentOperand.toString() + number.toString()
        
    }
     // user choose the operator and click, then add number to screen
    chooseOperation(operation){
        // click operator continutely, will not let previous be ''
        if (this.currentOperand === '') return
        // if previous operand not equal zero, click operator will compute too
        if (this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        // after click operation, the current operand become previous operand and current operand equal ''
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    // calculate the number and compute a single value display on calculator
    compute(){
        // result of compute function
        let computation
        // convert string to number
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // check if user doesn't input currentoperand after input prev and operator
        if (isNaN(prev) || isNaN(current)) return
        // calculate process
        switch (this.operation){
            case '+': 
                computation = prev + current
                break
            case '-': 
                computation = prev - current
                break
            case '*': 
                computation = prev * current
                break
            case '÷': 
                computation = prev / current
                break
            default:
                return            
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

        // if (this.history.length >10) return
        // this.history.push(computation);
    }

    // showHistory(){
    //     this.currentOperandTextElement.innerText = 'this.history';
    // }

    // uddate the value inside the screen
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand

        if (this.operation != null){
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`
        } else {
            // operator is null clear all
            this.previousOperandTextElement.innerText = ''
        }
        
        // this.previousOperandTextElement.innerText = this.previousOperand

    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons =document.querySelectorAll('[data-operation]')
const equalsButton =document.querySelector('[data-equals]')
const deleteButton =document.querySelector('[data-delete]')
const allClearButton =document.querySelector('[data-all-clear]')
const historyButton = document.querySelector('[data-history]')

const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement =document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})

// historyButton.addEventListener('click', button =>{
//     calculator.showHistory()
//     calculator.updateDisplay()
// })