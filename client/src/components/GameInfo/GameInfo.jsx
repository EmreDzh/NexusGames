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


        <div className="game-info-container">
            <article>
                <div className="game-info-left">
                    <img
                        src={game.imageUrl}
                        alt="Game Cover"
                        className="game-image"
                    />
                </div>
                <div className="game-title">
                    <h1>{game.title}</h1>
                </div>
                <div className="game-info-rectangle">
                    <div className="info">
                        <p>Main Story</p>
                        <p>{game.MainStory}</p>
                        <p>Main + Sides</p>
                        <p>{game.MainSides}</p>
                        <p>Speed Run</p>
                        <p>{game.SpeedRun}</p>
                        <p>All Styles</p>
                        <p>63 Hours</p>
                    </div>
                </div>
                <div className="game-info-box">
                    <p>
                        {game.summary &&
                            (showFullSummary
                                ? game.summary
                                : `${game.summary.slice(0, 200)}... `)}
                        {game.summary && (
                            <button className="read-more" onClick={toggleSummary}>
                                {showFullSummary ? 'Read Less' : 'Read More'}
                            </button>
                        )}
                    </p>
                </div>
            </article>

        </div>

    );

}