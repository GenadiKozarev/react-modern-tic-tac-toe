## Slick, modern and animated Tic-Tac-Toe game.

### Build with **React**.

This Tic-Tac-Toe game:
- Lets you play tic-tac-toe,
- Indicates when a player has won the game,
- Stores a game’s history as a game progresses,
- Allows players to review a game’s history and see previous versions of a game’s board.

Covered topics:
- passing data through props
- leveraging `useState` and `useEffect` hooks
- lifting state up
- declare shared state in the closest common ancestor
- keeping child components in sync with each other
- the importance of immutability

TODO:
- For the current move only, show “You are at move #…” instead of a button.
- Rewrite Board to use two loops to make the squares instead of hardcoding them.
- Add a toggle button that lets the user sort the moves in either ascending or descending order.
- When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
- Display the location for each move in the format (row, col) in the move history list.