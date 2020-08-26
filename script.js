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


function renderBoard () {
    boardDispl.innerHTML = ''
    for (let i = 0; i < gameboard.board.length; i++) {
        boardDispl.innerHTML += `<div class="square num${[i]}">${gameboard.board[i]}</div>`
    }
    initListeners ()
}

renderBoard ();

/* Player factory */
const playerFactory = (name, mark) => {
    const playerMove = () => test.innerHTML = mark;

    return {name, mark, playerMove}
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
    console.log(playerOne.name)
})


/* Gameplay */

function initListeners () {
    initListener1 ()
        function initListener1 () {
            let box = document.querySelectorAll('.square')

            box.forEach((item, index) => {


                item.addEventListener('click', () => {
                    if (gameboard.board[index] == ' ')  {
                        gameboard.board[index] = playerOne.mark;
                        renderBoard ()
                        console.log(gameboard.board)
                        initListener2()
                    }

                    else if (gameboard.board[index] === 'O' || gameboard.board[index] === 'X') {
                        console.log(gameboard.board)
                    } 

                })
            })

            }

            function initListener2 () {
                let box = document.querySelectorAll('.square')
            
                box.forEach((item, index) => {
            
            
                    item.addEventListener('click', () => {
                        if (gameboard.board[index] == ' ')  {
                            gameboard.board[index] = playerTwo.mark;
                            renderBoard ()
                            console.log(gameboard.board)
                            initListener1()
                        }
            
                        else if (gameboard.board[index] === 'O' || gameboard.board[index] === 'X') {
                            console.log(gameboard.board)
                        } 
            
                    })
                })
            
                }
            }