import React from "react";
import { Animated } from "react-animated-css";

const ImageContainer = ({ containerStyle, imageStyle, image }) => {

  return (
    <Animated
      animationIn="fadeInUp"
      animationInDuration={3000}
      isVisible={true}
      className={containerStyle}
    >
      <img
        src={image}
        alt=""
        className={imageStyle}
      />
    </Animated>
  );
};

export default ImageContainer;
