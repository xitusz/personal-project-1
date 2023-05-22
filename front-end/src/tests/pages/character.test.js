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

  describe("Filter champions", () => {
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

    it("should render the message 'Nenhum campeão encontrado.' correctly", async () => {
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

        fireEvent.change(input, { target: { value: "Aaa" } });

        expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
        expect(
          screen.getByText(/Nenhum campeão encontrado./i)
        ).toBeInTheDocument();

        global.fetch.mockRestore();
      });
    });
    describe("should render the correct card based on the selected button.", () => {
      it("button 'Assassinos'", async () => {
        await waitFor(() => {
          const mock = {
            Aatrox: { id: "Aatrox" },
            Ahri: { id: "Ahri" },
            Akali: { id: "Akali" },
            Akshan: { id: "Akshan" },
            Alistar: { id: "Alistar" },
            Amumu: { id: "Amumu" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const buttonAssassin = screen.getByTestId("button-Assassin");

          fireEvent.click(buttonAssassin);

          expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
          expect(screen.getByText(/ahri/i)).toBeInTheDocument();
          expect(screen.getByText(/akali/i)).toBeInTheDocument();
          expect(screen.getByText(/akshan/i)).toBeInTheDocument();
          expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });

      it("button 'Magos'", async () => {
        await waitFor(() => {
          const mock = {
            Aatrox: { id: "Aatrox" },
            Ahri: { id: "Ahri" },
            Akali: { id: "Akali" },
            Akshan: { id: "Akshan" },
            Alistar: { id: "Alistar" },
            Amumu: { id: "Amumu" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );
          const buttonMage = screen.getByTestId("button-Mage");

          fireEvent.click(buttonMage);

          expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
          expect(screen.getByText(/ahri/i)).toBeInTheDocument();
          expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
          expect(screen.getByText(/amumu/i)).toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });

      it("button 'Tanques'", async () => {
        await waitFor(() => {
          const mock = {
            Aatrox: { id: "Aatrox" },
            Ahri: { id: "Ahri" },
            Akali: { id: "Akali" },
            Akshan: { id: "Akshan" },
            Alistar: { id: "Alistar" },
            Amumu: { id: "Amumu" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const buttonTank = screen.getByTestId("button-Tank");

          fireEvent.click(buttonTank);

          expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
          expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
          expect(screen.getByText(/alistar/i)).toBeInTheDocument();
          expect(screen.getByText(/amumu/i)).toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });

      it("button 'Lutadores'", async () => {
        await waitFor(() => {
          const mock = {
            Aatrox: { id: "Aatrox" },
            Ahri: { id: "Ahri" },
            Akali: { id: "Akali" },
            Akshan: { id: "Akshan" },
            Alistar: { id: "Alistar" },
            Amumu: { id: "Amumu" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const buttonFighter = screen.getByTestId("button-Fighter");

          fireEvent.click(buttonFighter);

          expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
          expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });

      it("button 'Atiradores'", async () => {
        await waitFor(() => {
          const mock = {
            Aatrox: { id: "Aatrox" },
            Ahri: { id: "Ahri" },
            Akali: { id: "Akali" },
            Akshan: { id: "Akshan" },
            Alistar: { id: "Alistar" },
            Amumu: { id: "Amumu" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const buttonMarksman = screen.getByTestId("button-Marksman");

          fireEvent.click(buttonMarksman);

          expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
          expect(screen.getByText(/akshan/i)).toBeInTheDocument();
          expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });

      it("button 'Suportes'", async () => {
        await waitFor(() => {
          const mock = {
            Aatrox: { id: "Aatrox" },
            Ahri: { id: "Ahri" },
            Akali: { id: "Akali" },
            Akshan: { id: "Akshan" },
            Alistar: { id: "Alistar" },
            Amumu: { id: "Amumu" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const buttonSupport = screen.getByTestId("button-Support");

          fireEvent.click(buttonSupport);

          expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
          expect(screen.getByText(/alistar/i)).toBeInTheDocument();
          expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });

      it("button 'Todos'", async () => {
        await waitFor(() => {
          const mock = {
            Aatrox: { id: "Aatrox" },
            Ahri: { id: "Ahri" },
            Akali: { id: "Akali" },
            Akshan: { id: "Akshan" },
            Alistar: { id: "Alistar" },
            Amumu: { id: "Amumu" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const buttonAll = screen.getByTestId("button-All");
          const buttonAssassin = screen.getByTestId("button-Assassin");
          const buttonMage = screen.getByTestId("button-Mage");
          const buttonTank = screen.getByTestId("button-Tank");
          const buttonFighter = screen.getByTestId("button-Fighter");
          const buttonMarksman = screen.getByTestId("button-Marksman");
          const buttonSupport = screen.getByTestId("button-Support");

          fireEvent.click(buttonAssassin);
          fireEvent.click(buttonMage);
          fireEvent.click(buttonTank);
          fireEvent.click(buttonFighter);
          fireEvent.click(buttonMarksman);
          fireEvent.click(buttonSupport);

          expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();

          fireEvent.click(buttonAll);

          expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
          expect(screen.getByText(/ahri/i)).toBeInTheDocument();
          expect(screen.getByText(/akali/i)).toBeInTheDocument();
          expect(screen.getByText(/akshan/i)).toBeInTheDocument();
          expect(screen.getByText(/alistar/i)).toBeInTheDocument();
          expect(screen.getByText(/amumu/i)).toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });

      it("two buttons 'Tanques' and 'Lutadores'", async () => {
        await waitFor(() => {
          const mock = {
            Aatrox: { id: "Aatrox" },
            Ahri: { id: "Ahri" },
            Akali: { id: "Akali" },
            Akshan: { id: "Akshan" },
            Alistar: { id: "Alistar" },
            Amumu: { id: "Amumu" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const buttonTank = screen.getByTestId("button-Tank");
          const buttonFighter = screen.getByTestId("button-Fighter");

          fireEvent.click(buttonTank);
          fireEvent.click(buttonFighter);

          expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
          expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });

      it("various buttons 'Assassinos', 'Magos', 'Tanques', 'Lutadores', 'Atiradores', 'Suportes' ", async () => {
        await waitFor(() => {
          const mock = {
            Aatrox: { id: "Aatrox" },
            Ahri: { id: "Ahri" },
            Akali: { id: "Akali" },
            Akshan: { id: "Akshan" },
            Alistar: { id: "Alistar" },
            Amumu: { id: "Amumu" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const buttonAssassin = screen.getByTestId("button-Assassin");
          const buttonMage = screen.getByTestId("button-Mage");
          const buttonTank = screen.getByTestId("button-Tank");
          const buttonFighter = screen.getByTestId("button-Fighter");
          const buttonMarksman = screen.getByTestId("button-Marksman");
          const buttonSupport = screen.getByTestId("button-Support");

          fireEvent.click(buttonAssassin);
          fireEvent.click(buttonMage);
          fireEvent.click(buttonTank);
          fireEvent.click(buttonFighter);
          fireEvent.click(buttonMarksman);
          fireEvent.click(buttonSupport);

          expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();
          expect(
            screen.getByText(/Nenhum campeão encontrado./i)
          ).toBeInTheDocument();
          global.fetch.mockRestore();
        });
      });
    });
  });
});
