import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToDetails } from "../../router/Coordinator";
import { URL } from "../../constants/url";
import axios from "axios";
import "./Home.css";
import logo from "../../assets/images/globo.png.png"

const Home = () => {
  useEffect(() => {
    getData();
  }, []);

  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(`${URL}/all`);
      setCountries(res.data);
    } catch (err) {
      console.log(err.data.message);
    }
  };

  const onClickDetails = (cName) => {
    if (cName.toLowerCase() === countryName) {
      localStorage.setItem("name", countryName);
      goToDetails(navigate);
    } else {
      alert("Write the correct name of the country");
    }
  };

  const filterByName =
    countries &&
    countries.filter((c) => {
      return c.name.common.toLowerCase().includes(countryName);
    });

  const countryInfo =
    Array.isArray(filterByName) && filterByName.length > 0
      ? filterByName.map((c) => {
          const languageList =
            c.languages && typeof c.languages == "object"
              ? Object.keys(c.languages)
                  .map((key) => c.languages[key])
                  .join(", ")
              : [];

          const currenciesList =
            c.currencies && typeof c.currencies == "object"
              ? Object.keys(c.currencies)
                  .map((key) => c.currencies[key].name)
                  .join(", ")
              : [];

          return (
            <div key={c.ccn3} onClick={() => onClickDetails(c.name.common)}>
              <p>Name: {c.name.common}</p>
              <p>Capital: {c?.capital}</p>
              <p>Population: {c.population}</p>
              <p>Languages:{languageList} </p>
              <p> Currencies:{currenciesList}</p>
            </div>
          );
        })
      : Array.isArray(countries) && countries.length > 0
      ? countries.map((c) => {
          const languageList =
            c.languages && typeof c.languages == "object"
              ? Object.keys(c.languages)
                  .map((key) => c.languages[key])
                  .join(", ")
              : [];

          const currenciesList =
            c.currencies && typeof c.currencies == "object"
              ? Object.keys(c.currencies)
                  .map((key) => c.currencies[key].name)
                  .join(", ")
              : [];

          return (
            <div key={c.ccn3} onClick={() => onClickDetails(c.name.common)}>
              <p>Name: {c.name.common}</p>
              <p>Capital: {c?.capital}</p>
              <p>Population: {c.population}</p>
              <p>Languages:{languageList} </p>
              <p> Currencies:{currenciesList}</p>
            </div>
          );
        })
      : null;

  console.log(countries);
  console.log(filterByName);

  return (
    <div>
  <div className="logo-wrapper">
    <img src={logo} alt="Logo" />
    <h1>Geo Facts</h1>
  </div>
  <h2>Find out information about a country</h2>
  <input
    type="text"
    placeholder="Country Name"
    value={countryName}
    onChange={(e) => setCountryName(e.target.value)}
    required
  />
  {countries &&
    filterByName.map((c) => {
      const languageList =
        c.languages && typeof c.languages == "object"
          ? Object.keys(c.languages)
              .map((key) => c.languages[key])
              .join(", ")
          : [];

      const currenciesList =
        c.currencies && typeof c.currencies == "object"
          ? Object.keys(c.currencies)
              .map((key) => c.currencies[key].name)
              .join(", ")
          : [];

      return (
        <div
          key={c.ccn3}
          className="country-card"
          onClick={() => onClickDetails(c.name.common)}
        >
          <p><strong>Name:</strong> {c.name.common}</p>
          <p><strong>Capital:</strong> {c?.capital}</p>
          <p><strong>Population:</strong> {c.population}</p>
          <p><strong>Languages:</strong> {languageList}</p>
          <p><strong>Currencies:</strong> {currenciesList}</p>
        </div>
      );
    })}
</div>
  );
};

export default Home;
