import './GameInfoStyle.css'
import { useContext, useEffect, useReducer, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as gameService from '../../services/gameService'
import AuthContext from '../../contexts/authContext';
import useForm from '../../hooks/useForm';
import Path from '../../paths/paths';

export default function GameInfo() {
    const { email, userId } = useContext(AuthContext);
    const [game, setGame] = useState({});
    const [showFullSummary, setShowFullSummary] = useState(false);
    const { gameId } = useParams();

    useEffect(() => {
        gameService.getOne(gameId)
            .then(setGame);
    }, [gameId]);

    const toggleSummary = () => {
        setShowFullSummary(!showFullSummary);
    };

    return (

        <div className="game-info-section">
            <div className="game-info-buttons">
                <button>Submit your playtime!</button>
                <button>Edit Game</button>
                <button>Delete Game</button>
            </div>
            <div className="game-info-container">

                <div className="game-info-left">
                    <img
                        src={game.imageUrl}
                        alt="Game Cover"
                        className="game-image"
                    />
                </div>
                <article>
                    <h1>{game.title}</h1>
                    <div className="game-info-rectangle">
                        <div className="info">
                            <div className="main-story-info">
                                <h3>Main Story</h3>
                                <p>{game.MainStory}</p>
                            </div>
                            
                            <div className="main-sides-info">
                                <h3>Main + Sides</h3>
                                <p>{game.MainSides}</p>
                            </div>
                            
                            <div className="speed-run">
                                <h3>Speed Run</h3>
                                <p>{game.SpeedRun}</p>
                            </div>

                        </div>
                    </div>
                </article>
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
        </div>

    );

}