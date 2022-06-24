import "./BottomWaves.css";

const BottomWaves = ({ color }) => {
  return (
    <div className="BottomWaves">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill={color}
          fillOpacity="1"
          d="M0,32L60,53.3C120,75,240,117,360,149.3C480,181,600,203,720,208C840,213,960,203,1080,202.7C1200,203,1320,213,1380,218.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
};

export default BottomWaves;
