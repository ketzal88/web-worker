import React from "react";
import { makeStyles } from "@material-ui/styles";

const Title = (props) => {
  const { children } = props;
  const classes = useStyles();
  return <h3 className={classes.title}>{children}</h3>;
};
const useStyles = makeStyles(() => ({
  title: {
    "margin-top": 0,
    "margin-bottom": "16px",
    "font-family": `'Space Grotesk', sans-serif`,
    "font-size": "2rem",
    "line-height": "40px",
    "font-weight": 700,
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
}));
export default Title;
