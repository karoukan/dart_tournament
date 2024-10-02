import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from 'lucide-react'; 

const Home = ({ players }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const playersPerPage = 10;
    const [playerRankingChanges, setPlayerRankingChanges] = useState({});

    const getMatchsFromLocalStorage = () => {
        const matchsData = localStorage.getItem('matchs');
        return matchsData ? JSON.parse(matchsData) : [];
    };

    const calculatePlayerProgression = () => {
        const matchs = getMatchsFromLocalStorage();
        const rankingChanges = {};

        matchs.forEach((match) => {
            const { playerA, playerB, scoreA, scoreB } = match;

            rankingChanges[playerA] = rankingChanges[playerA] || 0;
            rankingChanges[playerB] = rankingChanges[playerB] || 0;

            if (parseInt(scoreA) > parseInt(scoreB)) {
                rankingChanges[playerA] += 1;
                rankingChanges[playerB] -= 1;
            } else if (parseInt(scoreA) < parseInt(scoreB)) {
                rankingChanges[playerA] -= 1;
                rankingChanges[playerB] += 1;
            }
        });

        setPlayerRankingChanges(rankingChanges);
    };

    useEffect(() => {
        calculatePlayerProgression();
    }, []);

    const totalPages = Math.ceil(players.length / playersPerPage);

    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Classement du tournoi de fléchettes</h2>
            
            <div className="max-w-6xl mx-auto">
                <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-4 text-left">Nom du joueur</th>
                            <th className="p-4 text-right">Score ELO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPlayers
                            .sort((a, b) => b.elo - a.elo) // Triage des joueurs par leur ELO
                            .map((player, index) => (
                                <tr key={index} className="border-b hover:bg-gray-100">
                                    <td className="p-4 flex items-center justify-between">
                                        <span className="mr-2">{player.name}</span>
                                        {playerRankingChanges[player.name] > 0 ? (
                                            <TrendingUp className="text-green-500" />
                                        ) : playerRankingChanges[player.name] < 0 ? (
                                            <TrendingDown className="text-red-500" />
                                        ) : null}
                                    </td>
                                    <td className="p-4 text-right">{Math.round(player.elo)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {players.length > playersPerPage && (
                    <div className="mt-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 mr-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white'}`}
                        >
                            Précédent
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600 text-white'}`}
                        >
                            Suivant
                        </button>
                    </div>
                )}

                {players.length > playersPerPage && (
                    <div className="mt-2 text-gray-600">
                        Page {currentPage} sur {totalPages}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
