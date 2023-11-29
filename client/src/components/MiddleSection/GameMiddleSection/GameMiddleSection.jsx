import './GameMiddleSectionStyle.css'

export default function GameMiddeSection({title, imageUrl, MainStory, MainSides, SpeedRun}){
    return(
    <div className="container">
        <div className="rectangle">
            
            <h1 className="title">{title}</h1>

          <div className="left">
            <img src={imageUrl} alt="Story" />
          </div>
          <div className="middle">
            <p>Main Story</p>
            <p>Main + Extra</p>
            <p>Speed Run</p>
          </div>
          <div className="right">
            <div>{MainStory}</div>
            <div>{MainSides}</div>
            <div>{SpeedRun}</div>
            </div>
        </div>
      </div>
    );
};