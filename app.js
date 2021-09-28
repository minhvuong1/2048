document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const resultDisplay = document.querySelector('#results');
    const width = 4;
    const length = 4;
    const squares = []

    function createBoard() {
        for (let i=0; i < width*length; i++) {
            square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.append(square);
            squares.push(square); 
        }
        console.log(squares)
    }
    createBoard()


})