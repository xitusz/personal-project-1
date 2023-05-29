import React from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="py-5">
        <h1 className="text-center text-white pt-5 p-4">Início</h1>
        <h2 className="text-center text-white pt-5 p-4">
          Em contrução <Loading />
        </h2>
        <h4 className="text-center text-white pt-5 p-4">
          Vá para{" "}
          <Link
            to="/character"
            className="text-white construction-character-link"
          >
            Personagens
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Home;
