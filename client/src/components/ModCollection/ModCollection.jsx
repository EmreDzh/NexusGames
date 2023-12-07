import './ModCollectionStyle.css'
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { pathToUrl } from '../../utils/pathUtils';
import Path from '../../paths/paths';
import AuthContext from '../../contexts/authContext';

import * as gameService from '../../services/gameService'
import * as gameModService from '../../services/modsService'
import ModCollectionList from './ModCollectionList/ModCollectionList';

export default function ModCollection() {
    const navigate = useNavigate();

    const { isAuthenticated } = useContext(AuthContext);

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

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };




    return (
        <div className='mod-collection-container'>
            <div className="mod-collection-titles">
                <h2>Select a game to view mods:</h2>

            </div>
            <div className="mod-collection-select">
                <select value={selectedGameId} onChange={handleGameChange}>
                    <option value="">Select a game</option>
                    {games.map(game => (
                        <option key={game._id} value={game._id}>{game.title}</option>
                    ))}
                </select>
            </div>

            <div className="mod-details-container">
                {!selectedGameId || currentMods.length === 0 && (
                    <div className="no-game-container">
                        <h1>theres no mods currently for this game</h1>
                        {isAuthenticated && (
                            <div className="button-to-mod-container">
                                <button onClick={() => navigate(pathToUrl(Path.gameMods, { selectedGameId }))}>Click here to create a mod!</button>
                            </div>
                        )}
                        {!isAuthenticated && (
                            <div className="button-to-mod-container">
                                <button onClick={() => navigate(Path.Login)}>Please login first to create a mod!</button>
                            </div>
                        )}

                    </div>
                )}
                <div className="mod-collection-list-container-two">
                    {currentMods.map(mod => (
                        <ModCollectionList key={mod._id} {...mod} />
                    ))}
                </div>

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