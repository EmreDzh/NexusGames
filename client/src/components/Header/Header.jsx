import './HeaderStyle.css'
import Path from '../../paths/paths';
import { Link } from 'react-router-dom';


export default function Header(){
    return(
        <div className="header-section">
            <div className="header-container">
                <div className="header-media">
                    <Link to={Path.Home}>
                        <img src="/images/gaming-logo.png" alt="Home" />
                    </Link>
                </div>

                <div className="search-bar">
                    <input type="text" placeholder="Search for a game" />
                    <button>Search</button>
                </div>

                <ul className='header-ul'>
                    <li><a href="">Login</a></li>
                    <li><a href="">Register</a></li>
                    <li><a href="">Create Game</a></li>
                    <li><a href="">My Library</a></li>
                </ul>
            </div>
        </div>
    );
}