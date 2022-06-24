import hero from "../../assets/images/mentor.jpg";
import senior from "../../assets/images/senior.jpg";
import student from "../../assets/images/student.jpg";
import BottomWaves from "../../components/BottomWaves/BottomWaves";
import TopWaves from "../../components/TopWaves/TopWaves";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <div className="hero">
        <img src={hero} alt="" />
        <h2>Transmettre le savoir</h2>
      </div>

      <h2>Une Main tendue est la rivière qui coule jusqu'à l'océan</h2>

      <div className="block">
        <TopWaves color="var(--third)" />
        <div className="pitch">
          <div className="card">
            <img src={senior} alt="" />
            <span>Senior</span>
          </div>
          <div className="card">
            <img src={student} alt="" />
            <span>Student</span>
          </div>
        </div>
        <BottomWaves color="var(--third)" />
      </div>
    </div>
  );
};

export default Home;
