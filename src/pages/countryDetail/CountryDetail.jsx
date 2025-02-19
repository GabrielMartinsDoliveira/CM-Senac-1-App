import { useNavigate } from "react-router-dom";
import { goToHome } from "../../router/Coordinator";
import { URL } from "../../constants/url";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../../assets/images/globo.png.png";
import "./CountryDetail.css";

const CountryDetail = () => {
  const [detailCountryName, setDetailCountriName] = useState(
    localStorage.getItem("name")
  );
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  const getDataDetails = async (name) => {
    try {
      const res = await axios.get(`${URL}/name/${name}`);
      setDetails(res.data[0]);
    } catch (err) {
      console.log(err.data.message);
    }
  };

  const handleReturn = () => {
    localStorage.clear();
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

  const giniIndex =
    details &&
    Object.keys(details.gini)
      .map((key) => details.gini[key])
      .join(", ");

  const flag = details?.flags?.png;

  console.log(flag);

  console.log(details);
  useEffect(() => {
    getDataDetails(detailCountryName);
  }, []);

  return (
    <div>
      <div className="logo-wrapper">
        <img src={logo} alt="Logo" />
        <h1>Geo Facts</h1>
        <FaArrowLeft onClick={() => handleReturn()} />
      </div>

      {details && (
        <div key={details.ccn3} className="country-details">
          <p>
            <strong>Name:</strong> {details?.name?.common}
          </p>
          <p>
            <strong>Capital:</strong> {details?.capital}
          </p>
          <p>
            <strong>Population:</strong> {details?.population}
          </p>
          <p>
            <strong>Languages:</strong> {languagesDetails}
          </p>
          <p>
            <strong>Currencies:</strong> {currenciesDetails}
          </p>
          <p>
            <strong>Region:</strong> {details?.region}
          </p>
          <p>
            <strong>Continent:</strong> {details?.subregion}
          </p>
          <p>
            <strong>Last Gini Index:</strong> {giniIndex}
          </p>
          <p>
            <strong>Area:</strong> {details?.area} Km2
          </p>
          <p>
            <strong>Onu member:</strong> {!details.unMmber ? "Yes" : "No"}
          </p>
          <img src={flag} alt={"Flag of the country"} />
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
