import React from "react";
import { render, screen } from "@testing-library/react";
import ProjectLayout from "../components/projectLayout";
import { resetLightboxProps, lastLightboxProps } from "../../__mocks__/lightbox.mock";

describe("Project Page Integration", () => {
  beforeEach(() => {
    resetLightboxProps();
  });

  describe("Image-only project (test-project)", () => {
    test("displays project title and work type", () => {
      render(<ProjectLayout projectKey="test-project" />);

      expect(screen.getByTestId("project-title")).toHaveTextContent("Test Project");
      expect(screen.getByTestId("project-work-type")).toHaveTextContent("Testing & Coding");
    });

    test("displays project body content", () => {
      render(<ProjectLayout projectKey="test-project" />);

      expect(screen.getByTestId("project-text")).toContainHTML("<p>Testing my stuff</p>");
    });

    test("renders image thumbnails", () => {
      render(<ProjectLayout projectKey="test-project" />);

      // 7 images from mock projects.json
      const images = screen.getAllByRole("img");
      expect(images.length).toBe(7);
    });

    test("does not render video link", () => {
      render(<ProjectLayout projectKey="test-project" />);

      // No video links should exist
      const videoLinks = screen.queryAllByTitle(/https?:\/\/vimeo\.com/);
      expect(videoLinks).toHaveLength(0);
    });

    test("initializes lightbox with correct slides", () => {
      render(<ProjectLayout projectKey="test-project" />);

      expect(lastLightboxProps.slides).toHaveLength(7);
      expect(lastLightboxProps.slides[0].src).toBe("/images/testing/testing1.jpg");
    });
  });

  describe("Video-only project (video-project)", () => {
    test("displays project title and work type", () => {
      render(<ProjectLayout projectKey="video-project" />);

      expect(screen.getByTestId("project-title")).toHaveTextContent("Video Only Project");
      expect(screen.getByTestId("project-work-type")).toHaveTextContent("Video Production");
    });

    test("displays project body content", () => {
      render(<ProjectLayout projectKey="video-project" />);

      expect(screen.getByTestId("project-text")).toContainHTML("<p>A project with only video</p>");
    });

    test("renders video thumbnail with link", () => {
      render(<ProjectLayout projectKey="video-project" />);

      const videoLink = screen.getByTitle("https://vimeo.com/123456");
      expect(videoLink).toHaveAttribute("href", "https://vimeo.com/123456");
    });

    test("video thumbnail has correct image source", () => {
      render(<ProjectLayout projectKey="video-project" />);

      const videoThumb = screen.getByTitle("video_thumb.jpg");
      expect(videoThumb).toHaveAttribute(
        "src",
        "/images/videoproject/thumbs/video_thumb.jpg"
      );
    });

    test("does not initialize lightbox (no images)", () => {
      render(<ProjectLayout projectKey="video-project" />);

      // Lightbox should not be initialized since there are no images
      expect(lastLightboxProps).toBeNull();
    });
  });

  describe("Mixed media project (mixed-project)", () => {
    test("displays project title and work type", () => {
      render(<ProjectLayout projectKey="mixed-project" />);

      expect(screen.getByTestId("project-title")).toHaveTextContent("Mixed Media Project");
      expect(screen.getByTestId("project-work-type")).toHaveTextContent("Mixed Media");
    });

    test("displays project body with HTML links", () => {
      render(<ProjectLayout projectKey="mixed-project" />);

      const projectText = screen.getByTestId("project-text");
      expect(projectText).toContainHTML('<a href="https://example.com">video</a>');
    });

    test("renders both video link and image thumbnails", () => {
      render(<ProjectLayout projectKey="mixed-project" />);

      // Video link
      const videoLink = screen.getByTitle("https://vimeo.com/789012");
      expect(videoLink).toBeInTheDocument();

      // Image thumbnails (3 images + 1 video thumb = 4 total img elements)
      const images = screen.getAllByRole("img");
      expect(images.length).toBe(4);
    });

    test("initializes lightbox with image slides only", () => {
      render(<ProjectLayout projectKey="mixed-project" />);

      // Should have 3 slides for the images
      expect(lastLightboxProps.slides).toHaveLength(3);
      expect(lastLightboxProps.slides[0].src).toBe("/images/mixedproject/mixed1.png");
    });

    test("video appears before images in DOM order", () => {
      const { container } = render(<ProjectLayout projectKey="mixed-project" />);

      const allImages = container.querySelectorAll("img");
      // First image should be the video thumbnail
      expect(allImages[0]).toHaveAttribute("title", "mixed_vid.jpg");
    });
  });

  describe("Project content rendering", () => {
    test("HTML in body is properly rendered", () => {
      render(<ProjectLayout projectKey="mixed-project" />);

      const projectText = screen.getByTestId("project-text");
      const link = projectText.querySelector("a");
      expect(link).toHaveAttribute("href", "https://example.com");
      expect(link).toHaveTextContent("video");
    });

    test("project layout structure is consistent", () => {
      render(<ProjectLayout projectKey="test-project" />);

      // Should have header (banner role from Layout)
      expect(screen.getByRole("banner")).toBeInTheDocument();

      // Should have main content area
      expect(screen.getByRole("main")).toBeInTheDocument();

      // Should have project info sections
      expect(screen.getByTestId("project-title")).toBeInTheDocument();
      expect(screen.getByTestId("project-work-type")).toBeInTheDocument();
      expect(screen.getByTestId("project-text")).toBeInTheDocument();
    });
  });
});
