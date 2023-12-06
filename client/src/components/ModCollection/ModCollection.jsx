import { useEffect, useState } from 'react';

import * as gameService from '../../services/gameService'
import * as gameModService from '../../services/modsService'

export default function ModCollection() {
    const [games, setGames] = useState([]);
    const [mods, setMods] = useState([]);
    const [selectedGameId, setSelectedGameId] = useState('');

    useEffect(() => {
        // Fetch all games
        gameService.getAll()
            .then(result => setGames(result))
            .catch(err => {
                console.log(err);
            });
    }, []);

    console.log(selectedGameId);

    useEffect(() => {
        // Fetch mods for the selected game
        if (selectedGameId) {
            gameModService.getAllMods()
                .then((gameMods) => {
                    const matchingMods = gameMods.filter(mod => mod.gameId === selectedGameId);
                    setMods(matchingMods);
                })
                .catch(error => console.error('Error fetching game mods:', error));
        }
    }, [selectedGameId]);

    console.log(mods);

    const handleGameChange = (event) => {
        setSelectedGameId(event.target.value);
    };

    return (
        <div>
            <h2>Select a game to view mods:</h2>
            <select value={selectedGameId} onChange={handleGameChange}>
                <option value="">Select a game</option>
                {games.map(game => (
                    <option key={game._id} value={game._id}>{game.title}</option>
                ))}
            </select>

            <h3>Mods for selected game:</h3>
            <ul>
                {mods.map(mod => (
                    <li key={mod._id}>{mod.gameModsData.modName}</li>
                    // Display other mod details as needed
                ))}
            </ul>
        </div>
    );
}