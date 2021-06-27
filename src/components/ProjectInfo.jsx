import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Animated } from "react-animated-css";

const ProjectInfo = () => {
  const classes = useStyles();
  const [animate, setAnimate] = useState(false);
  return (
    <>
      <div className={classes.container} onMouseOver={()=>setAnimate(true)}>
        <Animated
          animationIn="fadeInUp"
          animationInDuration={1000}
          isVisible={animate}
          className={classes.projectInfo}
        >
          <h4 className={classes.title}>Platform</h4>
          <div className={classes.infoText}>iOS, Android and Web</div>
        </Animated>
        <Animated
          animationIn="fadeInUp"
          animationInDuration={1000}
          isVisible={animate}
          className={classes.projectInfo}
        >
          <h4 className={classes.title}>Services</h4>
          <div className={classes.infoText}>
            Product design, <br />
            Front-end development
          </div>
        </Animated>
        <Animated
          animationIn="fadeInUp"
          animationInDuration={1000}
          isVisible={animate}
          className={classes.projectInfo}
        >
          <h4 className={classes.title}>Team</h4>
          <div className={classes.infoText}>
            4 Product designers,
            <br />2 Mobile developers, <br />1 Web developer
          </div>
        </Animated>
        <Animated
          animationIn="fadeInUp"
          animationInDuration={1000}
          isVisible={animate}
          className={classes.projectInfo}
        >
          <h4 className={classes.title}>Website</h4>
          <Link
            to="http://modo.com.ar/"
            target="_blank"
            className={classes.infoText + " " + classes.link}
          >
            Visit the website here{" "}
            <i
              class="bi bi-arrow-right-short mx-2"
              style={{ "font-size": "2rem" }}
            ></i>
          </Link>
        </Animated>
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
  projectInfo: {
    display: "flex",
    width: "25%",
    height: "auto",
    " margin-right": 0,
    "margin-left": 0,
    "padding-right": "52px",
    "padding-left": "52px",
    "flex-direction": "column",
    "justify-content": "flex-start",
    "align-items": "flex-start",
    "@media (max-width: 991px)": {
      height: "auto",
      "padding-right": 0,
    },
    "@media (max-width: 767px)": {
      width: "auto",
      "padding-right": "10px",
      "padding-left": "10px",
    },
    "@media (max-width: 479px)": {
      "margin-bottom": "10px",
      "padding-left": 0,
    },
  },
  title: {
    "font-family": `'Made tommy personal use', sans-serif`,
    "font-size": "1.2rem",
    "font-weight": 500,
  },
  infoText: {
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#b7b7b7",
    "font-size": "18px",
    "line-height": "26px",
    "font-weight": 400,
    "@media (max-width: 991px)": {
      "font-size": "14px",
    },
    "@media (max-width: 767px)": {
      "font-size": "14px",
    },
    "@media (max-width: 479px)": {
      "font-size": "1rem",
    },
  },
  link: {
    color: "#ff204e",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      color: "#ff204e",
    },
  },
}));
export default ProjectInfo;

