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

  return (
    <div>
      <Header />
      <div className="character-page py-5">
        <h1 className="text-center text-white pt-5 p-4">Personagens</h1>
        <div className="d-flex justify-content-center row mx-5">
          {loading ? (
            <Loading />
          ) : (
            Object.values(champions).map((champion) => {
              const { id } = champion;
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
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Character;
