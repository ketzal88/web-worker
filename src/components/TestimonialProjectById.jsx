import React from "react";
import { makeStyles } from "@material-ui/styles";
import TestimonialCard from "../common/TestimonialCard";
import { Link } from "react-router-dom";

const TestimonialProjectById = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.containerTestimonial}>
        <div className={classes.avatarContainer}>
          <img
            src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5fe08d1eec1964156f44d910_Santi.jpeg"
            width="62"
            alt=""
            className={classes.image}
          />
          <div className={classes.avatarBoldtext}>SANTIAGO ECHAZU</div>
          <div className={classes.avatarCenterText}>
            Co-founder CEO - paisanos
          </div>
        </div>
        <p className={classes.text}>
          "The process that we made with MODO's team was the key to get a high
          quality product design"
        </p>
        <Link
          to="https://santiagoechazu.medium.com/paisanos-en-modo-cocina-b9f279c2de38"
          target="_blank"
          className={classes.button}
        >
          Read Medium post
        </Link>
      </div>
      <div className={classes.section}>
        <h1 className={classes.title}>Some words of MODO's team</h1>
        <div className={classes.container}>
          {[1, 2].map(() => {
            return <TestimonialCard />;
          })}
        </div>
      </div>
    </>
  );
};
const useStyles = makeStyles(() => ({
  containerTestimonial: {
    display: "flex",
    "margin-top": 0,
    "margin-bottom": 0,
    padding: "150px 41px 250px",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
    "@media (max-width: 991px)": {
      "padding-top": "104px",
    },
    "@media (max-width: 767px)": {
      "padding-top": "115px",
      "padding-right": 0,
      "padding-left": 0,
    },
    "@media (max-width: 479px)": {
      "padding-top": "52px",
      "padding-bottom": "115px",
    },
  },
  avatarContainer: {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
  },
  image: {
    "margin-right": 0,
    "margin-bottom": "12px",
    "border-radius": "44px",
  },
  avatarBoldtext: {
    "font-weight": 500,
    "text-transform": "uppercase",
    "margin-bottom": "9px",
    "font-family": "Testnational2compressed, sans-serif",
    color: "#000",
    "font-size": "1.9rem",
    "text-align": "center",
  },
  avatarCenterText: {
    "margin-bottom": 0,
    "font-size": ".9rem",
    "font-weight": 500,
    "text-transform": "uppercase",
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#a5a5a5",
    "text-align": "center",
  },
  text: {
    width: "40rem",
    "margin-top": "21px",
    "margin-bottom": "36px",
    "padding-right": 0,
    "padding-left": 0,
    "font-family": `'Space Grotesk', sans-serif`,
    " font-size": "1.6rem",
    "line-height": "2.4rem",
    "text-align": "center",
    "@media (max-width: 767px)": {
      width: "auto",
    },
    "@media (max-width: 479px)": {
      "margin-top": "20px",
      "padding-right": "30px",
      "padding-left": "30px",
      " font-size": "1.2rem",
      "line-height": "1.9rem",
    },
  },
  button: {
    width: "auto",
    padding: "18px 16px",
    "background-color": "#ff204e",
    transition: "350ms",
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#fff",
    "font-size": "1rem",
    "text-align": "center",
    "text-decoration": "none",
    "&:hover": {
      "background-color": "#ec0636",
      color: "#fff",
    },
  },
  section: {
    //testimonial-section
    display: "flex",
    overflow: "hidden",
    height: "auto",
    "min-height": 0,
    "margin-right": "auto",
    "margin-left": "auto",
    //padding: "137px 130px",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
    //'background-color':' #111',
    //testimonial-section-2
    "max-width": "1440px",
    padding: "76px",
    "background-color": "#fff",
    "@media (max-width: 991px)": {
      height: "auto",
      padding: 0,
    },
    "@media (max-width: 767px)": {
      "padding-bottom": "70px",
      "padding-top": "80px",
      "padding-right": 0,
      "padding-left": 0,
    },
    "@media (max-width: 479px)": {
      height: "7%",
      "padding-right": 0,
      "padding-left": 0,
      "justify-content": "center",
      "align-items": "center",
    },
  },
  title: {
    position: "relative",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "font-family": `'Made tommy personal use', sans-serif`,
    "line-height": "35px",
    "font-weight": 500,
    "text-align": "center",
    "margin-top": 0,
    "margin-bottom": 40,
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
  container: {
    display: "flex",
    width: "100%",
    "max-width": "1440px",
    "margin-right": "auto",
    "margin-left": "auto",
    "justify-content": "center",
    "align-items": "center",
    "flex-wrap": "wrap",
    "@media (max-width: 991px)": {
      "padding-right": "30px",
      "padding-left": "30px",
      "justify-content": "space-between",
      "max-width": "80%",
    },

    "@media (max-width: 767px)": {
      "align-items": "center",
      "align-content": "stretch",
    },
    "@media (max-width: 479px)": {
      display: "flex",
      "padding-right": "30px",
      "padding-left": "30px",
      "justify-content": "center",
      "align-items": "center",
      "max-width": "none",
    },
  },
}));
export default TestimonialProjectById;
