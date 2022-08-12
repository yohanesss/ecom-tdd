import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("should render main page layout", () => {
  it("should render navigation", () => {
    render(<App />, { wrapper: BrowserRouter });

    // render category link
    const categoryLink = screen.getByText(/category/i);
    expect(categoryLink).toBeInTheDocument();

    // render login / register link
    const loginRegisterLink = screen.getByText(/login \/ register/i);
    expect(loginRegisterLink).toBeInTheDocument();

    // render searchbar
    const searchbar = screen.getByPlaceholderText(/search by name/i);
    expect(searchbar).toBeInTheDocument();
  });
});
