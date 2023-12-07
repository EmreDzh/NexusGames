import './MyLibraryStyle.css'

import { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Path from "../../paths/paths";
import MyLibraryList from "./MyLibraryList/MyLibraryList";
import MyLibraryModList from "./MyLibraryModList/MyLibraryModList";
import * as gameService from '../../services/gameService';
import * as modService from '../../services/modsService';

export default function MyLibrary() {
    const navigate = useNavigate();
    const { userId, username } = useContext(AuthContext);

    const [games, setGames] = useState([]);
    const [mods, setMods] = useState([]);
    const [currentPageGames, setCurrentPageGames] = useState(1);
    const [currentPageMods, setCurrentPageMods] = useState(1);
    const [viewGames, setViewGames] = useState(true);
    const gamesPerPage = 3;
    const modsPerPage = 1;

    useEffect(() => {
        gameService.getAll()
            .then((game) => {
                const matchingGames = game.filter(gam => gam._ownerId === userId);
                setGames(matchingGames);
            })
            .catch(error => console.error('Error fetching games:', error));

        modService.getAllMods()
            .then((mod) => {
                const matchingMods = mod.filter(mo => mo._ownerId === userId);
                setMods(matchingMods);
            })
            .catch(error => console.error('Error fetching mods:', error));
    }, [userId]);

    const currentGames = games.slice((currentPageGames - 1) * gamesPerPage, currentPageGames * gamesPerPage);
    const currentMods = mods.slice((currentPageMods - 1) * modsPerPage, currentPageMods * modsPerPage);

    const handleGamesPageChange = (pageNumber) => {
        setCurrentPageGames(pageNumber);
    };

    const handleModsPageChange = (pageNumber) => {
        setCurrentPageMods(pageNumber);
    };

    return (
        <div className="my-library-section-list">
            <div className="my-library-section-list-container">
                <div className="my-library-buttons">
                    <button onClick={() => setViewGames(true)}>View All My Games</button>
                    <button onClick={() => setViewGames(false)}>View All My Mods</button>
                </div>

                <div className="mods-games-container">
                    {viewGames ? (
                        <div>
                            {games.length !== 0 ? (
                                <>
                                    <h2 className='collection-h2'>{username}'s collection of games:</h2>
                                    <div className="games-appearing">
                                        {currentGames.map(game => (
                                            <MyLibraryList key={game._id} {...game} />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className='collection-h2'>You don't have any created games yet!</h2>
                                    <div className="collection-button">
                                        <button onClick={() => navigate(Path.CreateGame)}>Click here to create a game!</button>
                                    </div>
                                </>
                            )}
                            {games.length > gamesPerPage && (
                                <div className="pagination">
                                    {Array.from({ length: Math.ceil(games.length / gamesPerPage) }, (_, index) => (
                                        <button key={index + 1} onClick={() => handleGamesPageChange(index + 1)}>
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {mods.length !== 0 ? (
                                <>
                                    <h2 className='collection-h2'>{username}'s collection of mods:</h2>
                                    {currentMods.map(mod => (
                                        <MyLibraryModList key={mod._id} {...mod} />
                                    ))}
                                </>
                            ) : (
                                <>
                                    <h2 className='collection-h2'>You don't have any created mods yet! View the game library and chose a game to create a mod!</h2>
                                    <div className="collection-button">
                                        <button onClick={() => navigate(Path.GameLib)}>Click here to view the game library</button>
                                    </div>
                                </>
                            )}
                            {mods.length > modsPerPage && (
                                <div className="pagination">
                                    {Array.from({ length: Math.ceil(mods.length / modsPerPage) }, (_, index) => (
                                        <button key={index + 1} onClick={() => handleModsPageChange(index + 1)}>
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}


                </div>




            </div>

        </div>
    );
}
