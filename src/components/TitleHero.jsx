import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Animated } from "react-animated-css";

const TitleHero = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
         <Animated
          animationIn="fadeInUp"
          animationInDuration={3000}
          isVisible={true}
        >
        <div className={classes.titleContainer}>
          <div className={classes.topTitle}>Qué hacemos?</div>
          <h1 className={classes.title}>
            Hacemos que las marcas tengan una presencia digital donde está su Consumidor
          </h1>
        </div>
        </Animated>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    //display: "flex",
    overflow: "hidden",
    //height: "auto",
    //"max-width": "1440px",
    "padding-right": "100px",
    "padding-left": "100px",
    //"flex-direction": "row",
    //"justify-content": "center",
    "align-items": "center",
    //section-hero
    display: "flex",
    "max-width": "none",
    margin: "0 auto",
    padding: "0 60px 1%",
    "flex-direction": "column",
    "justify-content": "center",
    height: "auto",
    "@media (max-width: 991px)": {
      width: "100%",
      height: "100%",
      "padding-right": "41px",
      "padding-left": "41px",
      "flex-direction": "row",
    },
    "@media (max-width: 767px)": {
      "padding-right": "20px",
      "padding-left": "20px",
    },
    "@media (max-width: 479px)": {
      height: "auto",
      "margin-top": 0,
      "margin-bottom": 0,
      "padding-right": "30px",
      "padding-bottom": 0,
      "padding-left": "30px",
    },
  },
  titleContainer: {
    display: "flex",
    overflow: "visible",
    width: "100%",
    "max-width": "1440px",
    "margin-top": "90px",
    "margin-bottom": "90px",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "flex-start",
    "@media (max-width: 991px)": {
      "padding-right": "24px",
      "padding-left": "24px",
    },
    "@media (max-width: 767px)": {
      "padding-right": "20px",
      "padding-left": "20px",
    },
    "@media (max-width: 479px)": {
      "margin-top": "45px",
      "margin-bottom": "45px",
      "padding-right": 0,
      "padding-left": 0,
    },
  },
  topTitle: {
    "margin-bottom": "16px",
    "font-family": `'Made tommy personal use', sans-serif`,
    "font-size": "1rem",
    "font-weight": 400,
  },
  title: {
    width: "100%",
    "max-width": "1440px",
    "margin-top": 0,
    "margin-bottom": 0,
    "font-family": `'Made tommy personal use', sans-serif`,
    color: "#141313",
    "font-size": "4rem",
    "line-height": "70px",
    "font-weight": 400,
    "@media (max-width: 767px)": {
      "font-size": "2.7rem",
      "line-height": "55px",
    },
    "@media (max-width: 479px)": {
      "margin-bottom": 0,
      "font-size": "2rem",
      "line-height": "2.6rem",
    },
  },
}));
export default TitleHero;
