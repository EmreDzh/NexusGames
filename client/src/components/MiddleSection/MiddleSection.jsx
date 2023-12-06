import { useEffect, useState } from 'react';
import GameMiddeSection from './GameMiddleSection/GameMiddleSection';
import './MiddleSectionStyle.css'
import * as gameService from "../../services/gameService"
import { useNavigate } from 'react-router-dom';
import Path from '../../paths/paths';



export default function MiddleSection() {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        gameService.getAll()
            .then(result => setGames(result))
            .catch(err => {
                console.log(err);
            });

    }, []);


    const handleGameCollectionClick = () => {
        navigate(Path.GameLib)
    }
    
    return (
        <>
            <div className="middle-section">
                <div className="middle-section-container">
                    <div className="middle-section-content">
                        <article>
                            <h2>NexusGames <span class="tm">&#8482;</span></h2>
                            <h3>Track what you're playing, discover new games.</h3>
                            <ul className='middle-section-ul'>
                                <li>Catalog your gaming collection.</li>
                                <li>Find out just how long that backlog will take to complete.</li>
                                <li>See if a potential game purchase is worth your hard earned money.</li>
                                <li>Compare your game times to other players.</li>
                            </ul>
                        </article>
                        
                        {games.length > 0 && <GameMiddeSection games={games}  />}
                    </div>

                    <div className="game-collection-button">
                        <button onClick={handleGameCollectionClick}>Check out the Game Collection!</button>
                    </div>
                </div>
            
            </div>
            <footer className="middle-section-footer">
                            <article>
                                <h2>How Game Cards Work</h2>
                                <p>Check the category that best matches your play style, this is our best estimate for how long it will take you to complete the game. You can also click on the games individually to really break down the stats.</p>
                            </article>
                            <article>
                                <h3>Main Story (Required)</h3>
                                <p>You complete the main objectives, just enough to see the credits roll.</p>
                            </article>
                            <article>
                                <h3>Main Story and Additional Quests/Medals/Unlockables</h3>
                                <p>You take your time, discover and complete additional tasks not required.</p>
                            </article>
                            <article>
                                <h3>Speed Run</h3>
                                <p>The fastest way possible to finish the game, that sometimes require to break the game or to bypass some artificial walls within the games world etc.</p>
                                <p className="sign-off">
                                    NexusGames: 2023 - 2023
                                </p>
                            </article>
            </footer> 
            
        </>
   
    );
}