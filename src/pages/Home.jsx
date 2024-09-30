import React from "react";

const Home = ({ joueurs }) => {
    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Classement du tournoi de Fléchettes</h2>
            
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Classement des Joueurs</h2>

                <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                        <th className="p-4 text-left">Nom</th>
                        <th className="p-4 text-right">Score Elo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {joueurs
                        .sort((a, b) => b.elo - a.elo) // Triage des players par leur ELO
                        .map((joueur, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="p-4">{joueur.nom}</td>
                            <td className="p-4 text-right">{Math.round(joueur.elo)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
