import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const SomeNumbers = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Some numbers</h1>
      <div className={classes.containerResults}>
        <div className={classes.grid}>
          <div className={classes.numberLine}>
            <div className={classes.bigNumber}>1M</div>
            <p className={classes.text}>
              More than 1.000.000 app downloads in only 3 months
            </p>
          </div>
          <div className={classes.numberLine}>
            <div className={classes.bigNumber}>40</div>
            <p className={classes.text}>
              More than 40 persons from different companies worked on the
              project
            </p>
          </div>
          <div className={classes.number}>
            <div className={classes.bigNumber}>50 K</div>
            <p className={classes.text}>
              More than 50.000 bank accounts linked in only 2 weeks
            </p>
          </div>
        </div>
      </div>
      <div className={classes.containerButton}>
        <Link
          to="https://play.google.com/store/apps/details?id=com.playdigital.modo"
          target="_blank"
          className={classes.link}
        >
          Download on Android
        </Link>
        <Link
          to="https://apps.apple.com/ar/app/modo/id1530606263"
          target="_blank"
          className={classes.link}
        >
          Download on iOS
        </Link>
      </div>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    display: "flex",
    overflow: "hidden",
    height: "auto",
    "max-width": "1440px",
    "margin-right": "auto",
    //"margin-bottom": "72px",
    "margin-left": "auto",
    "padding-right": "100px",
    "padding-left": "100px",
    //"flex-direction": "row",
    "justify-content": "center",
    "align-items": "center",
    //section-modo-2:{
    "margin-bottom": 0,
    "padding-top": "107px",
    "padding-bottom": "107px",
    "flex-direction": "column",
    "@media (max-width: 767px)": {
      "padding-top": "80px",
      "padding-bottom": "80px",
    },
    "@media (max-width: 479px)": {
      padding: "40px 30px",
    },
  },
  title: {
    "margin-top": 0,
    "font-family": `'Space Grotesk', sans-serif`,
    "font-size": "2rem",
    "line-height": "40px",
    "font-weight": 700,
    "margin-bottom": "24px",
    color: "#232020",
    "text-transform": "uppercase",
    "@media (max-width: 991px)": {
      "font-size": "29px",
    },
    "@media (max-width: 767px)": {
      "margin-top": 0,
    },
    "@media (max-width: 479px)": {
      "margin-bottom": "11px",
      "font-size": "27px",
      "line-height": "34px",
    },
  },
  containerResults: {
    width: "100%",
    "margin-top": "61px",
    "margin-bottom": 0,
  },
  grid: {
    display: "grid",
    "grid-auto-columns": "1fr",
    "grid-template-columns": "1fr 1fr 1fr",
    "grid-template-rows": "auto auto",
    "grid-row-gap": "16px",
    "grid-column-gap": "16p",
    "@media (max-width: 991px)": {
      "grid-template-columns": "1fr",
    },
    "@media (max-width: 479px)": {
      "grid-row-gap": "36px",
    },
  },
  numberLine: {
    display: "flex",
    " padding-right": "11px",
    "padding-left": "11px",
    "flex-direction": "column",
    "border-right": "1px solid rgba(0, 0, 0, .16)",
    "@media (max-width: 991px)": {
      "border-right": 0,
    },
  },
  number: {
    display: "flex",
    " padding-right": "11px",
    "padding-left": "11px",
    "flex-direction": "column",
  },
  bigNumber: {
    color: "#ff204e",
    "text-align": "center",
    "margin-bottom": "30px",
    "font-family": `Testnational2compressed, sans-serif`,
    "font-size": "10rem",
    "line-height": "100px",
    "font-weight": 500,
    "letter-spacing": 0,
  },
  text: {
    "padding-right": "32px",
    "padding-left": "32px",
    "font-family": `'Space Grotesk', sans-serif`,
    "font-size": "1.1rem",
    "line-height": "23px",
    "font-weight": 400,
    "text-align": "center",
  },
  containerButton: {
    display: "flex",
    "margin-top": "94px",
    "margin-bottom": "94px",
    "padding-top": "17px",
    "padding-bottom": "17px",
    "justify-content": "center",
  },
  link: {
    position: "static",
    display: "flex",
    height: "52px",
    "min-width": "240px",
    "margin-right": "8px",
    "margin-left": "8px",
    padding: "12px 21px",
    "justify-content": "center",
    "flex-wrap": "nowrap",
    "align-items": "center",
    "border-radius": "4px",
    "background-color": "#ededed",
    transition: "350ms",
    "font-family": `'Space Grotesk', sans-serif`,
    color: "#333",
    "font-size": "1rem",
    border: 0,
    "line-height": "inherit",
    "text-decoration": "none",
    cursor: "pointer",
    "&:hover": {
      "background-color": "#d4d4d4",
      color: "#333 !important",
    },
  },
}));

export default SomeNumbers;
