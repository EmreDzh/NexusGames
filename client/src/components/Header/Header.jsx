import './HeaderStyle.css'
import Path from '../../paths/paths';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import { useContext, useState, useEffect } from 'react';
import * as gameService from '../../services/gameService'

export default function Header(){
    const {
        isAuthenticated,
        username
    } = useContext(AuthContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        gameService.getAll()
            .then(result => setGames(result))
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleSearch = () => {
        const game = games.find(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()));
        if (game) {
            navigate(`${Path.GameLib}/${game._id}`);
            setSearchQuery('');
        } else {
            console.log('Game not found');
        }
    };

    return(
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
                    placeholder="Search for a by its title!"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

                <ul className='header-ul'>
                    {isAuthenticated && (
                        <>
                            <li><a href="">Create Game</a></li>
                            <li><a href="">My Library</a></li>
                            <li><Link className='header-links' to={Path.Logout}>Logout</Link></li>
                            <div className='user-name'>Welcome, Choom!</div>
                        </>
                        
                    )}

                    {!isAuthenticated && (
                        <>
                            <li><a href="">Game Collection</a></li>
                            <li><Link className='header-links' to={Path.Login}>Login</Link></li>
                            <li><Link className='header-links' to={Path.Register}>Register</Link></li>
                        </>
                    )}
                    
                    
                </ul>
            </div>
        </div>
    );
}