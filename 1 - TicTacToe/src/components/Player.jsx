import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangedName,
}) {
  // Local state for player name and edit mode
  let [playerName, setPlayerName] = useState(initialName);
  let [isEditing, setIsEditing] = useState(false);

  // Handle the edit button click
  const handleEditClick = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangedName(symbol, playerName);
    }
  };

  // Handle changes to the input field
  const handleChange = (event) => {
    setPlayerName(event.target.value);
  };

  // Conditionally render the player name as a span or input field
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    // Example of two-way binding
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }
  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
