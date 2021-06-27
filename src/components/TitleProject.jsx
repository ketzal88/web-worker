import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Animated } from "react-animated-css";

const TilteProject = () => {
  const classes = useStyles();
  const [animate, setAnimate] = useState(false);
  return (
    <>
      <div className={classes.container} onMouseOver={() => setAnimate(true)}>
        <div className={classes.containerHero}>
          <Animated
            animationIn="fadeInUp"
            animationInDuration={1000}
            isVisible={animate}
            className={classes.titleCont}
          >
            <h1 className={classes.bitTitle}>
              Changing the rules in a competitive fintech ecosystem
            </h1>
          </Animated>
          <Animated
            animationIn="fadeInUp"
            animationInDuration={1000}
            isVisible={animate}
            className={classes.titleCont2}
          >
            <h1 className={classes.smallTitle}>
              MODO is the union between all the private and public Argentinian
              banks
            </h1>
          </Animated>
        </div>
      </div>
    </>
  );
};
const useStyles = makeStyles(() => ({
  container: {
    //section
    position: "relative",
    display: "flex",
    overflow: "hidden",
    height: "240px",
    //"max-width": "1440px",
    "margin-right": "auto",
    //"margin-bottom": "72px",
    "margin-left": "auto",
    //"padding-right": "100px",
    //"padding-left": "100px",
    "flex-direction": "row",
    "justify-content": "center",
    //"align-items": "center",
    //.project-services
    "max-width": "1500px",
    "align-items": "flex-start",
    "margin-top": "110px",
    "margin-bottom": "116px",
    "padding-right": "80px",
    "padding-left": "80px",
    "@media (max-width: 991px)": {
      " margin-bottom": "60px",
      "padding-right": "30px",
      "padding-left": "30px",
      "justify-content": "center",
      "align-items": "flex-start",
    },
    "@media (max-width: 767px)": {
      "justify-content": "space-around",
      "margin-top": "40px",
      "margin-bottom": "26px",
      "padding-right": "20px",
      "padding-left": "20px",
    },
    "@media (max-width: 479px)": {
      "margin-bottom": "40px",
      "padding-right": "30px",
      "padding-left": "30px",
      "flex-direction": "column",
    },
  },
  containerHero: {
    display: "flex",
    height: "auto",
    "max-width": "1440px",
    margin: 0,
    "flex-direction": "row",
    "align-items": "center",
    "@media (max-width: 991px)": {
      "flex-direction": "column",
    },
    "@media (max-width: 767px)": {
      "flex-direction": "column",
    },
    "@media (max-width: 479px)": {
      marginTop: "20px",
      "flex-direction": "column",
    },
  },
  titleCont: {
    display: "flex",
    width: "50%",
    height: "auto",
    "flex-direction": "row",
    "justify-content": "space-between",
    "align-items": "center",
    "@media (max-width: 991px)": {
      width: "100%",
      "padding-top": 0,
      "padding-bottom": 0,
    },
    "@media (max-width: 767px)": {
      width: "100%",
    },
  },
  titleCont2: {
    display: "flex",
    width: "50%",
    height: "auto",
    "padding-left": 0,
    "align-items": "center",
    "@media (max-width: 991px)": {
      width: "100%",
      height: "auto",
      "max-height": "590px",
      "align-items": "flex-start",
    },
    "@media (max-width: 767px)": {
      width: "100%",
    },
    "@media (max-width: 479px)": {
      height: "auto",
    },
  },
  bitTitle: {
    "padding-right": "16px",
    "font-family": `'Made tommy personal use', sans-serif`,
    "font-size": "3.6rem",
    "line-height": "4.5rem",
    "font-weight": 500,
    "@media (max-width: 991px)": {
      "font-size": "45px",
      "line-height": "58px",
    },
    "@media (max-width: 767px)": {
      "font-size": "50px",
      "line-height": "65px",
    },
    "@media (max-width: 479px)": {
      "margin-top": 0,
      "margin-bottom": 0,
      "padding-right": 0,
      "font-size": "36px",
      "line-height": "46px",
    },
  },
  smallTitle: {
    "padding-left": "39px",
    "font-family": `'Space Grotesk', sans-serif`,
    "font-size": "2.2rem",
    "line-height": " 2.9rem",
    "font-weight": 300,
    "@media (max-width: 991px)": {
      "padding-left": 0,
      "font-size": "29px",
    },
    "@media (max-width: 767px)": {
      "font-size": "35px",
      "line-height": "45px",
    },
    "@media (max-width: 479px)": {
      "margin-top": "15px",
      "padding-left": 0,
      "font-size": "1.2rem",
      "line-height": "29px",
    },
  },
}));
export default TilteProject;
