const gridCellContainer = document.querySelector("#grid-cell-container");
const restartGameButton = document.querySelector("#restart");
const listOfButtonCells = document.querySelectorAll("#grid-cell-container button");

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
// - rendering the updated board each turn
// - switch the player's turn
// - check for winner
// - render score 

const gameController = (function (
    playerX = "Player X",
    playerO = "PLayer O"
) {

    const winningCombinations = [
        ["00", "11", "22"], ["02", "11", "20"],  // Diagonals
        ["00", "10", "20"], ["01", "11", "21"], ["02", "12", "22"],  // Verticals
        ["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"]  // Horizontals 
    ];

    const players = [
        {
            name: playerX,
            mark: "X",
            selections: [],
        },
        {
            name: playerO,
            mark: "O",
            selections: [],
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // Once invoked this will reset the selections 
    // of each player 
    const resetSelection = () => {
        players[0].selections = [];
        players[1].selections = [];
    };

    // responsible for rendering the board
    // to the console in every players turn 
    const printNewRound = () => {
        gameBoard.printBoard();  // display the board to the console
        console.log(`${getActivePlayer().name}'s turn.`);
    };


    const checkWinner = (selectedCellID) => {

        // add the ID of the selected button cell
        // to the corresponding player's selections array  
        getActivePlayer().selections.push(selectedCellID);

        // check the selected button cells of each players each round
        // to verify if we have a winner
        for (let i = 0; i < winningCombinations.length; i++) {
            if (
                getActivePlayer().selections.includes(winningCombinations[i][0]) &&
                getActivePlayer().selections.includes(winningCombinations[i][1]) &&
                getActivePlayer().selections.includes(winningCombinations[i][2])
            ) {
                // if selections matches any of the winning combinations
                // we have a winner
                // do the things below

                // Declare winner in console
                console.log(`Winner ${getActivePlayer().name}`);

                // disable button cells to stop the game
                listOfButtonCells.forEach((cell) => {
                    cell.setAttribute("disabled", "true");
                });
            }
        }
    };

    // responsible for playing every round
    const playRound = (row, column) => {
        console.log(
            `Dropping ${getActivePlayer().mark} mark..........`
        );

        // drops the player mark to the selected cell
        gameBoard.dropMark(row, column, getActivePlayer().mark);

        switchActivePlayer();   // switch player's turn
        // update the mark to drop
        document.querySelector("#player-container span").textContent = `${getActivePlayer().mark}`;
        printNewRound();  // then start new round
    };

    // once GameController gets invoked
    // this will be the initial display
    printNewRound();

    return { getActivePlayer, playRound, checkWinner, resetSelection };
})();



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
        [row, column] = selectedButtonCell.id.split("-")[1].split('');

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


