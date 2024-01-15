import * as React from "react";
import useImageFilename from "../../utils/useImageFilename.hooks";
import Lightbox from "yet-another-react-lightbox";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import { projectImage } from './projectImage.module.css';

type ProjectImagesProps = {
  dir: string;
  images: ProjectImages;
};

export default function ProjectImages({ images, dir }: ProjectImagesProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const slides = [...Array(images.imageCount).keys()].map((imageNum) => {
        const imageName = useImageFilename({
            filename: images.filename!,
            imageNum: imageNum + 1,
          });
        return {
            src: `/images/${dir}/${imageName}`,
            imageName,
            thumb:`/images/${dir}/thumbs/${imageName}`,
        }
    });

    const setAndOpenLightbox = (index: number) => {
        setIndex(index);
        setIsLightboxOpen(true);
    }

  return (
    <>
      {slides.map(({imageName, thumb}, index) => (
         <img
          key={imageName}
          className={projectImage}
          src={thumb}
          title={imageName}
          onClick={() => setAndOpenLightbox(index)}
        />
      ))}
      <Lightbox
        open={isLightboxOpen} 
        close={() => setIsLightboxOpen(false)}
        index={index}
        slides={slides}
        carousel={{
            finite: true,
            imageFit: 'contain',
            preload: 2,
        }}
        />
    </>
  );
}
