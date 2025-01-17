import React, { useState } from 'react';
import { ArrowLeft, HelpCircle } from 'lucide-react';

const WerewolfGame = () => {
  const [gameState, setGameState] = useState('setup');
  const [roles, setRoles] = useState([{ name: 'Werewolf', count: 1 }, { name: 'Seer', count: 1 }, { name: 'Villager', count: 1 }]); // Default roles
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [showRole, setShowRole] = useState(false);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);

  const roleColors = {
    'Werewolf': 'bg-red-500',
    'Villager': 'bg-green-500',
    'Seer': 'bg-purple-500',
    'Doctor': 'bg-blue-500',
    'Hunter': 'bg-orange-500',
    'Witch': 'bg-pink-500',
    'Bodyguard': 'bg-yellow-500',
    'Cupid': 'bg-indigo-500',
    'Jester': 'bg-gray-500',
    'Alpha Werewolf': 'bg-red-700',
    'Mayor': 'bg-teal-500',
    'Detective': 'bg-blue-700',
  };

  const addRole = () => {
    setRoles([...roles, { name: '', count: 1 }]);
  };

  const removeRole = (index) => {
    const newRoles = roles.filter((_, i) => i !== index);
    setRoles(newRoles);
  };

  const updateRole = (index, field, value) => {
    const newRoles = roles.map((role, i) => {
      if (i === index) {
        return { ...role, [field]: value };
      }
      return role;
    });
    setRoles(newRoles);
  };

  const initializePlayers = () => {
    const validRoles = roles.filter(role => role.name.trim() !== ''); // Filter out roles with empty names
    const allRoles = validRoles.flatMap(role => Array(role.count).fill(role.name)).sort(() => Math.random() - 0.5);
    setPlayers(allRoles.map((role, index) => ({
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
    const buttonColor = roleColors[selectedRole] || 'bg-gray-500';

    return (
      <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-xl p-6 mx-4 w-full max-w-sm">
          <div className="w-16 h-16 rounded-full bg-gray-800 text-white flex items-center justify-center text-2xl mx-auto mb-4">
            {selectedRole.charAt(0)}
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

  const RolesModal = () => (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 mx-4 w-full max-w-lg overflow-y-auto max-h-full">
        <h3 className="text-xl font-bold text-white mb-4">PERAN-PERAN DALAM PERMAINAN WEREWOLF</h3>
        <ul className="text-gray-400 space-y-3">
          <li><strong>Werewolf (Manusia Serigala)</strong>: Mengeliminasi warga desa satu per satu setiap malam. Berdiskusi diam-diam dengan sesama werewolf untuk memilih target.</li>
          <li><strong>Villager (Warga Desa)</strong>: Mencoba mengidentifikasi werewolf dan menyingkirkan mereka. Mengandalkan diskusi dan deduksi.</li>
          <li><strong>Seer (Peramal)</strong>: Mengetahui identitas salah satu pemain setiap malam. Memilih satu pemain untuk mengetahui apakah dia werewolf atau bukan.</li>
          <li><strong>Doctor (Dokter)</strong>: Menyelamatkan pemain dari serangan werewolf. Memilih satu pemain untuk diselamatkan setiap malam.</li>
          <li><strong>Hunter (Pemburu)</strong>: Bisa membunuh satu pemain saat ia mati. Jika terbunuh, pemburu boleh menembak satu pemain lain sebelum mati.</li>
          <li><strong>Witch (Penyihir)</strong>: Memiliki dua ramuan, satu untuk menyelamatkan dan satu untuk membunuh. Bisa menyelamatkan seseorang atau membunuh pemain lain.</li>
          <li><strong>Bodyguard (Pengawal)</strong>: Melindungi satu pemain setiap malam. Jika melindungi pemain yang diserang werewolf, ia akan mati sebagai gantinya.</li>
          <li><strong>Cupid</strong>: Memilih dua pemain untuk saling jatuh cinta di awal permainan. Jika salah satu pasangan mati, yang lain akan ikut mati.</li>
          <li><strong>Jester (Joker)</strong>: Berusaha membuat warga menuduhnya dan menggantungnya. Jika warga membunuhnya dalam voting, ia memenangkan permainan.</li>
          <li><strong>Alpha Werewolf (Serigala Alfa)</strong>: Pemimpin werewolf yang dapat menggigit pemain lain untuk menjadikannya werewolf. Bisa menggigit satu pemain untuk mengubahnya menjadi werewolf setiap malam.</li>
          <li><strong>Mayor (Walikota)</strong>: Suaranya dihitung dua kali saat voting. Harus tetap hidup selama mungkin untuk mempengaruhi hasil voting.</li>
          <li><strong>Detective (Detektif)</strong>: Bisa menyelidiki satu pemain setiap malam untuk mengetahui apakah mereka werewolf atau tidak. Mirip peramal, tetapi sering kali bisa menanyakan peran spesifik.</li>
        </ul>
        <button
          onClick={() => setShowRolesModal(false)}
          className="w-full bg-red-500 text-white rounded-full py-3 mt-6">
          Close
        </button>
      </div>
    </div>
  );

  const totalPlayers = roles.reduce((total, role) => total + (role.name.trim() !== '' ? role.count : 0), 0);

  if (gameState === 'setup') {
    return (
      <div className="flex flex-col h-screen bg-cover bg-center p-4" style={{ backgroundImage: 'url(/path/to/your/werewolf-background.jpg)' }}>
        <div className="flex justify-between items-center mb-8">
          <ArrowLeft className="w-8 h-8 text-red-400" />
          <div className="text-white">Grup</div>
          <HelpCircle className="w-8 h-8 text-red-400 cursor-pointer" onClick={() => setShowRolesModal(true)} />
        </div>

        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-white text-2xl mb-8">Setup Roles</h2>
          
          <div className="bg-gray-800/75 rounded-xl p-6 w-full max-w-sm">
            {roles.map((role, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="text"
                  value={role.name}
                  onChange={(e) => updateRole(index, 'name', e.target.value)}
                  placeholder="Role Name"
                  className="flex-1 rounded-l-full p-2 text-black"
                />
                <div className="flex items-center">
                  <button 
                    onClick={() => updateRole(index, 'count', Math.max(1, role.count - 1))}
                    className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white">
                    -
                  </button>
                  <input
                    type="number"
                    value={role.count}
                    onChange={(e) => updateRole(index, 'count', parseInt(e.target.value))}
                    min="1"
                    className="w-16 text-center p-2 bg-gray-700 text-white"
                  />
                  <button 
                    onClick={() => updateRole(index, 'count', role.count + 1)}
                    className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white">
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeRole(index)}
                  className="ml-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                  x
                </button>
              </div>
            ))}
            <button
              onClick={addRole}
              className="w-full bg-blue-500 text-white rounded-full py-2">
              Add Role
            </button>
          </div>

          <div className="mt-4 text-white">
            Total Players: {totalPlayers}
          </div>

          <button
            onClick={initializePlayers}
            className="mt-8 bg-red-500 text-white rounded-full py-3 px-12">
            Mulai
          </button>
        </div>

        {showRolesModal && <RolesModal />}
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