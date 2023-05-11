/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  it("should renders the GitHub image", () => {
    const image = screen.getByAltText(/github/i);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png"
    );
  });

  it("should renders the GitHub link", () => {
    const link = screen.getByRole("link", { name: /github/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/xitusz");
  });

  it('should renders the "Voltar ao topo" image', () => {
    const image = screen.getByAltText(/voltar ao topo/i);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://icons.veryicon.com/png/o/internet--web/truckhome/back-to-the-top-2.png"
    );
  });

  it('should renders the "Voltar ao topo" button', () => {
    const button = screen.getByRole("button", { name: /voltar ao topo/i });

    expect(button).toBeInTheDocument();
  });

  it('should scroll to the top when the "Voltar ao topo" button is clicked.', () => {
    window.scrollTo = jest.fn();

    const button = screen.getByRole("button", { name: /voltar ao topo/i });

    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("should renders the LinkedIn image", () => {
    const image = screen.getByAltText("linkedIn");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
    );
  });

  it("should renders the LinkedIn link", () => {
    const link = screen.getByRole("link", { name: /LinkedIn/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/gabrielalves1/"
    );
  });

  it("should renders the Gmail image", () => {
    const image = screen.getByAltText("gmail");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"
    );
  });

  it("should renders the Gmail link", () => {
    const link = screen.getByRole("link", { name: /Gmail/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "mailto:2kgabrielalves@gmail.com");
  });

  it("should renders the portfolio image", () => {
    const image = screen.getByAltText("portfolio");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://camo.githubusercontent.com/33bc5b729c9fb7f279528ca182bb84d42b9b6fb40233e494afa02fad1599bcb7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f706f7274666f6c696f2d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d41626f75742e6d65266c6f676f436f6c6f723d7768697465"
    );
  });

  it("should renders the Portfolio link", () => {
    const link = screen.getByRole("link", { name: /Portfolio/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://xitusz.github.io/my-portfolio/"
    );
  });

  it("should renders the copyright message", () => {
    const message = screen.getByText(/All Rights Reserved/);

    expect(message).toBeInTheDocument();
  });

  it('should renders "gabriel alves" with a link to the GitHub profile', () => {
    const link = screen.getByRole("link", { name: /gabriel alves/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/xitusz");
  });
});
