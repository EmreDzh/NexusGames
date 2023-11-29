import './GameMiddleSectionStyle.css'
import {  useState } from 'react';

export default function GameMiddeSection({games}){
    const [currentGameIndex, setCurrentGameIndex] = useState(0);
    const currentGame = games[currentGameIndex] || {};

    const displayNextGame = () => {
      setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
    };
  
    const displayPreviousGame = () => {
      setCurrentGameIndex((prevIndex) =>
        prevIndex === 0 ? games.length - 1 : prevIndex - 1
      );
    };

    return(
    <div className="container">
        
        <div className="rectangle">
            
            <h1 className="title">{currentGame.title}</h1>

          <div className="left">
            <img src={currentGame.imageUrl} alt="Story" />
          </div>
          <div className="middle">
            <p>Main Story</p>
            <p>Main + Extra</p>
            <p>Speed Run</p>
          </div>
          <div className="right">
            <div>{currentGame.MainStory}</div>
            <div>{currentGame.MainSides}</div>
            <div>{currentGame.SpeedRun}</div>
            </div>
            <div className="buttons">
              <button className='middle-section-button' onClick={displayPreviousGame}>Previous</button>
              <button className='middle-section-button' onClick={displayNextGame}>Next</button>
            </div>
        </div>
        
      </div>
    );
};