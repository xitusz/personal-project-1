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

  it("should filter according to the text in the input", async () => {
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

      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "" } });

      expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
      expect(screen.getByText(/ahri/i)).toBeInTheDocument();

      fireEvent.change(input, { target: { value: "Aa" } });

      expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
      expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();

      fireEvent.change(input, { target: { value: "Ah" } });

      expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
      expect(screen.getByText(/ahri/i)).toBeInTheDocument();

      global.fetch.mockRestore();
    });
  });

  it("should render the 'Nenhum campeão encontrado.' message correctly", async () => {
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

      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "" } });

      expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
      expect(screen.getByText(/ahri/i)).toBeInTheDocument();

      fireEvent.change(input, { target: { value: "Aaa" } });

      expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();

      global.fetch.mockRestore();
    });
  });
});
