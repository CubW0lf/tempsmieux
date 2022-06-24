import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { logout } from "../../api/auth";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(authContext);

  const handleLogout = () => {
    logout().then(() => setIsAuthenticated(false));
  };

  return (
    <nav className="Navbar">
      <ul>
        <Link to="/">
          <li>
            <span>Temps Mieux</span>
          </li>
        </Link>
        <li>Le Principe</li>
        <li>Nous connaitre</li>
      </ul>
      <ul>
        {isAuthenticated ? (
          <Link to="/profile">
            <li>Profil</li>
          </Link>
        ) : (
          ""
        )}
        {isAuthenticated ? (
          <li onClick={handleLogout}>Déconnexion</li>
        ) : (
          <Link to="/login">
            <li>Se Connecter</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
