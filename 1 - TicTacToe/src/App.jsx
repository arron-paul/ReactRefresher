import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";

// Constants for player names
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

// Initial state of the game board
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// `deriveActivePlayer`, `deriveWinner`, and `deriveGameBoard` are pure functions that derive the current state from `gameTurns` and `players` without directly modifying the state.
// This ensures that the state is managed in a predictable and immutable manner, improving performance and making debugging easier.

// Derive the active player based on game turns
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

// Derive the winner based on the game board
function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol == secondSquareSymbol &&
      firstSquareSymbol == thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

// // Derive the game board state based on game turns
function deriveGameBoard(gameTurns) {
  // We need to create a copy so we can reset the game board
  // without mutating the original.
  let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player; // <- Mutating
  }
  return gameBoard;
}

function App() {
  // On each reload of this component, the state is updated

  // React state hooks
  // `useState` hooks run druing the initial render and subsequent updates.
  // The component re-renders when state or props change, causing the derived states and the DOM to update accordingly.
  // When the `App` component mounts, the `useState` hook initializes the `players` and `gameTurns` states.
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  // Derived states
  // Components like `Player`, `GameBoard`, and `Log` recieve props from the `App` and render based on those props.
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  // Handles selecting a square
  // When `handleSelectSquare` is called, `setGameTurns` updates the state with the new move.
  // State updates are asynchronous; React batches updates and re-renders the component after the state has been updated.
  function handleSelectSquare(rowIndex, colIndex) {
    // Update game turns state
    // `prevTurns` represents the state before the update, ensuring state updates are based on the most recent state.
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  // Handles game restart
  function handleRestart() {
    setGameTurns([]);
  }

  // Handles player name change
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangedName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangedName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
