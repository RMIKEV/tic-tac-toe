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
            return true;
        }
        else false;
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
    let count =0;
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
        count=0;

    };
   
    let winner = (r, c) => {
        let board = game.getBoard();
        ++count;
        console.log(count);
        if (board[r][0] != 0 && (board[r][0] === board[r][1] && board[r][1] === board[r][2]))
            return `${currentPlayer.marker} WINS`;
        else if (board[0][c] != 0 && (board[0][c] === board[1][c] && board[1][c] === board[2][c]))
            return `${currentPlayer.marker} WINS`;
        else if (board[0][0] != 0 && (board[0][0] === board[1][1] && board[1][1] === board[2][2]))
            return `${currentPlayer.marker} WINS`;
        else if (board[0][2] != 0 && (board[0][2] === board[1][1] && board[1][1] === board[2][0]))
            return `${currentPlayer.marker} WINS`;
        else if(count == 9)
            return "Draw";
        else
            return false;
    }

    let playRound = (r, c) => {
        let next =game.play(r, c, currentPlayer.marker);
        if(next){
            let check =winner(r,c);
            if(check){
                restart();
                return check;
            }
            changePlayer();
        }
       

    }

    return { playRound, activePlayer, restart, winner, getBoard: game.getBoard };
}



function ScreenControl() {
    let game = GameControl();

    let boardDiv = document.querySelector(".board");
    let winnerDiv = document.querySelector(".winner");

    let update = (row, col) => {
        boardDiv.textContent = " ";

        let playerDiv = document.querySelector(".player");
        let currentPlayer = game.activePlayer();

        let board = game.getBoard();

        playerDiv.textContent = `${currentPlayer.marker}'s Turn`;

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

        let ans = game.playRound(row, col);
        update();
        if(ans){
            winnerDiv.textContent=`${ans}`;
            boardDiv.disabled = true;
        }
            

    }

    boardDiv.addEventListener("click", clickHandler);

    let restartBtn = document.querySelector(".restart");
    restartBtn.addEventListener("click", () => {
        game.restart();
        update();
        winnerDiv.textContent=``;
    });

    update();
}
ScreenControl();