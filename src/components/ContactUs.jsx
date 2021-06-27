import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Animated } from "react-animated-css";

const ContactUs = () => {
  const classes = useStyles();
  const [animate, setAnimate] = useState(false);

  return (
    <div className={classes.container} onMouseOver={()=>setAnimate(true)}>
      <div className={classes.containerHaveIdea}>
        <Animated
          animationIn="fadeInUp"
          animationInDuration={1000}
          isVisible={animate}
        >
          <div className={classes.haveIdea}>Tenés dudas?</div>
        </Animated>
        <Link to="/contacto" className={classes.button}>
          Hablemos
        </Link>
      </div>
      <div className={classes.contactDiv}></div>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    display: "flex",
    overflow: "hidden",
    height: "auto",
    //"max-width": "1440px",
    "margin-right": "auto",
    //"margin-bottom": "72px",
    "margin-left": "auto",
    //"padding-right": "100px",
    //"padding-left": "100px",
    "flex-direction": "row",
    "justify-content": "center",
    "align-items": "center",
    //contacUs
    "max-width": "none",
    "margin-top": 0,
    "margin-bottom": 0,
    "padding-right": 0,
    "padding-left": 0,
    "background-color": "#ff204e",
    "line-height": "20px",
    width: "100%",
  },
  containerHaveIdea: {
    position: "absolute",
    "z-index": 12,
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
  },
  haveIdea: {
    "margin-bottom": "44px",
    "font-family": `'Made tommy personal use', sans-serif`,
    color: "#fff",
    "font-size": "3rem",
    "line-height": "46px",
    "font-weight": 400,
    "text-align": "center",
  },
  button: {
    //button-3
    //position: 'absolute',
    //left: '1%',
    //top: '2%',
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
    //'font-family': `'Made tommy personal use', sans-serif`,
    color: "#fff",
    "font-size": "1.4rem",
    "font-weight": 400,
    //   '&:hover' {
    //     'background-color': 'rgba(255, 255, 255, 0)',
    //     color: '#ff204e'
    // },
    //button-contact-us
    position: "relative",
    left: "auto",
    top: "auto",
    width: "12rem",
    "padding-right": "42px",
    "padding-left": "42px",
    "font-family": `'Made tommy personal use', sans-serif`,
    //button-contact-us footer-button
    "border-width": "2px",
    textDecoration:'none',
    "&:hover": {
      "background-color": "#fff",
      color: "#000",
    },
    "@media (max-width: 991px)": {
      left: "10%",
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
  contactDiv:{
      display: 'flex',
      width: '100%',
      height: '26rem',
      'flex-direction': 'column',
      'justify-content': 'center',
      'align-items': 'center',
      'background-color': 'transparent',
      'background-image': `url("https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e42bf1ac796272f5b301dcc_Textura.svg")`,
      'background-position': `0 0`,
      'background-size': 'cover',
      opacity: .17,
      "@media (max-width: 479px)": {
        'padding-right': '3%',
        'padding-left': '3%'
      },
  }
  
}));
export default ContactUs;
