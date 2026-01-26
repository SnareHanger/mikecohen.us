import useImageFilename from "./useImageFilename.hooks";

describe("useImageFilename hook", () => {
  test("replaces {0} placeholder with image number", () => {
    const result = useImageFilename({
      filename: "image{0}.jpg",
      imageNum: 1,
    });

    expect(result).toBe("image1.jpg");
  });

  test("handles double-digit image numbers", () => {
    const result = useImageFilename({
      filename: "photo{0}.png",
      imageNum: 12,
    });

    expect(result).toBe("photo12.png");
  });

  test("handles filename with {0} in the middle", () => {
    const result = useImageFilename({
      filename: "project_{0}_thumb.jpg",
      imageNum: 5,
    });

    expect(result).toBe("project_5_thumb.jpg");
  });

  test("returns original filename if no {0} placeholder", () => {
    const result = useImageFilename({
      filename: "static-image.jpg",
      imageNum: 3,
    });

    expect(result).toBe("static-image.jpg");
  });

  test("handles zero as image number", () => {
    const result = useImageFilename({
      filename: "img{0}.webp",
      imageNum: 0,
    });

    expect(result).toBe("img0.webp");
  });
});
