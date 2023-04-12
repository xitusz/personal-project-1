import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const Router = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
  </Routes>
);

export default Router;
