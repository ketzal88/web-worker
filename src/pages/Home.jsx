import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerHero from "../components/BannerHero";
import CasesStudy from "../components/CasesStudy";
import VideoContainer from "../components/VideoContainer";
import TestimonialHome from "../components/TestimonialHome";
import TheyTrusted from "../components/TheyTrusted";
import ContactUs from "../components/ContactUs";

const Home = () => {
  const classes = useStyles();
  const [animate, setAnimate] = useState(false);
  return (
    <>
      <Header />
      <BannerHero/>
      <CasesStudy newCase={false} />
      {/* <CasesStudy newCase={false} /> */}
      {/* <VideoContainer
        setAnimate={setAnimate}
        containerStyle={classes.section}
        url="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e99fc77220e3e338ae3b582_team video-transcode.mp4"
        width='100%'
      >
        <div className={classes.aboutUsContainer}>
          <Animated
            animationIn="fadeInUp"
            animationInDuration={1000}
            isVisible={animate}
          >
            <div className={classes.div1}>
              <h1 className={classes.title1}>ABOUT US</h1>
              <h1 className={classes.title2}>A team chasing perfection</h1>
            </div>
          </Animated>
          <Animated
            animationIn="fadeInUp"
            animationInDuration={1000}
            isVisible={animate}
            animationInDelay={700}
          >
            <div className={classes.div2}>
              <p className={classes.videoText}>
                Since 2012, we’ve helped startups and big companies to design,
                build, and ship amazing products and services.
              </p>
              <Link to="/culture" className={classes.link}>
                Meet our team and culture
              </Link>
            </div>
          </Animated>
        </div>
      </VideoContainer> */}
      <TestimonialHome />
      <TheyTrusted />
      <ContactUs />
      <Footer />
    </>
  );
};
const useStyles = makeStyles(() => ({
  section: {
    "max-width": "none",
    "margin-right": "auto",
    "margin-left": "auto",
    padding: 0,
    position: "relative",
  },
  aboutUsContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    "background-color": "rgba(0, 0, 0, .5)",
    zIndex: 10000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  div1: {
    display: "flex",
    width: "67%",
    margin: "auto",
    "flex-direction": "column",
    "align-items": "center",
    border: "1px solid transparent",
    "@media (max-width: 991px)": {
      width: "100%",
      "margin-bottom": "25px",
    },
    "@media (max-width: 479px)": {
      "margin-bottom": 0,
    },
  },
  div2: {
    display: "flex",
    width: "56%",
    "flex-direction": "column",
    "align-items": "center",
    border: "1px solid transparent",
    "text-align": "center",
    margin: "auto",
    "@media (max-width: 991px)": {
      width: "100%",
    },
  },
  title1: {
    "margin-top": 0,
    "margin-bottom": 0,
    "font-family": `Ttcommons, sans-serif`,
    color: "#9c9b9b",
    "font-size": "1.1rem",
    "font-weight": 400,
    "letter-spacing": "4px",
  },
  title2: {
    "margin-top": "5px",
    "margin-bottom": "20px",
    "font-family": `'Made tommy personal use', sans-serif`,
    color: "#fff",
    "font-size": "4rem",
    "line-height": "4.3rem",
    "font-weight": 500,
    "text-align": "center",
    "text-transform": "uppercase",
    "@media (max-width: 991px)": {
      "margin-top": "10px",
      "margin-bottom": 0,
    },
    "@media (max-width: 479px)": {
      "margin-top": "4px",
      "margin-bottom": "15px",
      "font-size": "1.5rem",
      "line-height": "2.8rem",
    },
  },
  videoText: {
    display: "flex",
    width: "auto",
    "margin-bottom": "8px",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#fff",
    "font-size": "1.4rem",
    "line-height": "2.1rem",
    "font-weight": 300,
    "text-align": "center",
    "@media (max-width: 991px)": {
      "margin-bottom": "15px",
    },
    "@media (max-width: 479px)": {
      "margin-bottom": "20px",
      "padding-right": "20px",
      "padding-left": "20px",
      "font-size": "1rem",
      "line-height": "1.8rem",
      "font-weight": 300,
    },
  },
  link: {
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
    " background-color": "rgba(255, 32, 78, 0)",
    transition: "350ms",
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#ff204e",
    "font-size": "1.2rem",
    "text-align": "left",
    "letter-spacing": 0,
    "text-decoration": "underline",
    "text-transform": "none",
    "&:hover": {
      " background-color": "rgba(255, 32, 78, 0)",
      " box-shadow": "none",
      color: "#bd082e",
    },
    "@media (max-width: 479px)": {
      height: "1.7rem",
      "font-size": "1rem",
      " text-align": "center",
    },
  },
}));
export default Home;
