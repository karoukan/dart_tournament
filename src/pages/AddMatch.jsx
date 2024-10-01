import { useState } from "react";

const AddMatch = ({ players, addMatch }) => {
    const [playerA, setPlayerA] = useState("");
    const [playerB, setPlayerB] = useState("");
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (playerA && playerB && playerA !== playerB) {
            addMatch(playerA, playerB, scoreA, scoreB);
            setPlayerA("");
            setPlayerB("");
            setScoreA(0);
            setScoreB(0);
        }
    };
  
    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Enregistrer un match</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-2">Joueur A</label>
                    <select
                        value={playerA}
                        onChange={(e) => setPlayerA(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                    <option value="">Sélectionnez le joueur A</option>
                        {players.map((player, index) => (
                            <option key={index} value={player.name}>
                                {player.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Joueur B</label>
                    <select
                        value={playerB}
                        onChange={(e) => setPlayerB(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                    <option value="">Sélectionnez le joueur B</option>
                        {players.map((player, index) => (
                            <option key={index} value={player.name}>
                                {player.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex space-x-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Score A</label>
                        <input
                            type="number"
                            value={scoreA}
                            onChange={(e) => setScoreA(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Score B</label>
                        <input
                            type="number"
                            value={scoreB}
                            onChange={(e) => setScoreB(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Enregistrer le résultat
                </button>
            </form>
        </div>
    );
  };
  
  export default AddMatch;
  