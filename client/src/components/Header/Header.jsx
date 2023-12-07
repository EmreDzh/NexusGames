import './HeaderStyle.css'
import Path from '../../paths/paths';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import { useContext, useState, useEffect } from 'react';
import * as gameService from '../../services/gameService'
import { pathToUrl } from '../../utils/pathUtils';

export default function Header() {
    const { userId, isAuthenticated } = useContext(AuthContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const [matchingGames, setMatchingGames] = useState([]);
    const [showModal, setShowModal] = useState(false);
    

    useEffect(() => {
        gameService.getAll()
            .then(result => setGames(result))
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim() === '') {

            const searchBar = document.querySelector('.search-bar');
            searchBar.classList.add('not-found-animation');

            setTimeout(() => {
                searchBar.classList.remove('not-found-animation');
            }, 2000);

            return;
        }

        const filteredGames = games.filter(game =>
            game.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredGames.length === 0) {
            const searchBar = document.querySelector('.search-bar');
            searchBar.classList.add('not-found-animation');

            setTimeout(() => {
                searchBar.classList.remove('not-found-animation');
            }, 2000);

            return;
        }

        if (filteredGames.length === 1) {
            navigate(`${Path.GameLib}/${filteredGames[0]._id}`);
            setSearchQuery('');
        } else {
            setMatchingGames(filteredGames);
            setShowModal(true);
        }

    };

    const selectGame = (gameId) => {
        navigate(`${Path.GameLib}/${gameId}`);
        setSearchQuery('');
        setShowModal(false);
    };

    console.log(userId);


    return (
        <div className="header-section">
            <div className="header-container">
                <div className="header-media">
                    <Link to={Path.Home}>
                        <img src="/images/gaming-logo.png" alt="Home" />
                    </Link>
                </div>

                <div className="search-bar">
                    <input
                        className='search-text'
                        type="text"
                        placeholder="Search a game by its title!"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                {showModal && (
                    <div className="game-modal">
                        <div className="game-modal-content">
                            <h2>Choose a Game</h2>
                            <ul className="game-list-modal">
                                {matchingGames.map((game) => (
                                    <li key={game._id} className="game-item-modal" onClick={() => selectGame(game._id)}>
                                        <span className="game-title-modal">{game.title}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className='close-button-modal-container'>
                                <button className="close-button-modal" onClick={() => setShowModal(false)}>Close</button>
                            </div>

                        </div>
                    </div>
                )}

                <ul className='header-ul-list'>
                    <li><Link to={Path.GameLib}>Game Library</Link></li>
                    <li><Link to={Path.gameModCollection}>Mods</Link></li>
                </ul>

                <ul className='header-ul'>

                    {isAuthenticated && (
                        <>
                            <li><Link to={`/library/${userId}`}>My Libray</Link></li>
                            <li><Link to={Path.CreateGame}>Create Game</Link></li>
                            <li><Link className='header-links' to={Path.Logout}>Logout</Link></li>
                            <div className='user-name'>Welcome, Choom!</div>
                        </>

                    )}

                    {!isAuthenticated && (
                        <>
                            <li><Link className='header-links' to={Path.Login}>Login</Link></li>
                            <li><Link className='header-links' to={Path.Register}>Register</Link></li>
                        </>
                    )}


                </ul>


            </div>
        </div>
    );
}