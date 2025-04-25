import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { goToDetails } from "../../router/Coordinator";
import { URL_COUNTRIES, URL_GEO_API, HeaderReq } from "../../constants/Constants";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [hintsShown, setHintsShown] = useState(0);
  const [countryGuess, setCountryGuess] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios(`${URL_COUNTRIES}/all`);
      setCountries(res.data);
    } catch (err) {
      console.log("Erro ao carregar países:", err.message);
    }
  };

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    setCurrentCountry(countries[randomIndex]);
    setHintsShown(1);
    setCountryGuess("");
  };

  const showNextHint = () => {
    if (hintsShown < 5) {
      setHintsShown((prev) => prev + 1);
    }
  };

  const updateScore = async (points) => {
    try {
      await axios.put(
        `${URL_GEO_API}user/${userId}`,
        { score: points },
        { headers: HeaderReq(token) }
      );
    } catch (err) {
      console.log("Erro ao atualizar pontuação:", err.message);
    }
  };

  const checkAnswer = async () => {
    if (
      countryGuess.trim().toLowerCase() ===
      currentCountry.name.common.toLowerCase()
    ) {
      const score = 6 - hintsShown;
      localStorage.setItem("name", currentCountry.name.common);

      await updateScore(score);

      alert(`Acertou! Sua pontuação: ${score}/5`);
      goToDetails(navigate);
    } else {
      alert("Tente novamente!");
    }
  };

  const getHints = () => {
    if (!currentCountry) return [];

    const hints = [];

    if (hintsShown >= 1) hints.push(`Capital: ${currentCountry.capital?.[0]}`);
    if (hintsShown >= 2) hints.push(`População: ${currentCountry.population}`);
    if (hintsShown >= 3) {
      const langs = Object.values(currentCountry.languages || {}).join(", ");
      hints.push(`Idiomas: ${langs}`);
    }
    if (hintsShown >= 4) {
      const curr = Object.values(currentCountry.currencies || {})
        .map((c) => c.name)
        .join(", ");
      hints.push(`Moeda(s): ${curr}`);
    }
    if (hintsShown >= 5) hints.push(`Região: ${currentCountry.region}`);

    return hints;
  };

  return (
    <div className="p-4">
      <Header />
      <h3 className="text-2xl font-bold mt-4 mb-2">
        Descubra o país com base nas dicas!
      </h3>
      <h3 className="text-2xl font-bold mt-4 mb-2">
        Lembrando que o nome do País está em Inglês!
      </h3>
      <button
        onClick={startGame}
        className="bg-blue-600 text-black px-4 py-2 rounded shadow"
      >
        Start
      </button>

      {currentCountry && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Dicas:</h3>
          <ul className="list-disc ml-6">
            {getHints().map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>

          {hintsShown < 5 && (
            <button
              onClick={showNextHint}
              className="mt-2 bg-yellow-500 text-black px-4 py-1 rounded"
            >
              Mostrar outra dica
            </button>
          )}

          <div className="mt-4">
            <input
              type="text"
              placeholder="Digite o nome do país"
              value={countryGuess}
              onChange={(e) => setCountryGuess(e.target.value)}
              className="border px-2 py-1 rounded mr-2"
            />
            <button
              onClick={checkAnswer}
              className="bg-green-600 text-black px-4 py-1 rounded"
            >
              Verificar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
