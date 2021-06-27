import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const BackToHome = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <Link to="/" className={classes.homelink}>
          Back to home<i class="bi bi-house-fill mx-2"></i>
        </Link>
      </div>
    </>
  );
};
const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    display: "flex",
    overflow: "hidden",
    height: "240px",
    //"max-width": "1440px",
    "margin-right": "auto",
    //"margin-bottom": "72px",
    "margin-left": "auto",
    "padding-right": "100px",
    "padding-left": "100px",
    //"flex-direction": "row",
    "justify-content": "center",
    "align-items": "center",
    //backtohome
    width: "100%",
    "max-width": "none",
    " margin-right": 0,
    "margin-bottom": 0,
    " margin-left": 0,
    "flex-direction": "column",
    "background-color": "#df1a42",
  },
  homelink: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    transition: ".4s",
    "font-family": "Quicksand",
    color: "#fff",
    "font-size": "1.3rem",
    "text-decoration": "none",
    "&:hover": {
      color: "#fd4168",
    },
  },
  textSpan11: {
    'margin-left': '10px',
    'font-family': 'Fa solid 900', 
}
}));

export default BackToHome;
