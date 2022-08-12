import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";

test("navigate from homepage to category landing page", async () => {
  render(<App />, { wrapper: BrowserRouter });

  const categoryLink = screen.getByText(/category/i);
  expect(screen.getByText(/category/i)).toBeInTheDocument();

  userEvent.click(categoryLink);

  expect(await screen.findByText(/programming/i)).toBeInTheDocument();
});
