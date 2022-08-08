import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("should render main page layout", () => {
  it("should render navigation", () => {
    render(<App />);
    const categoryLink = screen.getByText(/category/i);
    expect(categoryLink).toBeInTheDocument();
  });
});
