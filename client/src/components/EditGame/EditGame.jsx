import './EditGameStyle.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as gameService from '../../services/gameService'
import Path from '../../paths/paths';

export default function EditGame() {
    const navigate = useNavigate();
    const { gameId } = useParams();

    const [game, setGame] = useState({
        title: '',
        genre: '',
        imageUrl: '',
        summary: '',
        MainStory: '',
        MainSides: '',
        SpeedRun: ''

    });

    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => {
                setGame(result);
            });
    }, [gameId])


    const editGameSubmitHandler = async (e) => {
        e.preventDefault();

        
        const values = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await gameService.edit(gameId, values);

            navigate(`${Path.GameLib}/${gameId}`);
        } catch (err) {
            console.log(err);
        }
    }

    const onChange = (e) => {
        setGame(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };


    return (
        <div className="edit-game-container">
            <h1>Edit: {game.title}</h1>
            <form className="game-form-edit" onSubmit={editGameSubmitHandler}>
                <div className="form-group-edit">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Edit game title"
                        value={game.title}
                        onChange={onChange}
                        
                    />
                </div>
                <div className="form-group-edit">
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        placeholder="Edit game genre"
                        value={game.genre}
                        onChange={onChange}
                        
                    />
                </div>
                <div className="form-group-edit">
                    <label htmlFor="imageUrl">image Link:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        placeholder='Edit image url, make sure to have .jpg at the end of the link'
                        name="imageUrl"
                        value={game.imageUrl}
                        onChange={onChange}
                        
                    />
                </div>
                <div className="form-group-edit">
                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        id="summary"
                        name="summary"
                        placeholder="Edit game description/summary"
                        value={game.summary}
                        onChange={onChange}
                        >

                    </textarea>
                </div>

                <div className="form-group-edit">
                    <label htmlFor="MainStory">Main Story:</label>
                    <input
                        type="text"
                        id="MainStory"
                        name="MainStory"
                        placeholder="Edit main story time"
                        value={game.MainStory}
                        onChange={onChange}
                        
                    />
                </div>
                <div className="form-group-edit">
                    <label htmlFor="MainSides">Main + Sides:</label>
                    <input type="text"
                        id="MainSides"
                        name="MainSides"
                        placeholder="Edit main + sides time"
                        value={game.MainSides}
                        onChange={onChange}
                        
                    />
                </div>
                <div className="form-group-edit">
                    <label htmlFor="SpeedRun">Speed Run:</label>
                    <input
                        type="text"
                        id="SpeedRun"
                        name="SpeedRun"
                        placeholder="Edit speed run time"
                        value={game.SpeedRun}
                        onChange={onChange}
                        
                    />
                </div>

                <div className="form-group-edit-submit">
                    <button type="submit">Edit Game</button>
                </div>
            </form>
        </div>
    );
}