import { useEffect, useState } from 'react';
import GameMiddeSection from './GameMiddleSection/GameMiddleSection';
import './MiddleSectionStyle.css'
import * as gameService from "../../services/gameService"



export default function MiddleSection(){
    const [games, setGames] = useState([]);
    
    useEffect(() => {
        gameService.getAll()
            .then(result => setGames(result))
            .catch(err => {
                console.log(err);
            });
            
    }, []);

    

    return(
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
            </div>
        </div>
    );
}