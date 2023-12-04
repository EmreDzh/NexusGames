import './CreateGameStyle.css'

export default function CreateGame(){
    return(
        <div className="create-game-container">
            <h1>Create a New Game</h1>
            <form className="game-form-create">
                <div className="form-group-create">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter game title" required />
                </div>
                <div className="form-group-create">
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" name="genre" placeholder="Enter game genre" required />
                </div>
                <div className="form-group-create">
                    <label htmlFor="release-date">Release Date:</label>
                    <input type="date" id="release-date" name="release-date" required />
                </div>
                <div className="form-group-create">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" placeholder="Enter game description" required></textarea>
                </div>
                <div className="form-group-create">
                    <button type="submit">Create Game</button>
                </div>
            </form>
        </div>
    );
}