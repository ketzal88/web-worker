import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";


const BannerHeroProject = () => {
  const classes = useStyles();
  return (
    <div className={classes.hero}>
      <Link to="/" className={classes.buttonBack}>
        Atras
      </Link>
      <div className={classes.containerVideo}>
        <div className={classes.video}>
          <ReactPlayer
            url="https://assets.website-files.com/5e3dcab63f5462821f6fc673/604ea59e84f8f82d9d331268_envia-con-modo (1)-transcode.webm"
            playing
            loop
            height="100%"
            width="100%"
          />
        </div>

        <div className="title-project-container">
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5fd672c33c9c15ffb9b7698c_modo.svg"
            loading="lazy"
            alt="Modo logo"
            className="image-144"
          />
          <div className="heading-jumbo _5 new1">
            Replacing cash with digital payments
          </div>
          <Link to="#" className="button-16 button-6-thin w-button">
            <span className="play-icon-video"></span> Watch the complete video
          </Link>
        </div>
      </div>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  hero: {
    position: "relative",
    display: "flex",
    width: "auto",
    height: "100vh",
    "margin-bottom": "69px",
    "justify-content": "center",
    "background-color": "transparent",
    "@media (max-width: 767px)": {
      "margin-bottom": "40px",
    },
    "media (max-width: 479px)": {
      width: "100vw",
      height: "90vh",
      "align-items": "center",
    },
  },
  buttonBack: {
    "line-height": "inherit",
    "text-decoration": "none",
    cursor: "pointer",
    position: "absolute",
    left: "1%",
    top: "2%",
    right: "auto",
    bottom: "auto",
    "z-index": 10,
    display: "flex",
    padding: "19px 23px",
    "justify-content": "center",
    "align-items": "center",
    border: "0 solid #fff",
    "border-radius": 0,
    "background-color": "rgba(56, 152, 236, 0)",
    transition: ".4s",
    "font-family": `'Made tommy personal use', sans-serif`,
    color: "#fff",
    "font-size": "1.4rem",
    "font-weight": 400,
    "@media (max-width: 991px)": {
      left: "5%",
      top: "10%",
    },
    "@media (max-width: 767px)": {
      left: 0,
      top: "1%",
      right: "auto",
      bottom: "auto",
    },
    "@media (max-width: 479px)": {
      left: "5%",
      top: "5%",
      right: "auto",
      bottom: "auto",
      padding: "11px",
      "font-size": "1.2rem",
    },
  },
  containerVideo: {
    position: "relative",
    color: "#fff",
    "margin-bottom": 0,

    height: "100vh",
    "background-color": "rgba(255, 255, 255, 0)",
    display: "flex",
    overflow: "hidden",
    width: "100vw",
    "justify-content": "center",
    "align-items": "center",
    "background-image": "linear-gradient(180deg, rgba(0, 0, 0, 0.34), #030303)",
    "@media (max-width: 991px)": {
      "margin-right": "auto",
      "margin-left": "auto",
    },
    "@media (max-width: 479px)": {
      display: "flex",
      width: "100vw",
      height: "90vh",
      "background-color": "rgba(0, 0, 0, 0.5)",
      position: "relative",
      left: "auto",
      "margin-right": "auto",
      "margin-left": "auto",
      float: "none",
      clear: "none",
    },
  },
  video: {
    position: "absolute",
    height: "100%",
    top: "-100%",
    bottom: "-100%",
    right: "-100%",
    left: "-100%",
    width: "100vw",
    zIndex: -1,
    margin: "auto",
  },
}));

export default BannerHeroProject;
