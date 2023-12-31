import './GameMiddleSectionStyle.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Path from '../../../paths/paths';

export default function GameMiddeSection({ games }) {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const currentGame = games[currentGameIndex] || {};
  const navigate = useNavigate();

  const displayNextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const displayPreviousGame = () => {
    setCurrentGameIndex((prevIndex) =>
      prevIndex === 0 ? games.length - 1 : prevIndex - 1
    );
  };

  const navigateToLoginPage = () => {
    navigate(`${Path.GameLib}/${currentGame._id}`);
  };

  return (
    <div className="container">

      <div className="rectangle">

        <div className="left" onClick={navigateToLoginPage}>
          <img src={currentGame.imageUrl} alt="Story" />
        </div>
        <div className="middle">
          <p>Main Story:</p>
          <p>Main + Sides:</p>
          <p>Speed Run:</p>
        </div>
        <div className="right">
          <div>{currentGame.MainStory}</div>
          <div>{currentGame.MainSides}</div>
          <div>{currentGame.SpeedRun}</div>
        </div>
        <div className="buttons-container">
          <button className="arrow-button" onClick={displayPreviousGame}>
            &lt;
          </button>
          <button className="arrow-button" onClick={displayNextGame}>
            &gt;
          </button>
        </div>

      </div>

    </div>
  );
};