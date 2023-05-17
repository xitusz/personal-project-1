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
      <div className="mt-4 mx-5">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className="text-center">
              <h1>{id}</h1>
              <h2>{title}</h2>
              {tags.map((tag) => (
                <span key={tag} className="mx-1">
                  {tag}
                </span>
              ))}
              <hr className="w-25 mx-auto my-5" />
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
                alt={id}
                className="img-fluid"
              />
            </div>
            <hr className="w-25 mx-auto my-5" />
            <div className="w-75 mx-auto text-center">
              <h3>História</h3>
              <div className="border p-4">
                <span>{lore}</span>
              </div>
            </div>
            <hr className="w-25 mx-auto my-5" />
            <div className="w-75 mx-auto">
              <h3 className="text-center">Habilidades</h3>
              <div className="border">
                <div className="d-flex justify-content-center flex-wrap mt-3">
                  <button
                    className="border-0 bg-white mx-2 p-0"
                    onClick={() => setSkillState("passive")}
                  >
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/passive/${passive.image.full}`}
                      alt={passive.name}
                      className="rounded-circle"
                    />
                  </button>
                  {spells.map((spell) => (
                    <button
                      className="border-0 bg-white p-0 m-2"
                      key={spell.id}
                      onClick={() => setSkillState(spell.name)}
                    >
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${spell.image.full}`}
                        alt={spell.name}
                        className="rounded-circle"
                      />
                    </button>
                  ))}
                </div>
                <div className="text-center mt-3 border">
                  {skillState === "passive" && (
                    <div className="mx-auto p-3">
                      <span>Passiva</span>
                      <h6>{passive.name}</h6>
                      <span>{passive.description}</span>
                    </div>
                  )}
                  {spells.map(
                    (spell) =>
                      skillState === spell.name && (
                        <div key={spell.id} className="mx-auto p-3">
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
              <h3 className="text-center">Skins</h3>
              <div className="border">
                <div className="d-flex justify-content-center flex-wrap mt-3">
                  {skins.map((skin) => (
                    <button
                      className="border-0 bg-white p-0 m-2"
                      key={skin.id}
                      onClick={() => setSkinState(skin.name)}
                    >
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`}
                        alt={skin.name}
                        width={"64px"}
                        height={"64px"}
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
                      />
                    </button>
                  ))}
                </div>
                <div className="d-flex justify-content-center mt-3 border p-2">
                  {skins.map(
                    (skin) =>
                      skinState === skin.name && (
                        <div
                          key={skin.num}
                          className="mb-4 text-center"
                          style={{ width: "max-content" }}
                        >
                          <h6>{skin.name}</h6>
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
