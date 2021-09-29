document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const resultDisplay = document.querySelector('#results');
    const resetButton = document.querySelector('.reset-button');
    resetButton.onclick = () => { 
        resetGame()
    }
    const width = 4;
    const length = 4;
    const amountOfSquares = width * length;
    let squares = []
    let score = 0;

    // Generate Board
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

    // Generate numbers
    function generateNumber() {
        let randomNumber = Math.floor((Math.random() * squares.length))
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
            handleSquareStyling()
            checkForGameover()
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
    function moveLeft() {
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

    // Swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let numOfEmptySquaresInRow = 4 - filteredColumn.length;
            let zeros = Array(numOfEmptySquaresInRow).fill(0);
            let newColumn = zeros.concat(filteredColumn);
            
            squares[i].innerHTML = newColumn[0];
            squares[i+width].innerHTML = newColumn[1];
            squares[i+width*2].innerHTML = newColumn[2];
            squares[i+width*3].innerHTML = newColumn[3];
        }
    }

    // Swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let numOfEmptySquaresInRow = 4 - filteredColumn.length;
            let zeros = Array(numOfEmptySquaresInRow).fill(0);
            let newColumn = filteredColumn.concat(zeros);
            
            squares[i].innerHTML = newColumn[0];
            squares[i+width].innerHTML = newColumn[1];
            squares[i+width*2].innerHTML = newColumn[2];
            squares[i+width*3].innerHTML = newColumn[3];
        }
    }

    // If two number in the row/column is the same, combine them
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+1].innerHTML = 0
                score += combinedTotal;
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i+width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+width].innerHTML = 0
                score += combinedTotal;
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    // Assigning keycodes
    function control(e) {
        if (e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 40) {
            keyDown()
        }
    }
    document.addEventListener('keyup', control)

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generateNumber()
    }
    
    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generateNumber()
    }
    
    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generateNumber()
    }
    
    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generateNumber()
    }

    // Check for Win - Check for 2048 in a square
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You Win!'
                document.removeEventListener('keyup', control)
            }
        }
    }

    // Check for Gameover
    function checkForGameover() {
        let zeros = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'You Lose!'
            document.removeEventListener('keyup', control)
        }
    }

    // Reset Game
    function resetGame() {
        score = 0;
        scoreDisplay.innerHTML = score;
        for (let i = 0; i < squares.length; i++) {                
            squares[i].style.backgroundColor = "rgba(238, 228, 218, 0.35)";
            squares[i].innerHTML = "";
        }
        generateNumber()
        generateNumber()
        resultDisplay.innerHTML = ''
        document.addEventListener('keyup', control)
    }

    // Handle Square Styling
    function handleSquareStyling() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                squares[i].style.backgroundColor = "rgba(238, 228, 218, 0.35)";
                squares[i].innerHTML = "";
            } else if (squares[i].innerHTML == 2) {
                squares[i].style.backgroundColor = "rgb(228 222 216)";
            } else if (squares[i].innerHTML == 4) {
                squares[i].style.backgroundColor = "#eee1c9";
            } else if (squares[i].innerHTML == 8) {
                squares[i].style.backgroundColor = "#f3b27a";
            } else if (squares[i].innerHTML == 16) {
                squares[i].style.backgroundColor = "#f69664";
            } else if (squares[i].innerHTML == 32) {
                squares[i].style.backgroundColor = "#f77c5f";
            } else if (squares[i].innerHTML == 64) {
                squares[i].style.backgroundColor = "#f75f3b";
            } else if (squares[i].innerHTML == 128) {
                squares[i].style.backgroundColor = "#edd073";
            } else if (squares[i].innerHTML == 256) {
                squares[i].style.backgroundColor = "crimson"
            } else if (squares[i].innerHTML > 256) {
                squares[i].style.backgroundColor = "#a6122e";
            }
        }
    }
    
})