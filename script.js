/* Defining objects and DOM objcets */

let boardDispl = document.querySelector('.board');
let test = document.querySelector('.test');
let form = document.querySelector('.names');
let startBtn = document.querySelector('.submitBtn');
let winner = document.querySelector('.winner');
let winDiv = document.querySelector('.win');

/* Winning conditions */

let winningConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];


/* Gameboard */
const gameboard = (() => {
    const board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    return {
        board
    }
})();

renderBoard ();

function renderBoard () {
    boardDispl.innerHTML = ''
    for (let i = 0; i < gameboard.board.length; i++) {
        boardDispl.innerHTML += `<div class="square num${[i]}"><p>${gameboard.board[i]}</p></div>`
    }
    swap ()
}

/* Player factory */

const playerFactory = (name, mark) => {
    
    return {name, mark}
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
    form.classList.add('hiden')
    form.reset();
})


/* Gameplay */

function initListener1 () {
    let box = document.querySelectorAll('.square')

    box.forEach((item, index) => {


        item.addEventListener('click', () => {
                if (gameboard.board[index] !== ' ') {
                console.log('Try another')
            } 
            else if (gameboard.board[index] == ' ')  {
                gameboard.board[index] = playerOne.mark;
                renderBoard ()
                
                win ()
                
                swap ()
            }
        })
    })

    }

function initListener2 () {
    let box = document.querySelectorAll('.square')

    box.forEach((item, index) => {


        item.addEventListener('click', () => {
                if (gameboard.board[index] !== ' ') {
                console.log('Try another')
            } 
            else if (gameboard.board[index] == ' ')  {
                gameboard.board[index] = playerTwo.mark;
                renderBoard ()
                
                win ()
                
                swap ()
            }
        })
    })

    }
            

/* Swap players */

function swap () {
    let plOneAmount = 0;
    let plTwoAmount = 0;

    for (let i = 0; i < gameboard.board.length; i++) {

        if (gameboard.board[i] === 'X') {
            plOneAmount++
        } else if (gameboard.board[i] === 'O') {
            plTwoAmount++
        }
    }

    if (plOneAmount == plTwoAmount) {
        initListener1 ()
    } else if (plOneAmount > plTwoAmount) {
        initListener2 ()
    }
} 


/* Function to check if player win */

function win () {
    
    let ind1 = [];
    let ind2 = [];

    for (let i = 0; i < gameboard.board.length; i++) {
        
        if (gameboard.board[i] === `${playerOne.mark}`) {
            ind1.push(i)
        } else if (gameboard.board[i] === `${playerTwo.mark}`) {
            ind2.push(i)
        }
    }
        
        for (let i = 0; i < winningConditions.length; i++) {
            let count1 = 0;
            let compare1 = [];
            let count2 = 0;
            let compare2 = [];

            compare1 = [...winningConditions[i], ...ind1]
            compare1.sort();

            compare2 = [...winningConditions[i], ...ind2]
            compare2.sort();
    
            for (let j = 0; j < compare2.length; j++) {
                if (compare1[j] == compare1[j+1]) {
                    count1++;
                    console.log(`count 1: ${count1}`)

                } else if (compare2[j] == compare2[j+1]) {
                    count2++;
                    console.log(`count 2: ${count2}`)
                }
            }

            if (count1 == 3) {
                winDiv.classList.remove('invisible');
                winner.innerHTML = `${playerOne.name}`;

            } else if (count2 == 3) {
                winDiv.classList.remove('invisible');
                winner.innerHTML = `${playerTwo.name}`;
                
            } else if (ind1.length > 4) {
                winDiv.classList.remove('invisible');
                winDiv.innerHTML = `<p>It's a TIE</p><p>Click to play again</p>`;
            }
        }
    
}


/* Restart game */

winDiv.addEventListener('click', () => {
    gameboard.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    renderBoard();
    winDiv.classList.add('invisible');
    form.classList.remove('hiden')
})