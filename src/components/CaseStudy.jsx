import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const CaseStudy = (props) => {
  const { cas } = props;
  const classes = useStyles();
  
  return (
    <div className={`${classes.section}`}>
      <div className={classes.image}>
        <div className={classes.image2}>
          <Link to={`/projects/${cas.link}`} className={classes.seeCase}>
            Ver Caso
          </Link>
        </div>
      </div>
      <div className={classes.container}>
        <h3>{cas.client}</h3>
        {cas.new && <h3 className={classes.tag}>NEW!</h3>}
      </div>
      <p className={classes.text}>{cas.description}</p>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  section: {
    height: "auto",
    maxWidth: "30%",
    "margin-bottom": "74px",
    marginLeft: "20px",
    marginRight: "20px",
    "@media (max-width: 769px)": {
      "margin-bottom": "35px",
      maxWidth: "40%",
    },
    "@media (max-width: 479px)": {
      "margin-bottom": "35px",
      maxWidth: "100%",
      width: "360px",
    },
  },
  image: {
    height: "36rem",
    "background-image":
      'url("https://assets.website-files.com/5e3dcab63f5462821f6fc673/5fc535e9faebcb6b004bfbb7_modo.png")',
    "background-position": "50% 50%",
    "background-size": "cover",
  },
  image2: {
    display: "flex",
    zIndex: 1,
    width: "100%",
    height: "100%",
    "justify-content": "center",
    "align-items": "center",
    opacity: 0,
    transition: ".3s",
    "&:hover": {
      opacity: 1,
      "background-color": "rgba(0, 0, 0, .48)",
    },
  },
  seeCase: {
    display: "flex",
    zIndex: 10,
    padding: "16px 17px 13px",
    "flex-direction": "row",
    "justify-content": "center",
    " align-items": "center",
    "align-self": "center",
    border: "1px solid #fff",
    color: " #fff",
    "border-radius": 0,
    "background-color": "rgba(56, 152, 236, 0)",
    "font-family": "Ttcommons",
    "text-align": "center",
    textDecoration: "none",
    "text-transform": "none",
    "&:hover": {
      "background-color": "#fff",
      color: " #000",
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  tag: {
    display: "flex",
    "margin-top": "8px",
    "margin-bottom": 0,
    "margin-left": "10px",
    padding: "0 8px",
    "justify-content": "center",
    "align-items": "center",
    border: "1px solid rgba(255, 32, 78, .34)",
    "border-radius": "6px",
    "background-color": "#ffecec",
    "font-family": "Made tommy personal use",
    color: "#ff4269",
    "font-size": "12px",
    "line-height": "23px",
    "font-weight": 500,
  },
  text: {
    "font-family": "Space Grotesk",
    color: "#8b98a2",
    "font-size": " 1.2rem",
    "line-height": "1.8rem",
    "font-weight": 300,
    "text-align": "left",
  },
}));
export default CaseStudy;
