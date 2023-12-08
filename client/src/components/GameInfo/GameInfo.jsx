import './GameInfoStyle.css'
import './GameInfoModalStyle.css'
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import * as gameService from '../../services/gameService'
import * as gameTimeService from '../../services/gameTimeService'
import AuthContext from '../../contexts/authContext';
import { pathToUrl } from '../../utils/pathUtils'
import Path from '../../paths/paths';
import GameTimeInfo from './GameTimeInfo/GameTimeInfo';

export default function GameInfo() {
    const navigate = useNavigate();
    const { userId, isAuthenticated } = useContext(AuthContext);
    const { gameId } = useParams();

    const [game, setGame] = useState({});
    const [showFullSummary, setShowFullSummary] = useState(false);
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
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${game.title}?`);

        if (hasConfirmed) {
            await gameService.remove(gameId);

            navigate(`/library/${userId}`)
        }
    }


    return (

        <div className="game-info-section">
            <div className="game-info-holder">

                <div className="game-info-buttons">
                    {isAuthenticated && (
                        <>
                            <button onClick={toggleGameTimeModal}>Submit your playtime!</button>
                            {userId === game._ownerId && (
                                <>
                                    <Link to={pathToUrl(Path.EditGame, { gameId })}><button>Edit Game</button></Link>

                                    <button onClick={handleDelete}>Delete Game</button>
                                </>
                            )}
                        </>
                    )}
                    {!isAuthenticated && (
                        <button onClick={navigateToLoginHandler}>Login to Submit your game time!</button>
                    )}

                </div>
                <div className="game-info-container">
                    <div className="game-info-holder-list">
                        <div className='game-info-h2'>
                            <h2>{game.title}</h2>
                        </div>
                        <div className="game-info-left">
                            <img
                                src={game.imageUrl}
                                alt="Game Cover"
                                className="game-image"
                            />
                        </div>

                        <GameTimeInfo key={game._id} {...game} />

                        <article className='game-info-box-article'>
                            <div className="game-info-box">
                                <p>
                                    {game.summary &&
                                        ((showFullSummary || game.summary.length <= 150) 
                                            ? game.summary
                                            : `${game.summary.slice(0, 150)}... `)}
                                    {game.summary && game.summary.length > 150 && (
                                        <button className="read-more" onClick={toggleSummary}>
                                            {showFullSummary ? 'Read Less' : 'Read More'}
                                        </button>
                                    )}
                                </p>
                                <p className='genre-p'>Genre: {game.genre}</p>
                            </div>
                        </article>

                    </div>

                    <div className='mods-button-container'>
                        <Link to={pathToUrl(Path.gameMods, { gameId })}><button>Check out the Mods for {game.title}!</button></Link>
                    </div>

                </div>
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
                                        <input type="text" id="mainStory" name="mainStory" required />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mainSides">Main + Sides:</label>
                                        <input type="text" id="mainSides" name="mainSides" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="speedRun">Speed Run:</label>
                                        <input type="text" id="speedRun" name="speedRun" required />
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