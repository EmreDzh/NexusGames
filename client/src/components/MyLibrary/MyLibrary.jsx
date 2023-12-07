import { useState, useEffect, useContext  } from "react";
import AuthContext from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Path from "../../paths/paths";
import MyLibraryList from "./MyLibraryList/MyLibraryList";
import * as gameService from '../../services/gameService'


export default function MyLibrary(){
    const navigate = useNavigate();
    const { userId, isAuthenticated } = useContext(AuthContext);

    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 3;

    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        gameService.getAll()
            .then((game) => {
                if (Array.isArray(game) && game.length > 0) {
                    const matchingGames = game.filter(gam => gam._ownerId === userId);
                    if (matchingGames.length > 0) {
                        setGames(matchingGames);
                    }
                }
            })
            .catch(error => console.error('Error fetching game times:', error));
    }, [userId]);

    console.log(games);

    return(
        <div className="game-collection-section">
            
            <div className="games-appearing">
                {currentGames.map(game => (
                    <MyLibraryList key={game._id} {...game} />
                ))}
            </div>

            <div className="pagination">
                {games.length > gamesPerPage && (
                    Array.from({ length: Math.ceil(games.length / gamesPerPage) }, (_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}