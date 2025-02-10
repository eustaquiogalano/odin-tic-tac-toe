// This function is responsible for the states of the board
// also responsible for setting up the board at initial state
// where no marks are placed yet, also responsible for
// dropping or placing a mark on a cell
// and printing the board after each player's turn
// on marking a cell.

function Gameboard() {

    // Tic Tac Toe is playable in a 3x3 grid.
    const row = 3;
    const column  = 3;
    const board = [];

    // This will create a 2d array for the 3x3 grid cell
    for (let r = 0; r < row; r++) {
        board[r] = [];
        for (let c = 0; c < column; c++) {
            board[r].push("PLAYER's MARK");
        }
    }

    return {
        board,
    }
}

// This function is responsible for rendering the game 
// for now in the console
// but once the script is all set
// we will move the rendering on its own UI

function renderGameOnScreen() {

    const boardState = Gameboard()

    // for now console is our UI
    console.log( boardState.board );
    
}

renderGameOnScreen();