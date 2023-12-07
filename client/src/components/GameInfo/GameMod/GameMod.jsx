import './GameModStyle.css';
import * as gameModService from '../../../services/modsService';
import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import GameModList from './GameModList/GameModList';
import AuthContext from '../../../contexts/authContext';
import Path from '../../../paths/paths';

export default function GameMod() {
    const { gameId } = useParams();
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [mods, setMods] = useState([]);
    const [showModModal, setShowModModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    const modsPerPage = 1;
    const indexOfLastMod = currentPage * modsPerPage;
    const indexOfFirstMod = indexOfLastMod - modsPerPage;
    const currentMods = mods.slice(indexOfFirstMod, indexOfLastMod);

    useEffect(() => {
        gameModService.getAllMods()
            .then((gameMods) => {
                if (Array.isArray(gameMods) && gameMods.length > 0) {
                    const matchingMods = gameMods.filter(mod => mod.gameId === gameId);
                    if (matchingMods.length > 0) {
                        setMods(matchingMods);
                    }
                }
            })
            .catch(error => console.error('Error fetching game times:', error));
    }, [gameId]);


    const toggleModModal = () => {
        setShowModModal(!showModModal);
    };

    const handleModSubmit = async (event) => {
        event.preventDefault();
        const modData = Object.fromEntries(new FormData(event.currentTarget));
    
        try {
            await gameModService.create(gameId, modData);
            const updatedMods = await gameModService.getAllMods();
            const matchingMods = updatedMods.filter(mod => mod.gameId === gameId);
            setMods(matchingMods);
            toggleModModal(!showModModal);
        } catch (err) {
            console.log(err);
        }
    };


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>

            {showModModal && (
                <div className="modal" id="modModal">
                    <div className="modal-content">
                        <span onClick={toggleModModal} className="close">&times;</span>
                        <div className="game-info-rectangle">
                            <div className="game-time-form">
                                <h3>Create a Mod: https://www.nexusmods.com for more!</h3>
                                <form onSubmit={handleModSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="modName">Mod Name:</label>
                                        <input type="text" id="modName" name="modName" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mainModImage">Main Mod Image URL:</label>
                                        <input type="text" id="mainModImage" name="mainModImage" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="modImages">Mod Images (comma-separated URLs if you add multiple images!):</label>
                                        <input type="text" id="modImages" name="modImages" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="modInfo">Mod Info:</label>
                                        <input type='text' id="modInfo" name="modInfo" required></input>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="downloadLink">Download Link from nexusmods!:</label>
                                        <input type="text" id="downloadLink" name="downloadLink" required />
                                    </div>
                                    <button className="game-time-button" type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mod-details-container">
                <div className="mod-details-place">
                    {isAuthenticated && (

                        <div className='mod-create-button-container'>
                            {mods.length === 0 && (
                                <button onClick={toggleModModal}>Be the first to create a Mod for this game!</button>
                            )}
                            {mods.length !== 0 && (
                                <button onClick={toggleModModal}>Create a Mod!</button>
                            )}

                        </div>
                    )}
                    {!isAuthenticated && (
                        <div className='mod-create-button-container'>
                            <button onClick={() => navigate(Path.Login)}>Login to Create a Mod!</button>
                        </div>
                    )}
                    <div className="mod-list-container">

                        {currentMods.map(mod => (
                            <GameModList key={mod._id} {...mod} />
                        ))}
                    </div>

                    {mods.length > modsPerPage && (
                    <div className="pagination-mod">
                        {Array.from({ length: Math.ceil(mods.length / modsPerPage) }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}

                </div>

                

            
            </div>

        </>

    );
}
