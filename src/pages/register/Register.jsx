import { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { goToLoginPage } from "../../router/Coordinator";
import logo from "../../assets/images/globo.png.png";

const Register = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [matchPasswords, setMatchPasswords] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    goToLoginPage(navigate);
  };

  const checkingPasswords = () => {
    if (password === confirmPassword) {
      setMatchPasswords(true);
    }
  };

  useEffect(() => {
    checkingPasswords();
  }, confirmPassword);

  return (
    <div>
      <div className="logo-wrapper">
        <img src={logo} alt="Logo" />
        <h1>Geo Facts</h1>
      </div>

      <div className="container-cadastro">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-field">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!matchPasswords ? <p>As senhas precisam ser iguais!</p> : null}
          </div>

          <button>Cadastrar-se</button>

          <div className="signup-link">
            <p>
              Got an account? <Link to="/">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
