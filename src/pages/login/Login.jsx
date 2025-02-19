import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { goToHome } from "../../router/Coordinator";
import './Login.css';
import logo from '../../assets/images/globo.png.png'


const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email && password) {
      goToHome(navigate);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="logo-wrapper">
        <img src={logo} alt="Logo" />
        <h1 className="title">Geo Facts</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Login</h1>
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Entrar</button>
        <div className="signup-wrapper">
          <p>
            New around? <Link to="/register">Register here!</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
