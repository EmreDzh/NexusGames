import { useEffect, useState } from 'react';

import * as gameService from '../../services/gameService'
import * as gameModService from '../../services/modsService'
import ModCollectionList from './ModCollectionList/ModCollectionList';

export default function ModCollection() {
    const [games, setGames] = useState([]);
    const [mods, setMods] = useState([]);
    const [selectedGameId, setSelectedGameId] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const modsPerPage = 2;

    useEffect(() => {
        gameService.getAll()
            .then(result => setGames(result))
            .catch(err => {
                console.log(err);
            });
    }, []);


    useEffect(() => {
        if (selectedGameId) {
            gameModService.getAllMods()
                .then((gameMods) => {
                    const matchingMods = gameMods.filter(mod => mod.gameId === selectedGameId);
                    setMods(matchingMods);
                })
                .catch(error => console.error('Error fetching game mods:', error));
        }
    }, [selectedGameId]);


    const handleGameChange = (event) => {
        setSelectedGameId(event.target.value);
        setCurrentPage(1);
    };

    const indexOfLastMod = currentPage * modsPerPage;
    const indexOfFirstMod = indexOfLastMod - modsPerPage;
    const currentMods = mods.slice(indexOfFirstMod, indexOfLastMod);

    // Logic to change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
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
            <div className="mod-details-container">
                {currentMods.map(mod => (
                    <ModCollectionList key={mod._id} {...mod} />
                ))}
            </div>

            {mods.length > modsPerPage && (
                <div className="pagination">
                    {Array.from({ length: Math.ceil(mods.length / modsPerPage) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}