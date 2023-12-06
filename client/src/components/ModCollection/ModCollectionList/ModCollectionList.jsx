import './ModCollectionListStyle.css'
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { pathToUrl } from "../../../utils/pathUtils";
import Path from "../../../paths/paths";

export default function ModCollectionList({ gameId, gameModsData }) {
    const navigate = useNavigate();
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
                    <div className="modal-content-mod">
                        <span className="close" onClick={closeFullscreen}>&times;</span>
                        <img src={fullscreenImage} alt="Fullscreen Image" />
                    </div>
                </div>
            )}
        </div>
    );
}