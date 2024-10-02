import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddParticipants from "./pages/AddParticipants";
import AddMatch from "./pages/AddMatch";
import { ToastContainer } from "react-toastify";

const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadData = (key, defaultValue) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : defaultValue;
};

function App() {
  	const [players, setPlayers] = useState(() => loadData("players", []));
	const [matchs, setMatchs] = useState(() => loadData("matchs", []));

	useEffect(() => {
		saveData("players", players);
	}, [players]);

	useEffect(() => {
		saveData("matchs", matchs);
	}, [matchs]);

	const addPlayer = (name) => {
		const newPlayer = { name: name, elo: 1000 };
		setPlayers([...players, newPlayer]);
	};

	const addMatch = (playerA, playerB, scoreA, scoreB) => {
		const updatedPlayers = [...players];

		const playerIndexA = updatedPlayers.findIndex((p) => p.name === playerA);
		const playerIndexB = updatedPlayers.findIndex((p) => p.name === playerB);

		const playerObjA = updatedPlayers[playerIndexA];
		const playerObjB = updatedPlayers[playerIndexB];

		const { playerA_elo, playerB_elo } = calculateElo(playerObjA, playerObjB, scoreA, scoreB);
		
		updatedPlayers[playerIndexA].elo = playerA_elo;
		updatedPlayers[playerIndexB].elo = playerB_elo;

		setPlayers(updatedPlayers);
		setMatchs([...matchs, { playerA, playerB, scoreA, scoreB, date: new Date().toISOString() }]);
		console.log(`Match ajouté : ${playerA} vs ${playerB}, Score : ${scoreA} - ${scoreB}`);
	};

	const calculateElo = (playerA, playerB, scoreA, scoreB, K = 32) => {
		// Calcul de la proba : player A gagne contre le player B
		let expectedA = 1 / (1 + Math.pow(10, (playerB.elo - playerA.elo) / 400));
	
		// La probabilité attendue pour que le joueur B gagne est l'inverse de celle du joueur A
		let expectedB = 1 - expectedA;
	
		let resultA = scoreA > scoreB ? 1 : 0;
		let resultB = scoreB > scoreA ? 1 : 0;
	
		// Calcul du nouveau score Elo du joueur A
		const playerA_elo = playerA.elo + K * (resultA - expectedA);
	
		// Calcul du nouveau score Elo du joueur B
		const playerB_elo = playerB.elo + K * (resultB - expectedB);
	
		return { playerA_elo, playerB_elo };
	};	

	return (
		<Router>
			<div className="min-h-screen bg-gray-100">
				<Header />
				<main className="container mx-auto p-4">
					<Routes>
						<Route path="/" element={<Home players={players} matchs={matchs} />} />
						<Route path="/add-participants" element={<AddParticipants addPlayer={addPlayer} />} />
						<Route path="/add-match" element={<AddMatch players={players} addMatch={addMatch} />} />
					</Routes>
				</main>
				<ToastContainer />
			</div>
		</Router>
	);
}

export default App;
