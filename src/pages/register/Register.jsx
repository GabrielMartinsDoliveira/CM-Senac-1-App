import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { goToLoginPage } from "../../router/Coordinator";
import logo from "../../assets/images/globo.png.png";
import axios from "axios";
import {URL_GEO_API} from "../../constants/Constants";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPasswords, setMatchPasswords] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMatchPasswords(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!matchPasswords) {
      setError("Passwords are not matching.");
      return;
    }

    try {
      const response = await axios.post(`${URL_GEO_API}user`, {
        name,
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201 || response.status === 200) {
        goToLoginPage(navigate);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao registrar.");
      console.error(err);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 py-5">
      <div className="text-center mb-5">
        <img src={logo} alt="Logo" className="img-fluid mb-3" style={{maxHeight: '80px'}} />
        <h1 className="display-5 fw-bold">Geo Fun</h1>
      </div>

      <div className="card p-4 shadow-sm" style={{width: '100%', maxWidth: '400px'}}>
        <form onSubmit={handleSubmit}>
          <h2 className="h4 text-center mb-4">Cadastrar</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${!matchPasswords ? 'is-invalid' : ''}`}
              placeholder="Confirme Senha"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!matchPasswords && (
              <div className="invalid-feedback">Senha distintas!</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Cadastre-se
          </button>

          <div className="text-center">
            <p className="mb-0">
              Já tem conta? <Link to="/" className="text-decoration-none">Login Aqui</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;