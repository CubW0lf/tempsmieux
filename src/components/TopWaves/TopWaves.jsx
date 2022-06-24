import "./TopWaves.css";

const TopWaves = ({ color }) => {
  return (
    <div className="TopWaves">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill={color}
          fillOpacity="1"
          d="M0,192L120,213.3C240,235,480,277,720,272C960,267,1200,213,1320,186.7L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default TopWaves;
