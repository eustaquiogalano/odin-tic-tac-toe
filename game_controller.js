import { gameBoard } from "./game_board.js";

// This module is responsible for the flow of the game.
// - rendering the updated board each turn
// - switch the player's turn
// - check for winner
// - get the active player
// - reset the selected cells of each player
// - display new round 
// - initiate the game  

const gameController = (function () {

    const winningCombinations = [
        ["00", "11", "22"], ["02", "11", "20"],  // Diagonals
        ["00", "10", "20"], ["01", "11", "21"], ["02", "12", "22"],  // Verticals
        ["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"]  // Horizontals 
    ];

    const players = [
        {
            name: "Player X",
            mark: "X",
            selections: [],
            score: 0,
        },
        {
            name: "PLayer O",
            mark: "O",
            selections: [],
            score: 0,
        }
    ];

    // This will set the initial active player
    let activePlayer = players[0];

    // Once invoked it will return the current playing player
    const getActivePlayer = () => activePlayer;

    // Once invoked it will switch the 
    // current playing player to the other player 
    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // Once invoked it will ask for the players name
    // and set it as the player's name 
    const setPlayerName = () => {

        // asks for each players name
        const xName = prompt("Player X name:");
        const oName = prompt("Player O name:");

        // set names based on what the user provide
        // and display the name on the DOM  
        const playerXName = document.querySelector("#x-name");
        playerXName.textContent = xName ||`${players[0].name}`;

        const playerOName = document.querySelector("#o-name");
        playerOName.textContent = oName || `${players[1].name}`;
    };

    const getScore = (xScore, oScore) => {
        xScore.textContent = `${players[0].score}`;
        oScore.textContent = `${players[1].score}`;

    };

    // Once invoked this will reset the 
    // selections of each player 
    const resetSelection = () => {
        players[0].selections = [];
        players[1].selections = [];
    };

    // Once invoked it will display the board
    // and the name of the playing player
    const printNewRound = () => {
        gameBoard.printBoard();  // display the board to the console
        console.log(`${getActivePlayer().name}'s turn.`); // display players name
    };

    // Once invoked it will check for a winner
    const checkWinner = (selectedCellID, listOfButtonCells) => {

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

                // update score of the winner
                getActivePlayer().score++;

                // display the score to the DOM
                const playerXScore = document.querySelector("#x-score-display");
                const playerOScore = document.querySelector("#o-score-display");
                getScore(playerXScore, playerOScore);

                // disable button cells to stop the game
                listOfButtonCells.forEach((cell) => {
                    cell.setAttribute("disabled", "true");
                });
            }
        }
    };

    // Once invoked it will initiate a round
    const playRound = (row, column) => {

        // drops the player mark to the selected cell
        gameBoard.dropMark(row, column, getActivePlayer().mark);

        switchActivePlayer();   // switch player's turn
        // update the mark to drop
        document.querySelector("#player-container span").textContent = `${getActivePlayer().mark}`;
        printNewRound();  // then start new round
    };

    // This will be the initial round of the game
    printNewRound();  // display new round
    setPlayerName();  // ask for each players name

    // returning methods
    return { 
        getActivePlayer, 
        playRound, 
        checkWinner, 
        resetSelection, 
        getScore
    };
})();

export { gameController };