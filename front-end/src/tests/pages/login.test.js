/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Login from "../../pages/Login";
import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "../../services/localStorage";

describe("Login page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("should renders the form correctly", () => {
    const heading = screen.getByRole("heading", { name: /login/i });
    expect(heading).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/senha/i);
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByRole("button", { name: /entrar/i });
    expect(loginButton).toBeInTheDocument();

    const registerButton = screen.getByRole("button", {
      name: /registrar-se/i,
    });
    expect(registerButton).toBeInTheDocument();
  });

  it("should updates the email and password fields correctly", () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput.value).toBe("email@example.com");
    expect(passwordInput.value).toBe("password");
  });

  it("should calls setItemToLocalStorage function with user email and password when Login button is clicked and redirect to home page", async () => {
    const user = {
      name: "name",
      email: "email@example.com",
      password: "password",
    };
    setItemToLocalStorage("userData", [user]);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, {
      target: { value: user.email },
    });
    fireEvent.change(passwordInput, { target: { value: user.password } });
    fireEvent.click(loginButton);

    expect(getItemFromLocalStorage("isLoggedIn")).toBe(true);
    expect(getItemFromLocalStorage("user")).toBe(user.name);
    expect(getItemFromLocalStorage("email")).not.toBe(user.email);
    expect(getItemFromLocalStorage("password")).not.toBe(user.password);
    expect(window.location.pathname).toBe("/");
  });

  it("should throw an error when email or password is invalid", async () => {
    const user = {
      name: "name",
      email: "email@example.com",
      password: "password",
    };
    setItemToLocalStorage("userData", [user]);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, {
      target: { value: "wrongemail@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: user.password } });
    fireEvent.click(loginButton);

    expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    expect(getItemFromLocalStorage("isLoggedIn")).not.toBe(true);
    expect(getItemFromLocalStorage("user")).not.toBe(user.name);
  });

  it("should redirect to home page if user is already logged in", () => {
    setItemToLocalStorage("isLoggedIn", true);

    expect(getItemFromLocalStorage("isLoggedIn")).toBe(true);
    expect(window.location.pathname).toBe("/");
  });

  it("should redirect to register page when register button is clicked", async () => {
    const registerButton = screen.getByRole("button", {
      name: /registrar-se/i,
    });
    fireEvent.click(registerButton);

    expect(window.location.pathname).toBe("/register");
  });
});
