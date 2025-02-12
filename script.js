// This function is responsible for the states of the board
// also responsible for setting up the board at initial state
// where no marks are placed yet, also responsible for
// dropping or placing a mark on a cell
// and printing the board after each player's turn
// on marking a cell.

function Gameboard() {

    // Tic Tac Toe is playable in a 3x3 grid.
    const row = 3;
    const column = 3;
    const board = [];

    // This will create a 2d array for the 3x3 grid cell
    for (let r = 0; r < row; r++) {
        board[r] = [];
        for (let c = 0; c < column; c++) {
            board[r].push(Cell());
        }
    }

    // a method for getting the initial state of the board
    const getBoard = () => board;


    // responsible for locating the selected cell
    // and dropping the mark 
    const dropMark = (row, column, mark) => {
        
        // locates the cell
        // using the addMark method to change the 
        // value inside Cell function
        board[row][column].addMark(mark);

        };

    // A method for printing the updated board 
    // after each player's turn 
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => {
            return row.map((cell) => cell.getValue());
        });
        console.log( boardWithCellValues );
    };

    return { getBoard, dropMark, printBoard };
}


// THis function is responsible for each cell content
// "" - initial value of each cell

function Cell() {
    let value = "";

    const getValue = () => value;

    const addMark = (playerMark) => {
        value = playerMark;
    };

    return { getValue, addMark };
}



// This function is responsible for the flow of the game.
//  

function GameController(
    playerX = "Player X",
    playerO = "PLayer O"
) {

    const board = Gameboard();

    const players = [
        {
            name: playerX,
            mark: "X"
        },
        {
            name: playerO,
            mark: "O"
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // responsible for rendering the board
    // to the console in every players turn 
    const printNewRound = () => {
        board.printBoard();  // display the board to the console
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    // responsible for playing every round
    const playRound = (row, column) => {
        console.log(
            `Dropping ${getActivePlayer().mark} mark..........`
        );
        
        // drops the player mark to the selected cell
        board.dropMark(row, column, getActivePlayer().mark);

        // switch player every turn
        // then start new round
        switchActivePlayer();
        printNewRound();
    };

    // once GameController gets invoked
    // this will be the initial display
    printNewRound();

    return { getActivePlayer, playRound};
}



// This function is responsible for rendering the game 
// for now in the console
// but once the script is all set
// we will move the rendering on its own UI

function renderGameOnScreen() {

    const game = GameController();
    
    game.playRound(1, 1);
    game.playRound(0, 0);
    game.playRound(2, 2);
    game.playRound(2, 0);
    game.playRound(0, 1);
    game.playRound(0, 2);
    game.playRound(2, 1);
    game.playRound(1, 0);

    // for now console is our UI
    // but once the script is good to go, we will transfer to 
    // the DOM
}


// initial render
renderGameOnScreen();