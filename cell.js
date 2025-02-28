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

export { Cell };