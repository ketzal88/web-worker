import React from "react";
import { makeStyles } from "@material-ui/styles";
import TestimonialCard from "../common/TestimonialCard";
import TESTIMONIALS from '../data/testimonios'

const TestimonialHome = () => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <h1 className={classes.title}>
        Lo que opinan nuestros clientes
      </h1>
      <div className={classes.container}>

                {TESTIMONIALS.map((testimonio, index) => {
                    return <TestimonialCard testimonio={testimonio} key={index}/>
                })}
        </div>
    </div>
  );
};
const useStyles = makeStyles(() => ({
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
export default TestimonialHome;
