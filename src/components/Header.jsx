import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Animated } from "react-animated-css";
import { NavLink, Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const [isTrue, setIsTrue] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const hover = (e) => {
    setIsTrue(e.type === "mouseover" ? true : false);
  };

  const logo = "../assets/logos/logo worker.png"

  return (
    <div className={classes.containerNav}>
      <div className={classes.container}>
        <Link
          to="/"
          className={classes.brand}
          onMouseOver={(e) => hover(e)}
          onMouseOut={(e) => hover(e)}
        >
          <img
            src={logo}
            alt=""
            className={classes.logo}
          />
        </Link>
        <Animated
          animationIn="fadeInUp"
          animationInDuration={1500}
          isVisible={isTrue}
          className={classes.tooltipDiv}
        >
          <div className={classes.textTooltip}>Worker</div>
        </Animated>
        <nav role="navigation" className={classes.containerMenu}>
          <Animated
            animationIn="fadeInDown"
            animationInDuration={1500}
            isVisible={true}
            className={classes.containerLink}
          >
            <NavLink to="/projects" className={classes.link}>
              Casos de éxito
            </NavLink>
          </Animated>
          <Animated
            animationIn="fadeInDown"
            animationInDuration={1500}
            isVisible={true}
            className={classes.containerLink}
          >
            <NavLink to="/services" className={classes.link}>
              Servicios
            </NavLink>
          </Animated>
          <Animated
            animationIn="fadeInDown"
            animationInDuration={1500}
            isVisible={true}
            className={classes.containerLink}
          >
            <NavLink to="/contacto" className={classes.link}>
              Contactanos 👋
            </NavLink>
          </Animated>
        </nav>
        <div
          className={classes.buttonMenu}
          role="button"
          onClick={() => setOpen(!open)}
        >
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e3dcab63f5462d2d36fc680_Menu%CC%81.svg"
            width="10"
            alt=""
            className={classes.imageMenu}
          />
        </div>
      </div>
      {open && <DropdownMenu />}
    </div>
  );
};
const useStyles = makeStyles({
  containerNav: {
    background: "#ddd",
    display: "block",
    width: "100%",
    height: "80px",
    "max-width": "none",
    "margin-right": "auto",
    "margin-left": "auto",
    padding: "0px 60px 20px 60px",
    "background-color": "hsla(0,0%,100%,0)",
    "font-family": "Nunito,sans-serif",
    "@media (max-width: 991px)": {
      "padding-right": "18px",
      "padding-left": "18px",
    },
    "media (max-width: 479px)": {
      display: "block",
      width: "100%",
      "margin-bottom": 0,
      "padding-right": 0,
      "padding-left": 0,
    },
  },
  container: {
    position: "relative",
    "margin-left": "auto",
    "margin-right": "auto",
    marginTop: "8px",
    width: " 100%",
    "max-width": "1440px",
    "background-color": "rgba(255, 255, 255, 0)",
    "@media (max-width: 479px)": {
      position: "static",
      display: "flex",
      width: " 100%",
      "max-width": " 100%",
      "margin-right": 0,
      "margin-left": 0,
      "padding-right": "20px",
      "padding-left": "20px",
      clear: "none",
      "flex-direction": "row",
      "justify-content": "space-between",
      "flex-wrap": "nowrap",
      "align-items": "center",
      "grid-auto-columns": "1fr",
      "grid-column-gap": "16px",
      "grid-row-gap": "16px",
      "grid-template-columns": "1fr 1fr",
      "grid-template-rows": "auto auto",
    },
  },
  brand: {
    position: "relative",
    float: "left",
    "text-decoration": "none",
    color: "#333",
    "@media (max-width: 767px)": {
      "padding-left": "10px",
    },
  },
  logo: {
    width: "10rem",
    "margin-right": 0,
    "margin-left": 0,
    "padding-top": "6px",
    "padding-left": 0,
    "font-size": "10px",
    "line-height": "16px",
    "@media (max-width: 479px)": {
      position: "relative",
      left: "auto",
      right: "auto",
      width: " 3.8rem",
      "margin-right": 0,
      float: "none",
      clear: "none",
    },
  },
  tooltipDiv: {
    position: "absolute",
    left: "5.3%",
    top: "20px",
    display: "block",
    "@media (max-width: 479px)": {
      position: "static",
      left: "auto",
      display: "block",
      "font-size": "40px",
    },
  },
  textTooltip: {
    position: "relative",
    left: "-1rem",
    top: 0,
    "padding-left": "5px",
    "font-family": `'Space Grotesk', sans-serif`,
    "font-size": "1.2rem",
    "font-weight": 400,
    "@media (max-width: 991px)": {
      top: 0,
      "margin-top": 0,
      "margin-left": "42px",
    },
    "@media (max-width: 767px)": {
      left: "auto",
      display: "none",
      "margin-right": "20px",
      "margin-left": "20px",
    },
  },
  containerMenu: {
    position: "relative",
    float: "right",
    "@media (max-width: 991px)": {
      display: "none",
    },
  },
  buttonMenu: {
    position: "relative",
    float: "right",
    padding: "18px",
    "font-size": "24px",
    display: "none",
    cursor: "pointer",
    "user-select": "none",
    "&:focus": {
      outline: 0,
    },
    "@media (max-width: 991px)": {
      display: "block",
    },
  },
  imageMenu: {
    width: "2rem",
    "@media (max-width: 991px)": {
      position: "relative",
      zIndex: 10000,
    },
    "@media (max-width: 479px)": {
      position: "relative",
      zIndex: 10000,
    },
  },
  containerLink: {
    overflow: "hidden",
    transition: ".3s",
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#2d2c2f",
    "font-size": "1.1rem",
    "font-weight": 400,
    position: "relative",
    display: "inline-block",
    "vertical-align": "top",
    "text-decoration": "none",
    padding: "20px",
    "text-align": "left",
    "margin-left": "auto",
    "margin-right": "auto",
  },
  link: {
    overflow: "hidden",
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#2d2c2f",
    "font-size": "1.1rem",
    "font-weight": 400,
    textDecoration: "none",
    "&:hover": {
      color: "#ff204e",
    },
  },
});
export default Header;
