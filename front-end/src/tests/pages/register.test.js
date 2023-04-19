/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Register from "../../pages/Register";
import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "../../services/localStorage";

jest.mock("../../services/localStorage");

describe("Register page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("should renders the form correctly", () => {
    const heading = screen.getByRole("heading", { name: /registre-se/i });
    expect(heading).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/nome/i);
    expect(nameInput).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/senha/i);
    expect(passwordInput).toBeInTheDocument();

    const registerButton = screen.getByRole("button", { name: /registrar/i });
    expect(registerButton).toBeInTheDocument();

    const loginButton = screen.getByRole("button", {
      name: /entrar/i,
    });
    expect(loginButton).toBeInTheDocument();
  });

  it("should updates the name,email and password fields correctly", () => {
    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(nameInput.value).toBe("name");
    expect(emailInput.value).toBe("email@example.com");
    expect(passwordInput.value).toBe("password");
  });

  it("should calls setItemToLocalStorage function with user name,email and password when Register button is clicked and redirect to login page", async () => {
    const user = {
      name: "name",
      email: "email@example.com",
      password: "password",
    };

    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole("button", { name: /registrar/i });

    fireEvent.change(nameInput, {
      target: { value: user.name },
    });
    fireEvent.change(emailInput, {
      target: { value: user.email },
    });
    fireEvent.change(passwordInput, { target: { value: user.password } });
    fireEvent.click(registerButton);

    expect(setItemToLocalStorage).toHaveBeenCalledWith("userData", [user]);
    expect(window.location.pathname).toBe("/login");
  });

  it("should throw an error when name is invalid", () => {
    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole("button", { name: /registrar/i });

    fireEvent.change(nameInput, { target: { value: "a" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(registerButton);

    expect(
      screen.getByText("O nome deve ter pelo menos 2 caracteres")
    ).toBeInTheDocument();
  });

  it("should throw an error when email is invalid", () => {
    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole("button", { name: /registrar/i });

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "wrongemail" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(registerButton);

    expect(screen.getByText("Insira um email válido")).toBeInTheDocument();
  });

  it("should throw an error when password is invalid", () => {
    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole("button", { name: /registrar/i });

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    fireEvent.click(registerButton);

    expect(
      screen.getByText("A senha deve ter de 6 a 12 caracteres")
    ).toBeInTheDocument();
  });

  it("should throw an error when email is already registered", () => {
    const user = {
      name: "name",
      email: "email@example.com",
      password: "password",
    };
    getItemFromLocalStorage.mockReturnValueOnce([user]);

    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole("button", { name: /registrar/i });

    fireEvent.change(nameInput, {
      target: { value: user.name },
    });
    fireEvent.change(emailInput, {
      target: { value: user.email },
    });
    fireEvent.change(passwordInput, { target: { value: user.password } });
    fireEvent.click(registerButton);

    expect(setItemToLocalStorage).not.toHaveBeenCalled();
    expect(screen.getByText("Email já registrado")).toBeInTheDocument();
  });

  it("should redirect to home page if user is already logged in", () => {});

  it("should redirect to login page when login button is clicked", async () => {
    const loginButton = screen.getByRole("button", {
      name: /entrar/i,
    });
    fireEvent.click(loginButton);

    expect(window.location.pathname).toBe("/login");
  });
});
