import React from "react";
import { makeStyles } from "@material-ui/styles";
import Header from "../components/Header";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import { Animated } from "react-animated-css";

const Projects = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Animated
        animationIn="fadeInUp"
        animationInDuration={2000}
        isVisible={true}
      >
        <h1 className={classes.text}>
          Take a look at <span className={classes.bold}>our work</span>
        </h1>
      </Animated>
      <ContactUs />
      <Footer />
    </>
  );
};
const useStyles = makeStyles(() => ({
  text: {
    "margin-top": "99px",
    "margin-bottom": 0,
    "font-family": "Made tommy personal use",
    "font-size": "2.9rem",
    "font-weight": 300,
    "text-align": "center",
    "@media (max-width: 479px)": {
      "margin-top": "59px",
      "padding-right": "30px",
      "padding-left": "30px",
      "font-size": "2rem",
      "line-height": "38px",
    },
  },
  bold: {
    "font-weight": 500,
  },
}));

export default Projects;
