import './CreateGameStyle.css'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as gameService from '../../services/gameService'
import Path from '../../paths/paths';
import AuthContext from '../../contexts/authContext';

export default function CreateGame(){
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);

    const [showGameTimeFields, setShowGameTimeFields] = useState(false);

    const createGameHandler = async (e) => {
        e.preventDefault();

        const gameData = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await gameService.create(gameData);

            navigate(`/library/${userId}`);
        } catch(err){
            console.log(err);
        }
    }

    const toggleGameTimeFields = () => {
        setShowGameTimeFields(!showGameTimeFields);
    };

    return(
        <div className="create-game-container">
            <h1>Create a New Game</h1>
            <form className="game-form-create" onSubmit={createGameHandler}>
                <div className="form-group-create">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter game title" required />
                </div>
                <div className="form-group-create">
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" name="genre" placeholder="Enter game genre" required />
                </div>
                <div className="form-group-create">
                    <label htmlFor="imageUrl">image Link:</label>
                    <input type="text" id="imageUrl" placeholder='make sure the image link ends with a .jpg!' name="imageUrl" required />
                </div>
                <div className="form-group-create">
                    <label htmlFor="summary">Summary:</label>
                    <textarea id="summary" name="summary" placeholder="Enter game description/summary" required></textarea>
                </div>
                <div className="form-group-create">
                    <button type="button" onClick={toggleGameTimeFields}>
                        {showGameTimeFields ? 'Hide Game Time' : 'Add Game Time'}
                    </button>
                </div>
                {showGameTimeFields && (
                    <>
                        <div className="form-group-create">
                            <label htmlFor="MainStory">Main Story:</label>
                            <input type="text" id="MainStory" name="MainStory" placeholder="Enter main story time" required />
                        </div>
                        <div className="form-group-create">
                            <label htmlFor="MainSides">Main + Sides:</label>
                            <input type="text" id="MainSides" name="MainSides" placeholder="Enter main + sides time" required />
                        </div>
                        <div className="form-group-create">
                            <label htmlFor="SpeedRun">Speed Run:</label>
                            <input type="text" id="SpeedRun" name="SpeedRun" placeholder="Enter speed run time" required />
                        </div>
                    </>
                )}
                <div className="form-group-create-submit">
                    <button type="submit">Create Game</button>
                </div>
            </form>
        </div>
    );
}