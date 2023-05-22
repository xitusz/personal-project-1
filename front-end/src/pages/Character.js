import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Character = () => {
  const navigate = useNavigate();
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchChampion, setSearchChampion] = useState("");

  useEffect(() => {
    fetch(
      "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/pt_BR/champion.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setChampions(data.data);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchChampion(event.target.value);
  };

  const filteredChampions = Object.values(champions).filter(({ id }) =>
    id.toLowerCase().includes(searchChampion.toLowerCase())
  );

  const renderChampions = () => {
    if (filteredChampions.length > 0) {
      return filteredChampions.map(({ id }) => {
        const imageURL = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`;

        return (
          <div key={id} className="mb-4 character-card">
            <div
              className="text-decoration-none"
              onClick={() => navigate(`/character/${id}`)}
            >
              <Card name={id} image={imageURL} />
            </div>
          </div>
        );
      });
    } else {
      return <span>Nenhum campeão encontrado.</span>;
    }
  };

  return (
    <div>
      <Header />
      <div className="character-page py-5">
        <h1 className="text-center text-white pt-5 p-4">Personagens</h1>
        <div>
          <input type="text" value={searchChampion} onChange={handleSearch} />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="d-flex justify-content-center row mx-5">
            {renderChampions()}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Character;
