import React from "react";
import { Parallax } from "react-parallax";

const ImageParallax = ({ image }) => {
  return (
    <>
      <Parallax
        bgImage={image}
        strength={-100}
        style={{ width: "auto", height: "100vh" }}
      ></Parallax>
    </>
  );
};

export default ImageParallax;
