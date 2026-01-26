import React from "react";
import { render } from "@testing-library/react";
import Project from "./[projectKey]";

describe("Project page component", () => {
  test("renders ProjectLayout with the correct projectKey", () => {
    const { getByTestId } = render(<Project projectKey="test-project" />);

    // Verify the ProjectLayout renders with the correct project data
    expect(getByTestId("project-title")).toHaveTextContent("Test Project");
  });

  test("passes projectKey prop to ProjectLayout correctly", () => {
    const { getByTestId } = render(<Project projectKey="test-project" />);

    // Verify all project data is passed through correctly
    expect(getByTestId("project-work-type")).toHaveTextContent(
      "Testing & Coding"
    );
    expect(getByTestId("project-text")).toContainHTML("<p>Testing my stuff</p>");
  });

  test("handles invalid projectKey gracefully", () => {
    const { container } = render(<Project projectKey="non-existent-project" />);

    // When project doesn't exist, ProjectLayout returns null
    expect(container.firstChild).toBeNull();
  });
});
