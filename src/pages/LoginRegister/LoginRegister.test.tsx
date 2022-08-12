import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";

describe("test login register page", () => {
  const goToLoginRegisterPage = () => {
    render(<App />, { wrapper: BrowserRouter });
    const loginRegisterLink = screen.getByText(/login \/ register/i);
    expect(loginRegisterLink).toBeInTheDocument();

    userEvent.click(loginRegisterLink);
  };

  const checkForEmptyForm = () => {
    const emailForm = screen.getByPlaceholderText("email");
    const passwordForm = screen.getByPlaceholderText("password");

    expect(emailForm).toBeInTheDocument();
    expect(emailForm.innerHTML).toBe("");

    expect(passwordForm).toBeInTheDocument();
    expect(passwordForm.innerHTML).toBe("");
  };

  const changeRegisterLoginState = () => {
    const navLink = screen.getByRole("button", {
      name: /here/i,
    });
    expect(navLink).toBeInTheDocument();
    userEvent.click(navLink);
  };

  it("should navigate from homepage to login register page", () => {
    goToLoginRegisterPage();
    checkForEmptyForm();

    expect(
      screen.getByRole("heading", {
        name: /login/i,
      })
    ).toBeInTheDocument();

    changeRegisterLoginState();

    expect(
      screen.getByRole("heading", {
        name: /register/i,
      })
    ).toBeInTheDocument();
  });
});
