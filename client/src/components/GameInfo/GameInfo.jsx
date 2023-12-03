import './GameInfoStyle.css'
import './GameInfoCreateStyle.css'
import { useContext, useEffect,  useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

import * as gameService from '../../services/gameService'
import * as gameTimeService from '../../services/gameTimeService'
import AuthContext from '../../contexts/authContext';
import useForm from '../../hooks/useForm';
import Path from '../../paths/paths';
import GameTimeInfo from './GameTimeInfo/GameTimeInfo';

export default function GameInfo() {
    const navigate = useNavigate();

    const { userId, isAuthenticated } = useContext(AuthContext);
    
    const [game, setGame] = useState({});
    
    const [showFullSummary, setShowFullSummary] = useState(false);
    const { gameId } = useParams();

    const [showGameTimeModal, setShowGameTimeModal] = useState(false);

    useEffect(() => {
        gameService.getOne(gameId)
            .then(setGame);

    }, [gameId]);

   
    useEffect(() => {
        const closeModal = (event) => {
            const modal = document.getElementById('gameTimeModal');
            if (event.target === modal) {
                setShowGameTimeModal(false);
            }
        };

        window.addEventListener('click', closeModal);

        return () => {
            window.removeEventListener('click', closeModal);
        };
    }, []);

    const toggleSummary = () => {
        setShowFullSummary(!showFullSummary);
    };

    const navigateToLoginHandler = () => {
        navigate(Path.Login)
    }

    const toggleGameTimeModal = () => {
        setShowGameTimeModal(!showGameTimeModal);
    };

    const handleGameTimeSubmit = async (event) => {
        event.preventDefault();

        const gameData = Object.fromEntries(new FormData(event.currentTarget));

        
        try {
            await gameTimeService.create(game._id, gameData);
            setShowGameTimeModal(!showGameTimeModal);
            window.location.reload();
        } catch (err ){
            console.log(err);
        }
    };  


    return (

        <div className="game-info-section">
            <div className="game-info-buttons">
                {isAuthenticated && (
                    <>
                        <button onClick={toggleGameTimeModal}>Submit your playtime!</button>
                        {userId === game._ownerId && (
                            <>
                                <button>Edit Game</button>
                                <button>Delete Game</button>
                            </>
                        )}
                    </>
                )}
                {!isAuthenticated && (
                    <button onClick={navigateToLoginHandler}>Login to Submit your game time!</button>
                )}

            </div>
            <div className="game-info-container">

                <div className="game-info-left">
                    <img
                        src={game.imageUrl}
                        alt="Game Cover"
                        className="game-image"
                    />
                </div>
                
                <GameTimeInfo key={game._id} {...game} />
                
                <article>
                    <div className="game-info-box">
                        <p>
                            {game.summary &&
                                (showFullSummary
                                    ? game.summary
                                    : `${game.summary.slice(0, 150)}... `)}
                            {game.summary && (
                                <button className="read-more" onClick={toggleSummary}>
                                    {showFullSummary ? 'Read Less' : 'Read More'}
                                </button>
                            )}
                        </p>
                        <p className='genre-p'>Genre: {game.genre}</p>
                    </div>
                </article>


            </div>
            {showGameTimeModal && (
                <div className="modal" id="gameTimeModal">
                <div className="modal-content">
                    <span onClick={toggleGameTimeModal} className="close">&times;</span>
                    <div className="game-info-rectangle">
                        <div className="game-time-form">
                            <h3>Submit Your Game Time</h3>
                            <form onSubmit={handleGameTimeSubmit}>
                                <div className="form-group">
                                    <label htmlFor="mainStory">Main Story:</label>
                                    <input type="text" id="mainStory" name="mainStory" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mainSides">Main + Sides:</label>
                                    <input type="text" id="mainSides" name="mainSides" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="speedRun">Speed Run:</label>
                                    <input type="text" id="speedRun" name="speedRun" />
                                </div>
                                <button className="game-time-button" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>

    );

}