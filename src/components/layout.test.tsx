import React from "react";
import { render } from "@testing-library/react";
import Layout from "./layout";

test("Displays correct title", () => {
  const { getByTestId } = render(<Layout children />);

  expect(getByTestId("header-title-link")).toHaveTextContent("Mike Cohen");
});

test("Renders children", () => {
  const children = <div data-testid='hello'>hello!</div>;
  const { getByTestId } = render(<Layout children={children} />);

  expect(getByTestId("layout-main").firstElementChild).toBeInTheDocument();
  expect(getByTestId("layout-main").firstElementChild).toContainElement(
    getByTestId("hello")
  );
});
