import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import logo from "../../assets/images/globo.png.png";
import NavBar from "../Navbar/NavBar";
import "./Header.css";

const Header = () => {
  const [flagNavBar, setFlagNavbar] = useState(false);

  const handleNavBar = () => {
    setFlagNavbar(!flagNavBar);
  };

  return (
    <>
      <header className="navbar navbar-dark bg-dark fixed-top shadow-sm">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <button 
              className="navbar-toggler me-3" 
              type="button"
              onClick={handleNavBar}
            >
              <IoMdMenu size={20} />
            </button>
            <div className="d-flex align-items-center">
              <img src={logo} alt="Logo" className="logo-img me-2" />
              <h1 className="navbar-brand mb-0 h1">Geo Fun</h1>
            </div>
          </div>
        </div>
      </header>

      {flagNavBar && (
        <div className="mt-5 pt-3">
          <NavBar />
        </div>
      )}
    </>
  );
};

export default Header;