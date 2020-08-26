/* Defining objects */
let boardDispl = document.querySelector('.board');
let test = document.querySelector('.test');
let form = document.querySelector('.names');


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
        boardDispl.innerHTML += `<div class="square num${[i]}">${gameboard.board[i]}</div>`
    }
    swap ()
}


/* Player factory */

const playerFactory = (name, mark) => {
    
    return {name, mark}
}


/* Creating players from form */

let playerOne;
let playerTwo;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let player1 = document.querySelector('.player1').value;
    let player2 = document.querySelector('.player2').value;

    playerOne = playerFactory (player1, 'X');
    playerTwo = playerFactory (player2, 'O');
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
                        
                        initListener2()
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
                            
                            initListener1()
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

/* Function to check if player win */
function win () {
    
    let ind = [];

    for (let i = 0; i < gameboard.board.length; i++) {
        
        if (gameboard.board[i] === `${playerOne.mark}`) {
            ind.push(i)
        }
    }
        
        
        for (let i = 0; i < winningConditions.length; i++) {
            let count = 0;
            let compare = [];
            compare = [...winningConditions[i], ...ind]
            compare.sort();
    
            for (let j = 0; j < compare.length; j++) {
                if (compare[j] == compare[j+1]) {
                    count++;
                    console.log(count)
                }
            }
            if (count == 3) {
                console.log('Win!')
            }
        }
    
}

