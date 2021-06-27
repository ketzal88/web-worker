import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Animated } from "react-animated-css";

const TheyTrusted = () => {
  const classes = useStyles();
  const [animate, setAnimate] = useState(false);
  const [animate2, setAnimate2] = useState(false);

  return (
    <div className={classes.section} onMouseOver={()=>setAnimate(true)}>
      <div className={classes.container} onMouseOver={()=>setAnimate2(true)}>
        <h1 className={classes.title}>
          Ellos confiaron en nosotros
        </h1>
      </div>
      <Animated
          animationIn="fadeInUp"
          animationInDuration={1000}
          isVisible={animate}
        >
      <div className={classes.containerBrand} >
        <div className={classes.containerLogo}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5fd672c33c9c15ffb9b7698c_modo.svg"
            loading="lazy"
            alt="Modo logo"
            className={classes.logo}
          />
          Core
        </div>
        <div className={classes.containerLogo}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103ba294834a6e5d3b08_BBVA.png"
            loading="lazy"
            alt="BBVA logo"
            className={classes.logo}
          />
          Noline
        </div>
        <div className={classes.containerLogo}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103b14c15b2729a66551_Buenos%20aires.png"
            loading="lazy"
            alt="Buenos Aires logo"
            className={classes.logo}
          />
          Paulo
        </div>
        <div className={classes.containerLogo}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103b7e1ac271245bd4a9_McDonalds.png"
            sizes="('max-width': 479px) 40vw, (max-width: 767px) 23vw, 140px"
            srcset="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103b7e1ac271245bd4a9_McDonalds-p-500.png 500w, https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103b7e1ac271245bd4a9_McDonalds.png 1280w"
            loading="lazy"
            alt="McDonalds logo"
            className={classes.logo}
          />
          Simonetta
        </div>
      </div>
      <div className={classes.containerBrand}>
        <div className={classes.containerLogo}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5fd672c33c9c15ffb9b7698c_modo.svg"
            loading="lazy"
            alt="Modo logo"
            className={classes.logo}
          />
          AAMF
        </div>
        <div className={classes.containerLogo}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103ba294834a6e5d3b08_BBVA.png"
            loading="lazy"
            alt="BBVA logo"
            className={classes.logo}
          />
          Roldan
        </div>
        <div className={classes.containerLogo}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103b14c15b2729a66551_Buenos%20aires.png"
            loading="lazy"
            alt="Buenos Aires logo"
            className={classes.logo}
          />
          Wright
        </div>
        <div className={classes.containerLogo}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103b7e1ac271245bd4a9_McDonalds.png"
            sizes="(max-width: 479px) 40vw, (max-width: 767px) 23vw, 140px"
            srcset="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103b7e1ac271245bd4a9_McDonalds-p-500.png 500w, https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103b7e1ac271245bd4a9_McDonalds.png 1280w"
            loading="lazy"
            alt="McDonalds logo"
            className={classes.logo}
          />
          Gaucho
        </div>
      </div>
      <div className={classes.containerBrand}>
        <div className={classes.containerLogo}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5fd672c33c9c15ffb9b7698c_modo.svg"
            loading="lazy"
            alt="Modo logo"
            className={classes.logo}
          />
          Goytia
        </div>
        <div className={classes.containerLogo}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103ba294834a6e5d3b08_BBVA.png"
            loading="lazy"
            alt="BBVA logo"
            className={classes.logo}
          />
          Draiz
        </div>
        <div className={classes.containerLogo}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103b14c15b2729a66551_Buenos%20aires.png"
            loading="lazy"
            alt="Buenos Aires logo"
            className={classes.logo}
          />
          PDA
        </div>
        <div className={classes.containerLogo}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103b7e1ac271245bd4a9_McDonalds.png"
            sizes="(max-width: 479px) 40vw, (max-width: 767px) 23vw, 140px"
            srcset="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103b7e1ac271245bd4a9_McDonalds-p-500.png 500w, https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e9a103b7e1ac271245bd4a9_McDonalds.png 1280w"
            loading="lazy"
            alt="McDonalds logo"
            className={classes.logo}
          />
          Bakian
        </div>
      </div>
      </Animated>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  section: {
    "max-width": " 1440px",
    margin: "100px auto",
    "padding-top": 0,
    "padding-right": " 60px",
    " padding-left": " 60px",
    "@media (max-width: 767px)": {
      "padding-right": "20px",
      " padding-left": "20px",
    },
  },
  container: {
    display: "flex",
    "margin-top": 0,
    "margin-bottom": 0,
    "flex-direction": "column",
    "align-items": "center",
    "@media (max-width: 767px)": {
      " margin-bottom": "42px",
    },
  },
  title: {
    position: "relative",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    " font-family": "Made tommy personal use",
    "line-height": "35px",
    "font-weight": 500,
    " text-align": "center",
    " margin-top": 0,
    "margin-bottom": 53,
    "font-size": "3rem",
    "@media (max-width: 991px)": {
      "line-height": "2.9rem",
    },
    "@media (max-width: 767px)": {
      "max-width": "80%",
    },
    "@media (max-width: 479px)": {
      "margin-top": "75px",
      "padding-right": 0,
      "padding-left": 0,
    },
  },
  containerBrand: {
    display: "flex",
    "margin-top": 0,
    "margin-bottom": 0,
    "padding-top": 0,
    " padding-bottom": 0,
    "flex-direction": "row",
    "justify-content": "center",
    "@media (max-width: 479px)": {
      display: "grid",
      "margin-bottom": "4px",
      "flex-direction": "row",
      " justify-content": "center",
      "justify-items": "stretch",
      "flex-wrap": "wrap",
      "align-items": "stretch",
      "align-content": "stretch",
      "grid-auto-columns": "1fr",
      "grid-column-gap": "16px",
      "grid-row-gap": "16px",
      "grid-template-columns": "1fr 1fr",
      "grid-template-rows": "auto auto",
    },
  },
  containerLogo: {
    position: "relative",
    display: "flex",
    width: "25%",
    height: "15rem",
    "flex-direction": "row",
    "justify-content": "center",
    "align-items": "center",
    "@media (max-width: 479px)": {
      width: "100%",
      height: "7rem",
      "margin-right": "auto",
      "margin-left": "auto",
    },
  },
  logo: {
    width: "140px",
    "max-width": "100%",
    "@media (max-width: 479px)": {
      width: "119px",
      "margin-right": "auto",
      "margin-left": "auto",
    },
  },
}));
export default TheyTrusted;
