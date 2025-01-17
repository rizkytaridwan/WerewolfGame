import React, { useState } from 'react';
import { ArrowLeft, HelpCircle } from 'lucide-react';

const WerewolfGame = () => {
  const [gameState, setGameState] = useState('setup');
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [showRole, setShowRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  const [gameConfig, setGameConfig] = useState({
    civilians: 5,
    undercover: 3,
    mrWhite: 1
  });

  const initializePlayers = () => {
    const totalPlayers = gameConfig.civilians + gameConfig.undercover + gameConfig.mrWhite;
    const roles = [
      ...Array(gameConfig.civilians).fill('Civilian'),
      ...Array(gameConfig.undercover).fill('Werewolf'),
      ...Array(gameConfig.mrWhite).fill('Seer')
    ].sort(() => Math.random() - 0.5);

    setPlayers(roles.map((role, index) => ({
      id: index + 1,
      role,
      name: '',
      secret: Math.random().toString(36).substring(7),
      revealed: false
    })));
    setGameState('selection');
  };

  const handlePlayerReveal = (index) => {
    if (!players[currentPlayer] || players[index].revealed) return;

    setSelectedRole(players[currentPlayer].role);
    setSelectedPlayerIndex(index);
    setShowRole(true);
  };

  const handleConfirmRole = () => {
    setPlayers(players.map((p, idx) => 
      idx === selectedPlayerIndex ? {...p, revealed: true} : p
    ));
    setShowRole(false);
    setSelectedRole(null);
    
    if (currentPlayer < players.length - 1) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      setGameState('play');
    }
  };

  const RoleModal = () => {
    let buttonColor;
    switch (selectedRole) {
      case 'Civilian':
        buttonColor = 'bg-green-500';
        break;
      case 'Werewolf':
        buttonColor = 'bg-red-500';
        break;
      case 'Seer':
        buttonColor = 'bg-purple-500';
        break;
      default:
        buttonColor = 'bg-gray-500';
    }

    return (
      <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-xl p-6 mx-4 w-full max-w-sm">
          <div className="w-16 h-16 rounded-full bg-gray-800 text-white flex items-center justify-center text-2xl mx-auto mb-4">
            {selectedRole === 'Civilian' && 'C'}
            {selectedRole === 'Werewolf' && 'W'}
            {selectedRole === 'Seer' && 'S'}
          </div>
          <h3 className="text-xl font-bold text-center mb-2 text-white">
            {selectedRole}
          </h3>
          <p className="text-gray-400 text-center mb-6">
            Ini adalah peran rahasiamu. Jangan tunjukkan ke siapapun!
          </p>
          <button
            onClick={handleConfirmRole}
            className={`w-full text-white rounded-full py-3 ${buttonColor}`}>
            OK
          </button>
        </div>
      </div>
    );
  };

  if (gameState === 'setup') {
    return (
      <div className="flex flex-col h-screen bg-cover bg-center p-4" style={{ backgroundImage: 'url(/path/to/your/werewolf-background.jpg)' }}>
        <div className="flex justify-between items-center mb-8">
          <ArrowLeft className="w-8 h-8 text-red-400" />
          <div className="text-white">Grup</div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-white text-2xl mb-8">Pemain: {
            gameConfig.civilians + gameConfig.undercover + gameConfig.mrWhite
          }</h2>
          
          <div className="bg-gray-800/75 rounded-xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center text-white mb-4">
              <span>Civilian</span>
              <div className="flex items-center gap-2">
                <button 
                  className="w-8 h-8 bg-black/50 rounded-full"
                  onClick={() => setGameConfig({...gameConfig, civilians: Math.max(1, gameConfig.civilians - 1)})}>
                  -
                </button>
                <span>{gameConfig.civilians}</span>
                <button 
                  className="w-8 h-8 bg-black/50 rounded-full"
                  onClick={() => setGameConfig({...gameConfig, civilians: gameConfig.civilians + 1})}>
                  +
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-white mb-4">
              <span>Werewolf</span>
              <div className="flex items-center gap-2">
                <button 
                  className="w-8 h-8 bg-black/50 rounded-full"
                  onClick={() => setGameConfig({...gameConfig, undercover: Math.max(1, gameConfig.undercover - 1)})}>
                  -
                </button>
                <span>{gameConfig.undercover}</span>
                <button 
                  className="w-8 h-8 bg-black/50 rounded-full"
                  onClick={() => setGameConfig({...gameConfig, undercover: gameConfig.undercover + 1})}>
                  +
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-white">
              <span>Seer</span>
              <div className="flex items-center gap-2">
                <button 
                  className="w-8 h-8 bg-black/50 rounded-full"
                  onClick={() => setGameConfig({...gameConfig, mrWhite: Math.max(1, gameConfig.mrWhite - 1)})}>
                  -
                </button>
                <span>{gameConfig.mrWhite}</span>
                <button 
                  className="w-8 h-8 bg-black/50 rounded-full"
                  onClick={() => setGameConfig({...gameConfig, mrWhite: gameConfig.mrWhite + 1})}>
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={initializePlayers}
            className="mt-8 bg-red-500 text-white rounded-full py-3 px-12">
            Mulai
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'selection') {
    return (
      <div className="flex flex-col h-screen bg-cover bg-center p-4" style={{ backgroundImage: 'url(/path/to/your/werewolf-background.jpg)' }}>
        <div className="flex justify-between items-center mb-8">
          <ArrowLeft className="w-8 h-8 text-red-400" />
          <HelpCircle className="w-8 h-8 text-red-400" />
        </div>

        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-white text-2xl mb-4">Player {currentPlayer + 1}</h2>
          <p className="text-white mb-8">Pilih kartu</p>

          <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
            {players.map((player, idx) => (
              <button
                key={idx}
                onClick={() => handlePlayerReveal(idx)}
                className={`aspect-square rounded-xl flex items-center justify-center ${player.revealed ? 'bg-gray-800' : 'bg-yellow-400'}`}>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  {player.revealed ? '🔒' : '?'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {showRole && <RoleModal />}
      </div>
    );
  }

  if (gameState === 'play') {
    return (
      <div className="flex flex-col h-screen bg-cover bg-center p-4" style={{ backgroundImage: 'url(/path/to/your/werewolf-background.jpg)' }}>
        <h2 className="text-white text-2xl text-center">Game Dimulai!</h2>
        {/* Add your game play UI here */}
      </div>
    );
  }

  return null;
};

export default WerewolfGame;