import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  const classes = useStyles();
  return (
    <div className={classes.containerMenu}>
      <nav className={classes.menu}>
        <Animated
          animationIn="fadeInDown"
          animationInDuration={1500}
          isVisible={true}
        >
          <Link to="/projects" className={classes.link}>
            Projects
          </Link>
        </Animated>
        <Animated
          animationIn="fadeInDown"
          animationInDuration={1500}
          isVisible={true}
        >
          <Link to="/services" className={classes.link}>
            Services
          </Link>
        </Animated>
        <Animated
          animationIn="fadeInDown"
          animationInDuration={1500}
          isVisible={true}
        >
          <Link to="/contacto" className={classes.link}>
            Contact us 👋
          </Link>
        </Animated>
      </nav>
    </div>
  );
};
const useStyles = makeStyles({
  containerMenu: {
    position: "absolute",
    overflow: "hidden",
    top: "100%",
    left: 0,
    right: 0,
    width: "100%",
  },
  menu: {
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: "auto",
    " z-index": 10,
    overflow: "hidden",
    "padding-top": "10%",
    "padding-bottom": "10%",
    flexDirection: "column",
    "align-items": "flex-start",
    "background-color": "#ff204e",
  },
  link: {
    position: "relative",
    "vertical-align": "top",
    "text-decoration": "none",
    padding: "20px",
    "text-align": "left",
    "margin-left": "auto",
    "margin-right": "auto",
    display: "block",
    overflow: "hidden",
    transition: ".3s",
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#2d2c2f",
    "font-size": "1.1rem",
    "font-weight": 400,

    "@media  (max-width: 991px)": {
      display: "block",
      "margin-bottom": "38px",
      "background-color": "#ff204e",
      color: "#fff",
      "font-size": "2rem",
      "text-align": "center",
    },
    "@media (max-width: 479px)": {
      width: "100%",
      color: "#fff",
      "text-align": "center",
    },
  },
});
export default DropdownMenu;
//d-flex flex-column justify-content-center align-items-center
