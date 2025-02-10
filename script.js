function Gameboard() {
    const row = 3;
    const column = 3;
    const board =  [];

    for (let r = 0; r < row; r++) {
        board[r] = [];
        for (let c = 0; c < column; c++) {
            board[r].push(Cell()); 
        }
    }

    return {
        board,
    }
}


function Cell() {
    let value = 0;

    // Accept a player's token to change the value of the cell
    const addMark = (player) => {
        value = player;
    };

    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;

    return {
        addMark,
        getValue
    };
}


const game = Gameboard();

console.log( game.board );

