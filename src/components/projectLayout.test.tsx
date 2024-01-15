import React from "react";
import { render } from "@testing-library/react";
import ProjectLayout from "./projectLayout";

test("Displays correct title", () => {
  const { getByTestId } = render(<ProjectLayout projectKey='test-project' />);

  expect(getByTestId("project-title")).toHaveTextContent("Test Project");
});

test("Displays correct work type", () => {
  const { getByTestId } = render(<ProjectLayout projectKey='test-project' />);

  expect(getByTestId("project-work-type")).toHaveTextContent(
    "Testing & Coding"
  );
});

test("Displays correct text", () => {
  const { getByTestId } = render(<ProjectLayout projectKey='test-project' />);

  expect(getByTestId("project-text")).toContainHTML("<p>Testing my stuff!</p>");
});
