import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const CharacterDetails = () => {
  const [championDetail, setChampionDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [skillState, setSkillState] = useState("passive");
  const [skinState, setSkinState] = useState("default");
  const { championName } = useParams();

  useEffect(() => {
    fetch(
      `http://ddragon.leagueoflegends.com/cdn/13.9.1/data/pt_BR/champion/${championName}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        setChampionDetail(data.data[championName]);
        setLoading(false);
      });
  }, [championName]);

  const { id, title, lore, tags, passive, spells, skins } = championDetail;

  return (
    <div>
      <Header />
      <div className="character-details-page py-5">
        {loading ? (
          <Loading />
        ) : (
          <div className="p-5 text-white text-center">
            <div>
              <h1>{id}</h1>
              <h2>{title}</h2>
              <div>
                {tags.map((tag) => (
                  <span key={tag} className="mx-1">
                    {tag}
                  </span>
                ))}
              </div>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
                alt={id}
                className="img-fluid mt-2"
              />
            </div>
            <hr className="w-25 mx-auto my-5" />
            <div className="w-75 mx-auto">
              <h3>História</h3>
              <div className="border p-4">
                <span>{lore}</span>
              </div>
            </div>
            <hr className="w-25 mx-auto my-5" />
            <div className="w-75 mx-auto">
              <h3>Habilidades</h3>
              <div className="border">
                <div className="p-2">
                  <button
                    className="border-0 p-0 mx-2 img-button"
                    onClick={() => setSkillState("passive")}
                  >
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/passive/${passive.image.full}`}
                      alt={passive.name}
                      className="button-img"
                    />
                  </button>
                  {spells.map((spell) => (
                    <button
                      className="border-0 p-0 m-2 img-button"
                      key={spell.id}
                      onClick={() => setSkillState(spell.name)}
                    >
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${spell.image.full}`}
                        alt={spell.name}
                        className="button-img"
                      />
                    </button>
                  ))}
                </div>
                <hr className="m-0" />
                <div>
                  {skillState === "passive" && (
                    <div className="p-3">
                      <span>Passiva</span>
                      <h6>{passive.name}</h6>
                      <span>{passive.description}</span>
                    </div>
                  )}
                  {spells.map(
                    (spell) =>
                      skillState === spell.name && (
                        <div key={spell.id} className="p-3">
                          <span>{spell.id.charAt(spell.id.length - 1)}</span>
                          <h6>{spell.name}</h6>
                          <span>{spell.description}</span>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
            <hr className="w-25 mx-auto my-5" />
            <div className="w-75 mx-auto">
              <h3>Skins</h3>
              <div className="border">
                <div className="p-2">
                  {skins.map((skin) => (
                    <button
                      className="border-0 p-0 m-2 img-button"
                      key={skin.id}
                      onClick={() => setSkinState(skin.name)}
                    >
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`}
                        alt={skin.name}
                        className="button-img"
                      />
                    </button>
                  ))}
                </div>
                <hr className="m-0" />
                <div className="d-flex p-3">
                  {skins.map(
                    (skin) =>
                      skinState === skin.name && (
                        <div key={skin.num} className="mx-auto">
                          <h6>
                            {skin.name === "default" ? (
                              <span>{id}</span>
                            ) : (
                              <span>{skin.name}</span>
                            )}
                          </h6>
                          <img
                            className="img-fluid rounded"
                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`}
                            alt={skin.name}
                          />
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CharacterDetails;
