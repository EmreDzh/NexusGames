import './GameTimeStatisticsStyle.css';
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import Path from '../../paths/paths';

import * as gameService from '../../services/gameService';


export default function GameTimeStatistics() {
    const navigate = useNavigate();
    
    const [games, setGames] = useState([]);
    const [sortedGames, setSortedGames] = useState([]);
    const [sortByLongest, setSortByLongest] = useState(false);
    const [chart, setChart] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 3;
    

    useEffect(() => {
        gameService.getAll()
            .then(result => setGames(result))
            .catch(err => {
                console.log(err);
            });
    }, []);

   
    useEffect(() => {
        const getSortedGames = () => {
            const sorted = [...games].sort((a, b) => {
                if (sortByLongest) {
                    return parseInt(b.MainStory) - parseInt(a.MainStory);
                } else {
                    return parseInt(a.MainStory) - parseInt(b.MainStory);
                }
            });
            setSortedGames(sorted);
        };

        if (games.length > 0) {
            getSortedGames();
        }
    }, [games, sortByLongest]);

    const handleSort = (longest) => {
        setSortByLongest(longest);
    };

    useEffect(() => {
        if (sortedGames.length > 0) {
            const gameTitles = sortedGames.map(game => game.title);
            const gameMainStory = sortedGames.map(game => parseInt(game.MainStory));

            if (chart) {
                chart.destroy();
            }

            const ctx = document.getElementById('chart').getContext('2d');
            const newChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: gameTitles,
                    datasets: [{
                        label: 'Main Story',
                        data: gameMainStory,
                        backgroundColor: 'rgba(244, 67, 54, 0.5)',
                        borderColor: 'rgba(244, 67, 54, 1)',
                        borderWidth: 4,
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Main Story'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Games'
                            }
                        }
                    }
                }
            });

            setChart(newChart);
        }
    }, [sortedGames]);

    // pagination
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = sortedGames.slice(indexOfFirstGame, indexOfLastGame);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="game-collection-section-chart">
            <div className="game-time-chart-button-container">
                <button onClick={() => handleSort(true)}>Longest Games to Beat</button>
                <button onClick={() => handleSort(false)}>Fastest Games to Beat</button>
            </div>

            <canvas id="chart" width="400" height="200"></canvas>
            <div className="games-appearing">
                {currentGames.map(game => (
                    <div className="game-colletion-list-section" key={game._id}>
                        <div className="game-colletion-container">
                            <article>
                                <div className="rectangle-colletion-charts">
                                    <h1 onClick={() => navigate(`${Path.GameLib}/${game._id}`)} className="title-colletion">{game.title}</h1>
                                    <div onClick={() => navigate(`${Path.GameLib}/${game._id}`)} className="left-colletion">
                                        <img src={game.imageUrl} alt="Story" />
                                    </div>
                                    <div className="middle-colletion">
                                        <p>Main Story: {game.MainStory}</p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {games.length > gamesPerPage && (
                    Array.from({ length: Math.ceil(sortedGames.length / gamesPerPage) }, (_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))
                )}
            </div>
        </div>
    )
}
