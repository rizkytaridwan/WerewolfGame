import React, { useState } from 'react';

function WerewolfGame() {
  const [numberOfPlayers, setNumberOfPlayers] = useState('');
  const [numberOfWerewolves, setNumberOfWerewolves] = useState('');
  const [numberOfSeers, setNumberOfSeers] = useState('');
  const [players, setPlayers] = useState([]);
  const [initRoles, setInitRoles] = useState([]);

  const initializePlayers = () => {
    if (numberOfPlayers > 0 && numberOfWerewolves > 0 && numberOfSeers > 0) {
      const initialRoles = Array.from({ length: numberOfWerewolves }, () => 'Werewolf')
        .concat(Array.from({ length: numberOfSeers }, () => 'Seer'))
        .concat(Array.from({ length: numberOfPlayers - numberOfWerewolves - numberOfSeers }, () => 'Villager'));
      
      const shuffledRoles = initialRoles.sort(() => 0.5 - Math.random());
      setInitRoles(shuffledRoles);

      const playerSetup = Array.from({ length: numberOfPlayers }, (_, i) => ({
        id: i + 1,
        name: '',
        role: null,
        showRole: false
      }));
      
      setPlayers(playerSetup);
    }
  };

  const handleNameInput = (index, name) => {
    let updatedPlayers = [...players];
    updatedPlayers[index].name = name;
    setPlayers(updatedPlayers);
  };

  const assignRole = (index) => {
    let updatedPlayers = [...players];
    updatedPlayers[index].role = initRoles[index];
    updatedPlayers[index].showRole = true;
    setPlayers(updatedPlayers);
  };

  const hideRole = (index) => {
    let updatedPlayers = [...players];
    updatedPlayers[index].showRole = false;
    setPlayers(updatedPlayers);
  };

  return (
    <div>
      <h1>Werewolf Game Setup</h1>
      {players.length === 0 && (
        <div>
          <input
            type="number"
            min="1"
            max="20"
            placeholder="Enter number of players"
            value={numberOfPlayers}
            onChange={(e) => setNumberOfPlayers(parseInt(e.target.value, 10))}
          />
          <input
            type="number"
            min="1"
            max={numberOfPlayers}
            placeholder="Number of Werewolves"
            value={numberOfWerewolves}
            onChange={(e) => setNumberOfWerewolves(parseInt(e.target.value, 10))}
          />
          <input
            type="number"
            min="1"
            max={numberOfPlayers - numberOfWerewolves}
            placeholder="Number of Seers"
            value={numberOfSeers}
            onChange={(e) => setNumberOfSeers(parseInt(e.target.value, 10))}
          />
          <button onClick={initializePlayers}>Set Players</button>
        </div>
      )}
      {players.length > 0 && (
        <div>
          {players.map((player, index) => (
            <div key={player.id}>
              <input
                placeholder="Enter player name"
                value={player.name}
                onChange={(e) => handleNameInput(index, e.target.value)}
                disabled={player.showRole}
              />
              <button onClick={() => assignRole(index)} disabled={!player.name}>
                {player.showRole ? `Your role: ${player.role}` : `Pick a Card`}
              </button>
              {player.showRole && <button onClick={() => hideRole(index)}>Hide Role</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WerewolfGame;
