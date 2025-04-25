import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaPlay, FaSignOutAlt } from "react-icons/fa";
import { goToLoginPage } from "../../router/Coordinator";

const NavBar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId')
  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    goToLoginPage(navigate);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-bottom">
      <div className="container-fluid justify-content-around">
        <button
          onClick={() => handleNavigate(`/profile/${userId}`)}
          className="btn btn-link text-white d-flex flex-column align-items-center"
        >
          <FaUserCircle size={24} />
          <span className="small mt-1">Perfil</span>
        </button>

        <button
          onClick={() => handleNavigate("/home")}
          className="btn btn-link text-white d-flex flex-column align-items-center"
        >
          <FaPlay size={24} />
          <span className="small mt-1">Jogar</span>
        </button>

        <button
          onClick={() => handleLogOut()}
          className="btn btn-link text-white d-flex flex-column align-items-center"
        >
          <FaSignOutAlt size={24} />
          <span className="small mt-1">Sair</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;