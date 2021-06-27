import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";

const BannerHero = () => {
  const classes = useStyles();
  
  const thisYear = new Date().getFullYear()

  return (
    <div className={classes.section}>
      <div className={classes.heroContainer}>
        <div className={classes.containerLeft}>
          <div className={classes.titleTopDiv}>
            <div className={classes.titleTopText}>2020</div>
            <div className={classes.line}></div>
            <div className={classes.titleTopText}>{thisYear}</div>
          </div>
          <Animated
            animationIn="fadeInUp"
            animationInDuration={1500}
            isVisible={true}
          >
            <h1 className={classes.title}>Construimos marcas Digitales</h1>
          </Animated>
          <Animated
            animationIn="fadeInUp"
            animationInDuration={1500}
            isVisible={true}
          >
            <p className={classes.textDescription}>
              En Worker hacemos que las marcas tengan una Presencia 
              Digital en la mente de su Consumidor. Trabajamos 100% en
              campañas de Conversión.
            </p>
          </Animated>

          <div className="d-flex">
            <Link to="/contacto" className={classes.link}>
              Hablemos
            </Link>
          </div>
          <div className={classes.containerSocial}>
            <div className={classes.text}>Algunos de nuestros Trabajos</div>
            <Link
              to="https://dribbble.com/PaisanosDesigners"
              target="_blank"
              className={classes.socialLink}
            >
              
            </Link>
            <Link
              to="https://www.behance.net/paisanoscreando"
              target="_blank"
              className={classes.socialLink}
            >
              <span></span>
            </Link>
            <Link
              to="https://www.instagram.com/paisanos.io/"
              target="_blank"
              className={classes.socialLink}
            >
              
            </Link>
          </div>
        </div>
        <div className={classes.containerRight}>
          <div className={classes.containerImage}>
            <img
              src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5f1094b9dc229c8ff6ab9934_paisanos%20logo.png"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 797.9296875px, 81vw"
              alt="Paisanos Logo"
              className={classes.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  section: {
    position: "relative",
    overflow: "hidden",
    "margin-right": "auto",
    "margin-bottom": "72px",
    "margin-left": "auto",
    "padding-right": "100px",
    "padding-left": "100px",
    "align-items": "center",
    display: "flex",
    height: "100vh",
    "max-width": "none",
    margin: "0 auto",
    padding: "0 60px 1%",
    "flex-direction": "column",
    "justify-content": "center",
    "@media (max-width: 991px)": {
      width: "100%",
      height: "100%",
      "padding-right": "41px",
      "padding-left": "41px",
      "flex-direction": "row",
    },
    "@media (max-width: 767px)": {
      "margin-bottom": "40px",
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
  heroContainer: {
    position: "static",
    left: "auto",
    top: "85%",
    right: "auto",
    bottom: "auto",
    "z-index": 10000,
    display: "flex",
    width: "100%",
    height: "100%",
    "max-width": "1440px",
    "margin-right": "auto",
    "margin-left": "auto",
    "padding-bottom": "164px",
    "flex-direction": "row",
    "justify-content": "center",
    "@media (max-width: 991px)": {
      height: "auto",
      "margin-top": "73px",
      "padding-bottom": 0,
      "flex-direction": "column",
    },
    "@media (max-width: 479px)": {
      margin: "40px auto 30px",
    },
  },
  containerLeft: {
    display: "flex",
    width: "60%",
    "flex-direction": "column",
    " justify-content": "center",
    "@media (max-width: 991px)": {
      width: "100%",
      "flex-direction": "column",
    },
  },
  containerRight: {
    display: "flex",
    "justify-content": "center",
    width: "40%",
    "flex-direction": "row",

    "@media (max-width: 991px)": {
      display: "none",
    },
  },
  titleTopDiv: {
    display: "flex",
    "align-items": "center",
  },
  titleTopText: {
    "padding-left": "5px",
    "font-family": `'Space Grotesk', sans-serif`,
    "letter-spacing": "3px",
    "text-transform": "uppercase",
  },
  line: {
    position: "relative",
    "z-index": 9999,
    width: "10rem",
    height: "1px",
    "margin-right": "14px",
    "margin-left": "14px",
    "background-color": "#000",
    "@media  (max-width: 479px)": {
      width: "7rem",
    },
  },
  title: {
    "margin-bottom": "20px",
    "font-family": `'Made tommy personal use', sans-serif`,
    color: "#232222",
    "font-size": "5rem",
    "line-height": "5.5rem",
    "font-weight": 500,
    "@media (max-width: 479px)": {
      "font-size": "2.6rem",
      "line-height": "3.2rem",
    },
    "@media (max-width: 991px)": {
      width: "100%",
    },
  },

  textDescription: {
    width: "auto",
    margin: "0 18% 33px 0",
    padding: 0,
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#101417",
    "font-size": "1.6rem",
    "line-height": "2.4rem",
    "font-weight": 300,
    "text-align": "left",

    "@media (max-width: 991px)": {
      width: "100%",
    },
    "@media (max-width: 479px)": {
      "font-size": "1.4rem",
      "line-height": "1.9rem",
    },
  },
  link: {
    border: 0,
    "line-height": "inherit",
    cursor: "pointer",
    position: "relative",
    "z-index": 9999,
    display: "flex",
    width: "auto",
    height: "3.5rem",
    "margin-left": 0,
    padding: 0,
    "justify-content": "flex-start",
    "align-items": "center",
    "border-radius": 0,
    "background-color": "rgba(255, 32, 78, 0)",
    transition: "350ms",
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#ff204e",
    "font-size": "1.2rem",
    "text-align": "left",
    "letter-spacing": 0,
    "text-decoration": "underline",
    "text-transform": "none",
    "@media (max-width: 479px)": {
      height: "1.7rem",
      "font-size": "1.3rem",
      "text-align": "center",
    },
  },
  text: {
    "margin-right": "14px",
    "margin-left": "8px",
    "align-self": "center",
    "font-family": `'Space Grotesk', sans-serif`,
    "font-size": "1.2rem",
  },
  containerSocial: {
    position: "absolute",
    bottom: "6%",
    display: "flex",
    "align-items": "center",
    "@media (max-width: 991px)": {
      display: "none",
    },

    "@media (max-width: 767px)": {
      display: "none",
    },

    "@media (max-width: 479px)": {
      position: "relative",
      display: "none",
    },
  },
  socialLink: {
    "margin-right": "14px",
    transition: "250ms",
    "font-family": `'Fa brands 400', sans-serif`,
    color: "#252222",
    "font-size": "1.6rem",
    "font-weight": "400",
    "text-decoration": "none",
  },
  containerImage: {
    position: "absolute",
    left: "auto",
    top: "-7%",
    right: 0,
    bottom: "auto",
    "z-index": -1,
    overflow: "hidden",
    width: "70%",
    height: "auto",
    "background-color": "rgba(16, 20, 23, 0)",
    opacity: 0.75,
  },
  image: {
    position: "relative",
    left: "332px",
    top: "-96px",
    overflow: "visible",
    width: " 115%",
    height: "auto",
    "max-width": "none",
    float: "right",
    opacity: 1,
    "text-align": "center",
  },
}));

export default BannerHero;
