import { useNavigate } from "react-router-dom";
import { goToHome } from "../../router/Coordinator";
import { URL_COUNTRIES } from "../../constants/Constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import logo from "../../assets/images/globo.png.png";
import "./CountryDetail.css";

const CountryDetail = () => {
  const [detailCountryName, setDetailCountryName] = useState(
    localStorage.getItem("name")
  );
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getDataDetails = async (name) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${URL_COUNTRIES}/name/${name}`);

      if (!res.data || res.data.length === 0) {
        throw new Error("País não encontrado");
      }

      setDetails(res.data[0]);
    } catch (err) {
      let errorMessage = "Erro ao carregar detalhes do país";

      if (err.response) {
        // Erro da API
        errorMessage = err.response.data.message || errorMessage;
      } else if (err.request) {
        // Erro de conexão
        errorMessage = "Erro de conexão com o servidor";
      } else if (err.message === "País não encontrado") {
        errorMessage = err.message;
      }

      setError(errorMessage);
      console.error("Erro:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = () => {
    goToHome(navigate);
  };

  const languagesDetails =
    details &&
    Object.keys(details.languages)
      .map((key) => details.languages[key])
      .join(", ");

  const currenciesDetails =
    details &&
    Object.keys(details.currencies)
      .map((key) => details.currencies[key].name)
      .join(", ");

  const flag = details?.flags?.png;

  useEffect(() => {
    if (detailCountryName) {
      getDataDetails(detailCountryName);
    } else {
      setError("Nome do país não encontrado");
      setLoading(false);
    }
  }, [detailCountryName]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="logo-wrapper">
          <img src={logo} alt="Logo" />
          <h1>Geo Facts</h1>
          <FaArrowLeft onClick={() => handleReturn()} />
        </div>
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Carregando detalhes do país...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="logo-wrapper">
          <img src={logo} alt="Logo" />
          <h1>Geo Facts</h1>
          <FaArrowLeft onClick={() => handleReturn()} />
        </div>
        <div className="error-message">
          <FaExclamationTriangle className="error-icon" />
          <h2>Ocorreu um erro</h2>
          <p>{error}</p>
          <button onClick={handleReturn} className="return-button">
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="logo-wrapper">
        <img src={logo} alt="Logo" />
        <h1>Geo Facts</h1>
        <FaArrowLeft onClick={() => handleReturn()} />
      </div>

      {details && (
        <div key={details.ccn3} className="country-details">
          <div className="country-header">
            <h2>{details?.name?.common}</h2>
            {flag && (
              <img
                src={flag}
                alt={`Bandeira de ${details?.name?.common}`}
                className="country-flag"
              />
            )}
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <strong>Capital:</strong> {details?.capital || "N/A"}
            </div>
            <div className="detail-item">
              <strong>População:</strong>{" "}
              {details?.population?.toLocaleString() || "N/A"}
            </div>
            <div className="detail-item">
              <strong>Idiomas:</strong> {languagesDetails || "N/A"}
            </div>
            <div className="detail-item">
              <strong>Moedas:</strong> {currenciesDetails || "N/A"}
            </div>
            <div className="detail-item">
              <strong>Região:</strong> {details?.region || "N/A"}
            </div>
            <div className="detail-item">
              <strong>Continente:</strong> {details?.subregion || "N/A"}
            </div>
            <div className="detail-item">
              <strong>Área:</strong> {details?.area?.toLocaleString() || "N/A"}{" "}
              km²
            </div>
            <div className="detail-item">
              <strong>Membro da ONU:</strong>{" "}
              {details?.unMember ? "Sim" : "Não"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
