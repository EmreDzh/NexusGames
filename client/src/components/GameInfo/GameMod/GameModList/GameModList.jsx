import './GameModListStyle.css'
import { useState } from "react";

export default function GameModList({ gameModsData }) {
    const [fullscreenImage, setFullscreenImage] = useState(null);

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

    return (
        <div className="mod-details-wrapper">
            <div className="mod-header">
                <img
                    className="mod-main-image"
                    src={mainModImage}
                    alt="Mod Main"
                />
                <h1 className="mod-title">{modName}</h1>
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
            <div className="mod-description">
                <p>{modInfo}</p>
            </div>
            <div className="mod-download">
                <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                    Download Mod
                </a>
            </div>
            {fullscreenImage && (
                <div className="fullscreen-modal-mod" onClick={closeFullscreen}>
                    <div className="modal-content-mod">
                        <span className="close" onClick={closeFullscreen}>&times;</span>
                        <img src={fullscreenImage} alt="Fullscreen Image" />
                    </div>
                </div>
            )}
        </div>
    );
}