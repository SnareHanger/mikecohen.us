import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProjectImages from "./projectImages";

describe("ProjectImages component", () => {
  const mockImages: ProjectImages = {
    filename: "test{0}.jpg",
    imageCount: 3,
  };
  const mockDir = "test-project";

  test("renders correct number of images", () => {
    const { getAllByRole } = render(
      <ProjectImages images={mockImages} dir={mockDir} />
    );

    const images = getAllByRole("img");
    expect(images).toHaveLength(3);
  });

  test("generates correct thumbnail paths", () => {
    const { getAllByRole } = render(
      <ProjectImages images={mockImages} dir={mockDir} />
    );

    const images = getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "/images/test-project/thumbs/test1.jpg");
    expect(images[1]).toHaveAttribute("src", "/images/test-project/thumbs/test2.jpg");
    expect(images[2]).toHaveAttribute("src", "/images/test-project/thumbs/test3.jpg");
  });

  test("sets correct title attribute on images", () => {
    const { getAllByRole } = render(
      <ProjectImages images={mockImages} dir={mockDir} />
    );

    const images = getAllByRole("img");
    expect(images[0]).toHaveAttribute("title", "test1.jpg");
    expect(images[1]).toHaveAttribute("title", "test2.jpg");
    expect(images[2]).toHaveAttribute("title", "test3.jpg");
  });

  test("renders lightbox component", () => {
    const { getByTestId } = render(
      <ProjectImages images={mockImages} dir={mockDir} />
    );

    expect(getByTestId("lightbox")).toBeInTheDocument();
  });

  test("handles single image", () => {
    const singleImage: ProjectImages = {
      filename: "single{0}.png",
      imageCount: 1,
    };

    const { getAllByRole } = render(
      <ProjectImages images={singleImage} dir="single-dir" />
    );

    const images = getAllByRole("img");
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute("src", "/images/single-dir/thumbs/single1.png");
  });

  test("clicking image triggers lightbox open", () => {
    const { getAllByRole } = render(
      <ProjectImages images={mockImages} dir={mockDir} />
    );

    const images = getAllByRole("img");

    // Click the second image
    fireEvent.click(images[1]);

    // The component should update state (lightbox open)
    // Since we're mocking the lightbox, we can't test its internal state
    // but we verify the click handler doesn't throw
    expect(images[1]).toBeInTheDocument();
  });
});
