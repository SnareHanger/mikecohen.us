import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import ProjectLayout from "../components/projectLayout";

describe("Site Navigation Integration", () => {
  describe("Home page project listing", () => {
    test("renders all projects from projects.json", () => {
      render(<Home />);

      // All three mock projects should be listed
      expect(screen.getByText("Test Project")).toBeInTheDocument();
      expect(screen.getByText("Video Only Project")).toBeInTheDocument();
      expect(screen.getByText("Mixed Media Project")).toBeInTheDocument();
    });

    test("each project has a link to its detail page", () => {
      render(<Home />);

      const testProjectLink = screen.getByText("Test Project").closest("a");
      const videoProjectLink = screen.getByText("Video Only Project").closest("a");
      const mixedProjectLink = screen.getByText("Mixed Media Project").closest("a");

      expect(testProjectLink).toHaveAttribute("href", "projects/test-project");
      expect(videoProjectLink).toHaveAttribute("href", "projects/video-project");
      expect(mixedProjectLink).toHaveAttribute("href", "projects/mixed-project");
    });

    test("project links have nohover class for styling", () => {
      render(<Home />);

      // Only check project links (those that go to projects/), not the header link
      const testProjectLink = screen.getByText("Test Project").closest("a");
      const videoProjectLink = screen.getByText("Video Only Project").closest("a");
      const mixedProjectLink = screen.getByText("Mixed Media Project").closest("a");

      expect(testProjectLink).toHaveClass("nohover");
      expect(videoProjectLink).toHaveClass("nohover");
      expect(mixedProjectLink).toHaveClass("nohover");
    });

    test("each project has a unique container div with project key as id", () => {
      const { container } = render(<Home />);

      expect(container.querySelector("#test-project")).toBeInTheDocument();
      expect(container.querySelector("#video-project")).toBeInTheDocument();
      expect(container.querySelector("#mixed-project")).toBeInTheDocument();
    });
  });

  describe("Layout consistency", () => {
    test("home page uses Layout component with header", () => {
      render(<Home />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByText("Mike Cohen")).toBeInTheDocument();
    });

    test("project page uses Layout component with header", () => {
      render(<ProjectLayout projectKey="test-project" />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByText("Mike Cohen")).toBeInTheDocument();
    });

    test("header links back to home", () => {
      render(<Home />);

      const headerLink = screen.getByRole("banner").querySelector("a");
      expect(headerLink).toHaveAttribute("href", "/");
    });
  });

  describe("Invalid navigation handling", () => {
    test("invalid project key returns null (no crash)", () => {
      const { container } = render(
        <ProjectLayout projectKey="non-existent-project" />
      );

      // Should render nothing (null)
      expect(container.firstChild).toBeNull();
    });

    test("empty project key returns null", () => {
      const { container } = render(<ProjectLayout projectKey="" />);

      expect(container.firstChild).toBeNull();
    });
  });
});
