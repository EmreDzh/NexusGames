import './GameCollectionStyle.css'
import { useNavigate } from 'react-router-dom';
import Path from '../../../paths/paths';

export default function GameCollectionList({_id, title, imageUrl, MainStory, MainSides, SpeedRun}) {
    const navigate = useNavigate();

    const navigateToGame = () => {
        navigate(`${Path.GameLib}/${_id}`);
      };

    return (
        <div className="game-colletion-list-section">
            <div className="game-colletion-container">
                <article>
                    <div className="rectangle-colletion">

                        <h1 onClick={navigateToGame} className="title-colletion">{title}</h1>

                        <div onClick={navigateToGame} className="left-colletion">
                            <img src={imageUrl} alt="Story" />
                        </div>
                        <div className="middle-colletion">
                            <p>Main Story: {MainStory}</p>
                            <p>Main + Sides: {MainSides}</p>
                            <p>Speed Run: {SpeedRun}</p>
                        </div>
                        
                    </div>
                </article>
            </div>
        </div>
    );
}