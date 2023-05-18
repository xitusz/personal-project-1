/* eslint-disable no-undef */
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import CharacterDetails from "../../pages/CharacterDetails";

describe("CharacterDetails page", () => {
  beforeEach(() => {
    const championName = "Aatrox";

    render(
      <MemoryRouter initialEntries={[`/character/${championName}`]}>
        <Routes>
          <Route
            path="/character/:championName"
            element={<CharacterDetails />}
          />
        </Routes>
      </MemoryRouter>
    );
  });

  it("should renders the loading message correctly", () => {
    const mock = {};

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mock }),
      })
    );

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it("should renders the champion details correctly", async () => {
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /aatrox/i, level: 1 })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /a espada darkin/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /história/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /habilidades/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /skins/i })
      ).toBeInTheDocument();
    });
  });
});
