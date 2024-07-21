export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <p>{winner ? `Winner: ${winner}` : "It's a draw!"}</p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}
