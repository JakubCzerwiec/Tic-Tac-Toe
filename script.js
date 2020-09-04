/* Defining objects and DOM objcets */

const boardDispl = document.querySelector('.board');
const test = document.querySelector('.test');
const form = document.querySelector('.names');
const startBtn = document.querySelector('.submitBtn');
const winner = document.querySelector('.winner');
const winDiv = document.querySelector('.win');

/* Winning conditions */

const winningConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];


/* Player factory */

const playerFactory = (name, mark) => {
    const movesCount =  () => {

        let plAmount = 0;

        for (let i = 0; i < gameboard.board.length; i++) {
            if (gameboard.board[i] === mark) {
                plAmount++
            }  
        }
        return plAmount
    }
    return {name, mark, movesCount}
}


/* Creating players from form and Start game*/

let playerOne;
let playerTwo;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let player1 = document.querySelector('.player1').value;
    let player2 = document.querySelector('.player2').value;

    playerOne = playerFactory (player1, 'X');
    playerTwo = playerFactory (player2, 'O');
    initListener1 ()
    form.classList.add('hiden')
    form.reset();
})


/* Gameboard module */
const gameboard = (() => {
    const board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let rendering = () => {
        boardDispl.innerHTML = ''
        for (let i = 0; i < gameboard.board.length; i++) {
            boardDispl.innerHTML += `<div class="square num${[i]}"><p>${gameboard.board[i]}</p></div>`
        }
        
    }

    return {
        board, rendering
    }
})();

gameboard.rendering()


/* Swap players logic */

const swaping = { swap: function () {

    if (playerOne.movesCount() == playerTwo.movesCount()) {
        initListener1 ()
    } else if (playerOne.movesCount() > playerTwo.movesCount()) {
        initListener2 ()
    }
} }


/* Gameplay */

const initListener1 = () => {
    let box = document.querySelectorAll('.square')

    box.forEach((item, index) => {

        item.addEventListener('click', () => {
                if (gameboard.board[index] !== ' ') {
                console.log('Try another')
            } 
            else if (gameboard.board[index] == ' ')  {
                gameboard.board[index] = playerOne.mark;
                gameboard.rendering()
                
                winTo ()
                
                swaping.swap()  
            }
        })
    })
}

const initListener2 = () => {
    let box = document.querySelectorAll('.square')

    box.forEach((item, index) => {


        item.addEventListener('click', () => {
                if (gameboard.board[index] !== ' ') {
                console.log('Try another')
            } 
            else if (gameboard.board[index] == ' ')  {
                gameboard.board[index] = playerTwo.mark;
                gameboard.rendering()
                
                winTo ()
                
                swaping.swap()
            }
        })
    })
}
            

/* Function to check if someone win */

const winTo = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        for (let j = 0; j < 4; j++) {

            if (gameboard.board[winningConditions[i][j]] == 'X' &&
                gameboard.board[winningConditions[i][j]] == gameboard.board[winningConditions[i][j+1]] &&
                gameboard.board[winningConditions[i][j+1]] == gameboard.board[winningConditions[i][j+2]]) {
                    winX ();

            }  if (gameboard.board[winningConditions[i][j]] == 'O' &&
                gameboard.board[winningConditions[i][j]] == gameboard.board[winningConditions[i][j+1]] &&
                gameboard.board[winningConditions[i][j+1]] == gameboard.board[winningConditions[i][j+2]]) {
                    winY ();

            }  if (!gameboard.board.includes(' ') )  {
                    draw ();
            }
        
        }
    } 
}


const winX = () => {
    winDiv.classList.remove('invisible');
    winner.innerHTML = `${playerOne.name}`;
}

const winY = () => {
    winDiv.classList.remove('invisible');
    winner.innerHTML = `${playerTwo.name}`;
}

const draw = () => {
    winDiv.classList.remove('invisible');
    winDiv.innerHTML = `<p>It's a TIE</p><p>Click to play again</p>`;
}


/* Restart game */

winDiv.addEventListener('click', () => {
    gameboard.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    gameboard.rendering();
    winDiv.classList.add('invisible');
    form.classList.remove('hiden')
})