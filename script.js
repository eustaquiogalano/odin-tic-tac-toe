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

    // A method for printing the updated board 
    // after each player's turn 
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => {
            return row.map((cell) => cell.getValue())
        });
        console.log( boardWithCellValues );
    };

    return { getBoard, printBoard };
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

    return { };
}



// This function is responsible for rendering the game 
// for now in the console
// but once the script is all set
// we will move the rendering on its own UI

function renderGameOnScreen() {

    const boardState = Gameboard()

    // for now console is our UI
    // but once the script is good to go, we will transfer to 
    // the DOM

    console.log( boardState.getBoard() );
    
    console.log(boardState.printBoard());

}


// initial render
renderGameOnScreen();