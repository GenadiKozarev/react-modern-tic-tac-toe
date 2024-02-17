import { useState } from "react";

function Square({ value, onSquareClick, isWinningSquare }) {
    return (
        <button
            className={isWinningSquare ? "square highlight" : "square"}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    const { winner, winningSquares } = calculateWinnerInfo(squares);
    let status;
    const isDraw = squares.every(square => square !== null);

    if (winner) {
        status = `Winner: ${winner}`;
    } else if (isDraw) {
        status = "It's a draw!";
    } else {
        status = `Next player: ${xIsNext ? "X" : "O"}`;
    }

    function handleClick(i) {
        // if a square is already filled OR there is a winner
        if (squares[i] || winner) {
            return;
        }
        const nextSquares = squares.slice();
        // update the text of the square based on the xIsNext boolean value
        xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
        onPlay(nextSquares);
    }

    function renderSquare(index) {
        const isWinningSquare = winningSquares && winningSquares.includes(index);

        return (
            <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
                isWinningSquare={isWinningSquare}
            />
        );
    }

    // Use loops to generate the squares dynamically
    const rows = [];
    for (let row = 0; row < 3; row++) {
        const squaresInRow = [];
        for (let col = 0; col < 3; col++) {
            const squareIndex = row * 3 + col;
            squaresInRow.push(renderSquare(squareIndex));
        }
        rows.push(<div key={row} className="board-row">{squaresInRow}</div>);
    }

    return (
        <>
            <div className="status">{status}</div>
            {rows}
        </>
    );
}

export default function Game() {
    // initial state: an array with 1 array with 9 null values
    const [history, setHistory] = useState([Array(9).fill(null)]);
    // keep track of which step the user is currently viewing
    const [currentMove, setCurrentMove] = useState(0);
    const [sortAscending, setSortAscending] = useState(true);
    // even number, determines "X" or "O"
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        // Create a new history array by concatenating the existing history up to the current move
        // with the next squares representing the updated state of the board after the player's move.
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }
    function toggleSortOrder() {
        setSortAscending(!sortAscending);
    }

    // `move`: the index of `squares`
    let moves = history.map((squares, move) => {
        let description;
        move > 0
            ? (description = `Go to move #${move}`)
            : (description = "Go to game start");

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    if (!sortAscending) {
        moves = moves.reverse();
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <div>
                    <button onClick={toggleSortOrder}>
                        {sortAscending ? "Sort Descending" : "Sort Ascending"}
                    </button>
                </div>
                <ul>{moves}</ul>
                <p>
                    {currentMove
                        ? `You are at move #${currentMove + 1}`
                        : "Time to make the first move!"}
                </p>
            </div>
        </div>
    );
}

function calculateWinnerInfo(squares) {
    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6], // Diagonal from top-right to bottom-left
    ];
    // Iterate over each winning combination.
    for (let i = 0; i < winningCombinations.length; i++) {
        // Destructure the current winning combination into variables a, b, and c.
        const [a, b, c] = winningCombinations[i];
        // A winning combination exists if all squares in the combination are non-empty and have the same value.
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return { winner: squares[a], winningSquares: [a, b, c] };
        }
    }
    return {};
}