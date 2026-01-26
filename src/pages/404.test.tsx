import React from "react";
import { render } from "@testing-library/react";
import NotFoundPage from "./404";

describe("404 NotFoundPage component", () => {
  test("renders within Layout component", () => {
    const { getByRole } = render(<NotFoundPage />);

    // Layout component renders a header and main
    expect(getByRole("banner")).toBeInTheDocument();
    expect(getByRole("main")).toBeInTheDocument();
  });

  test("displays 'Welcome to Nowhere' heading", () => {
    const { getByText } = render(<NotFoundPage />);

    expect(getByText("Welcome to Nowhere")).toBeInTheDocument();
  });

  test("displays 'Page Not Found' subheading", () => {
    const { getByText } = render(<NotFoundPage />);

    expect(getByText("Page Not Found")).toBeInTheDocument();
  });

  test("renders h2 and h3 headings with correct hierarchy", () => {
    const { container } = render(<NotFoundPage />);

    const h2 = container.querySelector("h2");
    const h3 = container.querySelector("h3");

    expect(h2).toHaveTextContent("Welcome to Nowhere");
    expect(h3).toHaveTextContent("Page Not Found");
  });
});
