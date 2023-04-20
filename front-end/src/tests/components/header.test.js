/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import Header from "../../components/Header";
import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "../../services/localStorage";

describe("Header component", () => {
  it("should renders correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(getByText(/início/i)).toBeInTheDocument();
    expect(getByText(/personagens/i)).toBeInTheDocument();
    expect(getByText(/regiões/i)).toBeInTheDocument();
    expect(getByText(/perfil/i)).toBeInTheDocument();
    expect(getByText(/sair/i)).toBeInTheDocument();
  });

  it("should redirect to home page when the text 'home' is clicked", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const homeButton = getByText(/início/i);
    fireEvent.click(homeButton);

    expect(window.location.pathname).toBe("/");
  });

  it("should redirect to character page when the text 'character' is clicked", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const characterButton = getByText(/personagens/i);
    fireEvent.click(characterButton);

    expect(window.location.pathname).toBe("/character");
  });

  it("should redirect to region page when the text 'region' is clicked", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const regionButton = getByText(/regiões/i);
    fireEvent.click(regionButton);

    expect(window.location.pathname).toBe("/region");
  });

  it("should redirect to profile page when the text 'profile' is clicked", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const profileButton = getByText(/perfil/i);
    fireEvent.click(profileButton);

    expect(window.location.pathname).toBe("/profile");
  });

  it("should redirect to login page when the text 'exit' is clicked and clear user/isLoggedIn in localStorage", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    setItemToLocalStorage("user", "name");
    setItemToLocalStorage("isLoggedIn", true);

    const exitButton = getByText(/sair/i);
    fireEvent.click(exitButton);

    expect(getItemFromLocalStorage("user")).toBeNull();
    expect(getItemFromLocalStorage("isLoggedIn")).toBeNull();
    expect(window.location.pathname).toBe("/login");
  });
});
