import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import ProjectImages from "../components/projectImages";
import {
  lastLightboxProps,
  resetLightboxProps,
} from "../../__mocks__/lightbox.mock";

describe("Lightbox Integration", () => {
  const mockImages: ProjectImages = {
    filename: "test{0}.jpg",
    imageCount: 3,
  };
  const mockDir = "test-project";

  beforeEach(() => {
    resetLightboxProps();
  });

  describe("slides generation", () => {
    test("generates correct number of slides", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      expect(lastLightboxProps.slides).toHaveLength(3);
    });

    test("generates slides with correct full-size image paths", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      expect(lastLightboxProps.slides[0].src).toBe("/images/test-project/test1.jpg");
      expect(lastLightboxProps.slides[1].src).toBe("/images/test-project/test2.jpg");
      expect(lastLightboxProps.slides[2].src).toBe("/images/test-project/test3.jpg");
    });

    test("includes image names in slides", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      expect(lastLightboxProps.slides[0].imageName).toBe("test1.jpg");
      expect(lastLightboxProps.slides[1].imageName).toBe("test2.jpg");
      expect(lastLightboxProps.slides[2].imageName).toBe("test3.jpg");
    });

    test("includes thumbnail paths in slides", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      expect(lastLightboxProps.slides[0].thumb).toBe("/images/test-project/thumbs/test1.jpg");
      expect(lastLightboxProps.slides[1].thumb).toBe("/images/test-project/thumbs/test2.jpg");
      expect(lastLightboxProps.slides[2].thumb).toBe("/images/test-project/thumbs/test3.jpg");
    });
  });

  describe("lightbox state management", () => {
    test("lightbox is initially closed", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      expect(lastLightboxProps.open).toBe(false);
    });

    test("clicking first image opens lightbox at index 0", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      const images = screen.getAllByRole("img");
      fireEvent.click(images[0]);

      expect(lastLightboxProps.open).toBe(true);
      expect(lastLightboxProps.index).toBe(0);
    });

    test("clicking second image opens lightbox at index 1", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      const images = screen.getAllByRole("img");
      fireEvent.click(images[1]);

      expect(lastLightboxProps.open).toBe(true);
      expect(lastLightboxProps.index).toBe(1);
    });

    test("clicking third image opens lightbox at index 2", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      const images = screen.getAllByRole("img");
      fireEvent.click(images[2]);

      expect(lastLightboxProps.open).toBe(true);
      expect(lastLightboxProps.index).toBe(2);
    });

    test("close callback is provided to lightbox", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      expect(typeof lastLightboxProps.close).toBe("function");
    });

    test("calling close callback closes the lightbox", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      // Open lightbox
      const images = screen.getAllByRole("img");
      fireEvent.click(images[0]);
      expect(lastLightboxProps.open).toBe(true);

      // Close lightbox using act to handle state update
      act(() => {
        lastLightboxProps.close();
      });

      // After close, the lightbox should have open=false
      expect(screen.getByTestId("lightbox")).toHaveAttribute("data-open", "false");
    });
  });

  describe("lightbox carousel configuration", () => {
    test("configures carousel as finite", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      expect(lastLightboxProps.carousel.finite).toBe(true);
    });

    test("configures carousel imageFit as contain", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      expect(lastLightboxProps.carousel.imageFit).toBe("contain");
    });

    test("configures carousel preload to 2", () => {
      render(<ProjectImages images={mockImages} dir={mockDir} />);

      expect(lastLightboxProps.carousel.preload).toBe(2);
    });
  });

  describe("different image configurations", () => {
    test("handles single image project", () => {
      const singleImage: ProjectImages = {
        filename: "solo{0}.png",
        imageCount: 1,
      };

      render(<ProjectImages images={singleImage} dir="solo-project" />);

      expect(lastLightboxProps.slides).toHaveLength(1);
      expect(lastLightboxProps.slides[0].src).toBe("/images/solo-project/solo1.png");
    });

    test("handles many images project", () => {
      const manyImages: ProjectImages = {
        filename: "gallery{0}.webp",
        imageCount: 10,
      };

      render(<ProjectImages images={manyImages} dir="gallery" />);

      expect(lastLightboxProps.slides).toHaveLength(10);
      expect(lastLightboxProps.slides[9].src).toBe("/images/gallery/gallery10.webp");
    });
  });
});
