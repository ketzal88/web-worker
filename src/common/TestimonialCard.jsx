import React from "react";
import { makeStyles } from "@material-ui/styles";

const TestimonialCard = (props) => {
  const {description, image, name, job}= props.testimonio
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <p className={classes.testimonial}>
        {description}
      </p>
      <div className={classes.container}>
        <img
          src={image}
          width="61"
          loading="lazy"
          alt=""
          className={classes.image}
        />
        <div className={classes.container2}>
          <div className={classes.name}>{name}</div>
          <div className={classes.job}>{job}</div>
        </div>
      </div>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  card: {
    maxWidth:'30%',
    width:'100%',
    "margin": "20px",
    padding: "38px",
    border: "2px solid hsla(0, 0%, 84.7%, .36)",
    "border-radius": "6px",
    "box-shadow": " 0 3px 80px 0 rgba(0, 0, 0, .07)",
    opacity: 1,
    transition: ".3s",
    "border-width": "2px",
    "&:hover": { "border-color": "#044bd9" },
    "@media (max-width: 991px)": {
      maxWidth:'40%',
      "margin-bottom": "16px",
    },
    "@media (max-width: 767px)": {
      minWidth:'90%',
      "margin-bottom": "16px",
    },
    "@media (max-width: 479)": {
      minWidth:'90%',
      "padding-right": "17px",
      "padding-left": "17px",
    },
  },
  testimonial: {
    width: "100%",
    height: "auto",
    "margin-bottom": "35px",
    transition: ".3s",
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#090909",
    "font-size": "1.2rem",
    "line-height": "2rem",
    "font-style": "normal",
    "font-weight": 400,
    "@media (max-width: 479)": {
      "font-size": "1.2rem",
    },
  },
  container: {
    display: "flex",
    "flex-direction": "row",
    "justify-content": "flex-start",
    "align-items": "center",
  },
  image: {
    "margin-right": "14px",
    border: "0 solid #044bd9",
    "border-radius": "180px",
  },
  container2: {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "flex-start",
    "text-align": "left",
  },
  name: {
    display: "flex",
    height: "auto",
    "margin-top": "8px",
    "margin-bottom": "4px",
    "align-items": "center",
    "font-family": `Testnational2compressed, sans-serif`,
    "font-size": "1.9rem",
    "line-height": "32px",
    "font-weight": 500,
    "text-align": "left",
    "text-transform": "uppercase",
    "@media (max-width: 479)": {
      "font-size": "1.7rem",
    },
  },
  job: {
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#aeaeae",
    "font-size": "1rem",
    "font-weight": 400,
    "text-align": "left",
  },
}));
export default TestimonialCard;
