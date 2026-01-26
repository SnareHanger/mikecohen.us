import React from "react";
import { render } from "@testing-library/react";
import Home, { Head } from "./index";

describe("Home page component", () => {
  test("renders within Layout component", () => {
    const { getByRole } = render(<Home />);

    // Layout component renders a header and main
    expect(getByRole("banner")).toBeInTheDocument();
    expect(getByRole("main")).toBeInTheDocument();
  });

  test("renders projects container", () => {
    const { container } = render(<Home />);

    const projectsDiv = container.querySelector("#projects");
    expect(projectsDiv).toBeInTheDocument();
  });

  test("renders project links from projects.json", () => {
    const { getByText } = render(<Home />);

    // From mock projects.json
    expect(getByText("Test Project")).toBeInTheDocument();
  });

  test("project links have correct href", () => {
    const { getByText } = render(<Home />);

    const link = getByText("Test Project").closest("a");
    expect(link).toHaveAttribute("href", "projects/test-project");
  });

  test("project links have nohover class", () => {
    const { getByText } = render(<Home />);

    const link = getByText("Test Project").closest("a");
    expect(link).toHaveClass("nohover");
  });
});

describe("Head component", () => {
  test("renders title", () => {
    const { container } = render(<Head />);

    const title = container.querySelector("title");
    expect(title).toHaveTextContent("Mike Cohen");
  });

  test("renders apple-touch-icon link", () => {
    const { container } = render(<Head />);

    const appleIcon = container.querySelector('link[rel="apple-touch-icon"]');
    expect(appleIcon).toHaveAttribute("href", "/images/apple-touch-icon.png");
    expect(appleIcon).toHaveAttribute("sizes", "180x180");
  });

  test("renders favicon links", () => {
    const { container } = render(<Head />);

    const favicon32 = container.querySelector('link[sizes="32x32"]');
    const favicon16 = container.querySelector('link[sizes="16x16"]');

    expect(favicon32).toHaveAttribute("href", "/images/favicon-32x32.png");
    expect(favicon16).toHaveAttribute("href", "/images/favicon-16x16.png");
  });

  test("renders manifest link", () => {
    const { container } = render(<Head />);

    const manifest = container.querySelector('link[rel="manifest"]');
    expect(manifest).toHaveAttribute("href", "/site.webmanifest");
  });
});
