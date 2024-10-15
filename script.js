function GameBoard() {
    let board = [];

    for (let i = 0; i < 3; ++i) {
        let arr = [];
        for (let j = 0; j < 3; ++j)
            arr.push(0);
        board.push(arr);
    }

    let play = (r, c, marker) => {
        if (board[r][c] == 0) {
            board[r][c] = marker;
        }
    }

    let getBoard = () => board;
    return { play, getBoard };

}

function GameControl(p1 = 'Rmikev', p2 = "Kira") {
    let game = GameBoard();
    let player = [
        {
            name: p1,
            marker: `X`,
        },
        {
            name: p2,
            marker: `O`,
        }
    ];
    let currentPlayer = player[0];
    let activePlayer = () => currentPlayer;
    let changePlayer = () => {
        currentPlayer = (currentPlayer === player[0]) ? player[1] : player[0];
    }

    let restart = () => {
        let board = game.getBoard();
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j)
                board[i][j] = 0;
        }
        currentPlayer = player[0];

    };

    let winner = (r, c) => {
        let board = game.getBoard();

        if (board[r][0] != 0 && (board[r][0] === board[r][1] && board[r][1] === board[r][2]))
            return currentPlayer.name;

        else if (board[0][c] != 0 && (board[0][c] === board[1][c] && board[1][c] === board[2][c]))
            return currentPlayer.name;

        else if (board[0][0] != 0 && (board[0][0] === board[1][1] && board[1][1] === board[2][2]))
            return currentPlayer.name;

        else if (board[0][2] != 0 && (board[0][2] === board[1][1] && board[1][1] === board[2][0]))
            return currentPlayer.name;

        return false;
    }

    let playRound = (r, c) => {
        game.play(r, c, currentPlayer.marker);
        changePlayer();

    }

    return { playRound, activePlayer, restart, winner, getBoard: game.getBoard };
}



function ScreenControl() {
    let game = GameControl();

    let boardDiv = document.querySelector(".board");

    let update = () => {
        boardDiv.textContent = " ";

        let playerDiv = document.querySelector(".player");
        let currentPlayer = game.activePlayer();

        let board = game.getBoard();

        playerDiv.textContent = `${currentPlayer.name}'s Turn`;

        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                let cell = document.createElement("button");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;

                if (board[i][j] != 0)
                    cell.textContent = `${board[i][j]}`
                boardDiv.append(cell);


            }
        }


    }
    function clickHandler(e) {
        let row = e.target.dataset.row;
        let col = e.target.dataset.col;

        game.playRound(row, col);
        update();

    }

    boardDiv.addEventListener("click", clickHandler);

    let restartBtn = document.querySelector(".restart");
    restartBtn.addEventListener("click", () => {
        game.restart();
        update();
    });

    update();
}
ScreenControl();