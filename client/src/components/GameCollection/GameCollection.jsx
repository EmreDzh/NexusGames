import './GameCollectionStyle.css'
import { useEffect, useState } from 'react';

import * as gameService from '../../services/gameService'
import GameCollectionList from './GameCollectionList/GameCollectionList';

export default function GameCollection() {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 3;

    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        gameService.getAll()
            .then(result => setGames(result))
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="game-collection-section">
            
            <div className="games-appearing">
                {currentGames.map(game => (
                    <GameCollectionList key={game._id} {...game} />
                ))}
            </div>


            <div className="pagination">
                {games.length > gamesPerPage && (
                    Array.from({ length: Math.ceil(games.length / gamesPerPage) }, (_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}