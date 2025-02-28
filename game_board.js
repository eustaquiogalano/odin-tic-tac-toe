import { Cell } from "./cell.js";

// This function is responsible for the states of the board
// also responsible for setting up the board at initial state
// where no marks are placed yet, also responsible for
// dropping or placing a mark on a cell
// and printing the board after each player's turn
// on marking a cell.

const gameBoard = (function Gameboard() {

    // Tic Tac Toe is playable in a 3x3 grid.
    const row = 3;
    const column = 3;
    const board = [];

    // once invoked this will reset the board to its initial state
    const resetEverything = () => {

        // This will create a 2d array for the 3x3 grid cell
        for (let r = 0; r < row; r++) {
            board[r] = [];
            for (let c = 0; c < column; c++) {
                board[r].push(Cell());
            }
        }
    };

    // sets everything to initial state
    resetEverything();

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
            return row.map((cell) => {
                return cell.getValue();
            });
        });

        console.log(boardWithCellValues);
    };

    return { getBoard, dropMark, printBoard, resetEverything };
})();

export { gameBoard };