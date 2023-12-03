import './GameTimeInfoStyle.css'

import * as gameTimeService from '../../../services/gameTimeService'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export default function GameTimeInfo({ title, MainStory, MainSides, SpeedRun }) {

    const [gameTime, setGameTime] = useState([]);

    const { gameId } = useParams();

    useEffect(() => {
        gameTimeService.getAllGameTimes()
            .then((gameTimes) => {
                if (Array.isArray(gameTimes) && gameTimes.length > 0) {
                    const matchingGameTimes = gameTimes.filter(game => game.gameId === gameId);
                    if (matchingGameTimes.length > 0) {
                        setGameTime(matchingGameTimes);
                    }
                }
            })
            .catch(error => console.error('Error fetching game times:', error));
    }, [gameId]);

    
    return (
        <>

            <div className="game-info-rectangle">
                <div className="info">
                    <div className="main-story-info">
                        <h3>Main Story</h3>
                        <p>{MainStory}</p>
                    </div>

                    <div className="main-sides-info">
                        <h3>Main + Sides</h3>
                        <p>{MainSides}</p>
                    </div>

                    <div className="speed-run">
                        <h3>Speed Run</h3>
                        <p>{SpeedRun}</p>
                    </div>

                </div>
            </div>
            {gameTime.length !== 0 && (
                <div className="game-times-section">
                    <h2 className='h2-game-time'>Game Time Submitted By The Users for: {title}</h2>
                    {gameTime.map((gameTimeItem, index) => (
                        <div key={index} className="game-info-rectangle">
                            <div className="info">
                                <div className="main-story-info">
                                    <h3>Main Story</h3>
                                    <p>{gameTimeItem.gameTimeData.mainStory}</p>
                                </div>

                                <div className="main-sides-info">
                                    <h3>Main + Sides</h3>
                                    <p>{gameTimeItem.gameTimeData.mainSides}</p>
                                </div>

                                <div className="speed-run">
                                    <h3>Speed Run</h3>
                                    <p>{gameTimeItem.gameTimeData.speedRun}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
      
        </>
    );
}