import './ModCollectionListStyle.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pathToUrl } from "../../../utils/pathUtils";
import Path from "../../../paths/paths";

export default function ModCollectionList({ gameId, gameModsData }) {
    const navigate = useNavigate();
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const {
        modName,
        mainModImage,
        modImages,
        modInfo,
        downloadLink
    } = gameModsData;

    const modImagesArray = modImages.split(',').map(image => image.trim());

    const openFullscreen = (image) => {
        setFullscreenImage(image);
    };

    const closeFullscreen = () => {
        setFullscreenImage(null);
    };

    const navigateImage = (direction) => {
        if (direction === 'prev') {
            setCurrentIndex(prevIndex => (prevIndex - 1 + modImagesArray.length) % modImagesArray.length);
            setFullscreenImage(modImagesArray[(currentIndex - 1 + modImagesArray.length) % modImagesArray.length]);
        } else if (direction === 'next') {
            setCurrentIndex(prevIndex => (prevIndex + 1) % modImagesArray.length);
            setFullscreenImage(modImagesArray[(currentIndex + 1) % modImagesArray.length]);
        }
    };

    const handleKeyDown = (e) => {
        if (fullscreenImage) {
            if (e.key === 'ArrowLeft') {
                navigateImage('prev');
            } else if (e.key === 'ArrowRight') {
                navigateImage('next');
            }
        }
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    return (
        <div className="mod-details-wrapper">
            <div onClick={() => navigate(pathToUrl(Path.gameMods, { gameId }))} className="mod-header-list">
                <img
                    className="mod-main-image"
                    src={mainModImage}
                    alt="Mod Main"
                />
                <div onClick={() => navigate(pathToUrl(Path.gameMods, { gameId }))} className='title-list-mod'>
                    <h1 className="mod-title">{modName}</h1>
                </div>

            </div>
            <div className="mod-images">
                {modImagesArray.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Mod Image ${index + 1}`}
                        onClick={() => openFullscreen(image)}
                    />
                ))}
            </div>
            {fullscreenImage && (
                <div className="fullscreen-modal-mod" onClick={closeFullscreen}>
                    <span className="arrow left" onClick={(e) => { stopPropagation(e); navigateImage('prev'); }}>&#8249;</span>
                    <div className="modal-content-mod">
                        <span className="close" onClick={closeFullscreen}>&times;</span>
                        <img src={fullscreenImage} alt="Fullscreen Image" />
                    </div>
                    <span className="arrow right" onClick={(e) => { stopPropagation(e); navigateImage('next'); }}>&#8250;</span>
                </div>
            )}
        </div>
    );
}