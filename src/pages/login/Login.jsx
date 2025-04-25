import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { goToHome } from "../../router/Coordinator";
import "./Login.css";
import logo from "../../assets/images/globo.png.png";
import axios from "axios";
import {URL_GEO_API} from "../../constants/Constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post(`${URL_GEO_API}login`, {
        email,
        password,
      });

      const { token, userId } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        goToHome(navigate);
      } else {
        setError("Login inválido. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
      console.error(err);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 py-5">
      <div className="text-center mb-5">
        <img src={logo} alt="Logo" className="img-fluid mb-3" style={{maxHeight: '80px'}} />
        <h1 className="display-5 fw-bold">Geo Fun</h1>
      </div>

      <div className="card p-4 shadow-sm" style={{width: '100%', maxWidth: '600px'}}>
        <form onSubmit={handleSubmit}>
          <h2 className="h4 text-center mb-4">Login</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Entrar
          </button>

          <div className="text-center">
            <p className="mb-0">
              Novo? <Link to="/register" className="text-decoration-none">Cadastre-se!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;