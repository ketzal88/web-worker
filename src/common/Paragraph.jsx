import React from "react";
import { makeStyles } from "@material-ui/styles";
const Paragraph = (props) => {
  const { children } = props;
  const classes = useStyles();
  return <p className={classes.text}>{children}</p>;
};
const useStyles = makeStyles(() => ({
  text: {
    'margin-bottom': 54,
    'font-family': `'Space Grotesk', sans-serif`,
    'font-size': '1.3rem',
    'line-height': '35px',
    'font-weight': 400,
    "@media (max-width: 991px)": {
        'font-size': '1.5rem',
        'line-height': '2.1rem'
    },
    "@media (max-width: 479px)": {
        'font-size': '1.1rem',
        'line-height': '1.9rem',
        'font-weight': 400
    },
  },
}));
export default Paragraph;

