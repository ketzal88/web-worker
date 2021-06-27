import React from "react";
import Header from "../components/Header";
import TitleHero from "../components/TitleHero";
import ImageContainer from "../components/ImageContainer";
import ProductBuildingSection from "../components/ProductBuildingSection";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/styles";

const Services = () => {
  const classes = useStyles();
  return (
    <>
      <Header/>
      <TitleHero />
      <ImageContainer
        containerStyle={classes.containerImage}
        imageStyle={classes.image}
        image="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5f2d94d77b72f2904c0a5ddf_What%20we%20do.png"
      />
      <ProductBuildingSection />
      <Footer />
    </>
  );
};
const useStyles = makeStyles(() => ({
  containerImage: {
    display: "flex",
    width: "100%",
    "max-width": "1440px",
    "margin-top": "49px",
    "margin-right": "auto",
    "margin-left": "auto",
    "flex-direction": "column",
  },
  image: {
    width: "728px",
    "align-self": "center",
    "@media (max-width: 767px)": {
      width: "90vw",
    },
    "@media (max-width: 479px)": {
      width: "90vw",
    },
  },
}));
export default Services;
