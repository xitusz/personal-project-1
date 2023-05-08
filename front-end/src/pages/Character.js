import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";

const Character = () => {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Carregando</p>;
  }

  return (
    <div>
      <Header />
      <h1 className="text-center m-4">Personagens</h1>
      <div className="d-flex justify-content-center row mx-5">
        {Object.values(champions).map((champion) => {
          const { id } = champion;
          const imageURL = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`;

          return (
            <div key={id} className="mb-4" style={{ width: "max-content" }}>
              <Link to={`/character/${id}`} className="text-decoration-none">
                <Card name={id} image={imageURL} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Character;
