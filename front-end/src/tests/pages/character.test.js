/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Character from "../../pages/Character";

describe("Character page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Character />
      </BrowserRouter>
    );
  });

  it("should renders the title correctly", async () => {
    await waitFor(() => {
      const title = screen.getByRole("heading", { name: /personagens/i });

      expect(title).toBeInTheDocument();
    });
  });

  it("should renders the champions correctly", async () => {
    await waitFor(() => {
      const mock = {
        Aatrox: { id: "Aatrox" },
        Ahri: { id: "Ahri" },
      };

      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ data: mock }),
        })
      );

      expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
      expect(screen.getByText(/ahri/i)).toBeInTheDocument();

      global.fetch.mockRestore();
    });
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
});
