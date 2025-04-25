import React, { useEffect, useState } from "react";
import axios from "axios";
import { HeaderReq, URL_GEO_API } from "../../constants/Constants";
import { goToHome } from "../../router/Coordinator";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaStar, FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get(`${URL_GEO_API}user/${userId}`, {
        headers: HeaderReq(token),
      });
      setUser(response.data);
    } catch (error) {
      console.log("Erro ao carregar usuário:", error.message);
    }
  };

  const handleReturn = () => {
    goToHome(navigate);
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  if (!user) return <p className="p-4">Carregando...</p>;

  return (
    <div className="container mt-5" style={{ width: "60vw" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">User Profile</h2>

              <p className="card-text">
                <FaUser className="me-2 text-primary" />
                <strong>Name:</strong> {user.name}
              </p>

              <p className="card-text">
                <FaEnvelope className="me-2 text-success" />
                <strong>Email:</strong> {user.email}
              </p>

              <p className="card-text">
                <FaStar className="me-2 text-warning" />
                <strong>Score:</strong> {user.score}
              </p>

              <button
                onClick={handleReturn}
                className="btn btn-outline-secondary mt-3 d-flex align-items-center"
              >
                <FaArrowLeft className="me-2" />
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
