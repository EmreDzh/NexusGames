import './HeaderStyle.css'
import Path from '../../paths/paths';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import { useContext } from 'react';

export default function Header(){
    const {
        isAuthenticated,
        username
    } = useContext(AuthContext);


    return(
        <div className="header-section">
            <div className="header-container">
                <div className="header-media">
                    <Link to={Path.Home}>
                        <img src="/images/gaming-logo.png" alt="Home" />
                    </Link>
                </div>

                <div className="search-bar">
                    <input className='search-text' type="text" placeholder="Search for a game" />
                    <button>Search</button>
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