document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const resultDisplay = document.querySelector('#results');
    const width = 4;
    const length = 4;
    const amountOfSquares = width * length;
    const squares = []
    
    function createBoard() {
        for (let i=0; i < amountOfSquares; i++) {
            square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.append(square);
            squares.push(square); 
        }
        generateNumber()
        generateNumber()
        console.log(squares)
    }
    createBoard()

    // Generate numbers to start game
    function generateNumber() {
        let randomNumber = Math.floor((Math.random() * squares.length))
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
        } else generateNumber()
    }

    // Swipe Right
    function moveRight() {
        for (let i=0; i < amountOfSquares; i++) {
            // If any are in the 4 squares (left hand-side of our board), get the innerHTML of the 3 squares on the right from it
            if (i % 4 === 0 ) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                console.log(row)

                let filteredRow = row.filter(num => num)
                console.log(filteredRow)

                let numOfEmptySquaresInRow = 4 - filteredRow.length;
                let zeros = Array(numOfEmptySquaresInRow).fill(0)
                console.log(zeros)

                // Add filteredRow to the end of the row array (right side) to the array of zeros
                let newRow = zeros.concat(filteredRow);
                console.log('NEW ROW==', newRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    // Swipe Left
    function moveleft() {
        for (let i=0; i < amountOfSquares; i++) {
            if (i % 4 === 0 ) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let numOfEmptySquaresInRow = 4 - filteredRow.length;
                let zeros = Array(numOfEmptySquaresInRow).fill(0)
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    
})