import React from "react";

// Store the last props passed to Lightbox for integration testing
export let lastLightboxProps: any = null;

const Lightbox = (props: any) => {
  lastLightboxProps = props;
  return (
    <div
      data-testid="lightbox"
      data-open={props.open}
      data-index={props.index}
      data-slides-count={props.slides?.length || 0}
    >
      {props.open && (
        <div data-testid="lightbox-content">
          <button data-testid="lightbox-close" onClick={props.close}>
            Close
          </button>
          {props.slides?.map((slide: any, idx: number) => (
            <img
              key={idx}
              data-testid={`lightbox-slide-${idx}`}
              src={slide.src}
              alt={slide.imageName || `slide-${idx}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const resetLightboxProps = () => {
  lastLightboxProps = null;
};

export default Lightbox;
