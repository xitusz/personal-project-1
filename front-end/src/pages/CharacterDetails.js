import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

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

  if (loading) {
    return <span>Carregando</span>;
  }

  const { id, title, lore, tags, passive, spells, skins } = championDetail;

  return (
    <div>
      <Header />
      <div>
        <div>
          <h1>{id}</h1>
          <h2>{title}</h2>
          <hr />
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
            alt={id}
          />
        </div>
        <hr />
        <div>
          <h3>Função</h3>
          <div>
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <hr />
        <div>
          <h3>História</h3>
          <div>
            <span>{lore}</span>
          </div>
        </div>
        <hr />
        <div>
          <h3>Habilidades</h3>
          <div>
            <div>
              <button onClick={() => setSkillState("passive")}>
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/passive/${passive.image.full}`}
                  alt={passive.name}
                />
              </button>
              {spells.map((spell) => (
                <button
                  key={spell.id}
                  onClick={() => setSkillState(spell.name)}
                >
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${spell.image.full}`}
                    alt={spell.name}
                  />
                </button>
              ))}
            </div>
            <div>
              {skillState === "passive" && (
                <div>
                  <h6>{passive.name}</h6>
                  <span>{passive.description}</span>
                </div>
              )}
              {spells.map(
                (spell) =>
                  skillState === spell.name && (
                    <div key={spell.id}>
                      <h6>{spell.name}</h6>
                      <span>{spell.description}</span>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h3>Skins</h3>
          <div>
            <div>
              {skins.map((skin) => (
                <button key={skin.id} onClick={() => setSkinState(skin.name)}>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`}
                    alt={skin.name}
                    width={"64px"}
                    height={"64px"}
                  />
                </button>
              ))}
            </div>
            <div>
              {skins.map(
                (skin) =>
                  skinState === skin.name && (
                    <div key={skin.num}>
                      <h6>{skin.name}</h6>
                      <img
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
    </div>
  );
};

export default CharacterDetails;
