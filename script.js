import { gameBoard } from "./game_board.js";
import { gameController } from "./game_controller.js";

const gridCellContainer = document.querySelector("#grid-cell-container");
const restartGameButton = document.querySelector("#restart");
const listOfButtonCells = document.querySelectorAll("#grid-cell-container button");

// This function is responsible for rendering the game 
// in the DOM

(function renderGameOnScreen() {

    // Once a cell was clicked the game starts 
    gridCellContainer.addEventListener("click", (e) => {

        // Get the ID of the selected cell
        const selectedButtonCell = e.target;

        // If ever the container 
        // was selected it will do nothing
        // or if the selected cell has already a value
        // it wil also do nothing
        if (selectedButtonCell.id === "grid-cell-container" ||
            !(selectedButtonCell.textContent === "")
        ) {
            return;
        }

        // Array destructuring 
        // variable row and column will extract the last two 
        // digit from the ID which is the cell locator
        const [row, column] = selectedButtonCell.id.split("-")[1].split('');

        // Before playing a round check first for a winner
        const winner = gameController.checkWinner(selectedButtonCell.id.split("-")[1]);

        // Update the text content of the selected cell 
        // depending on whose player's turn
        // either X or O
        e.target.textContent = `${gameController.getActivePlayer().mark}`;

        // Play the round 
        // using the row and column as the locators
        gameController.playRound(row, column)
    });

    // reset button
    // resets the game to its original state
    restartGameButton.addEventListener("click", () => {
        gameBoard.resetEverything();
        gameBoard.printBoard();

        // reset the selections of each player
        gameController.resetSelection();

        listOfButtonCells.forEach((cell) => {
            cell.textContent = "";
            cell.removeAttribute("disabled");
        });
    });    
})();


