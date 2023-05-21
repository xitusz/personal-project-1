/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Character from "../../pages/Character";

describe("Character page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Character />
      </BrowserRouter>
    );
  });

  it("should render the title correctly", async () => {
    await waitFor(() => {
      const title = screen.getByRole("heading", { name: /personagens/i });

      expect(title).toBeInTheDocument();
    });
  });

  it("should render the champions correctly", async () => {
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

  it("should render the loading message correctly", () => {
    const mock = {};

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mock }),
      })
    );

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it("should redirect to card details when card is clicked", async () => {
    await waitFor(() => {
      const mock = {
        Aatrox: { id: "Aatrox" },
      };

      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ data: mock }),
        })
      );

      const cardAatrox = screen.getByText(/aatrox/i);

      fireEvent.click(cardAatrox);

      expect(window.location.pathname).toBe("/character/Aatrox");

      global.fetch.mockRestore();
    });
  });
});
