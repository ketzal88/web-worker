import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Animated } from "react-animated-css";
import Paragraph from "../common/Paragraph";
import Title from "../common/Title";

const TextContainer = (props) => {
  const { title, paragraph, data_id } = props;
  const classes = useStyles();

  return (
    <div className={classes.section} id={data_id}>
      <Animated
        animationIn="fadeInUp"
        animationInDuration={1000}
        isVisible={true}
        className={classes.container}
      >
        <Title>{title}</Title>
        {paragraph?.map((text) => {
          return <Paragraph>{text}</Paragraph>;
        })}
      </Animated>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  section: {
    "margin-top": "127px",
    "margin-bottom": "127px",
    "flex-direction": "column",
    "padding-right": "100px",
      "padding-left": "100px",
    "@media (max-width: 767px)": {
      "margin-top": "80px",
      "margin-bottom": "80px",
      "padding-right": "60px",
      "padding-left": "60px",
    },
    "@media (max-width: 479px)": {
      "margin-top": "40px",
      "margin-bottom": "40px",
      "padding-right": "30px",
      "padding-left": "30px",
    },
  },
  container: {
    "margin-bottom": 0,
    "padding-right": "228px",
    "padding-left": "228px",
    "@media (max-width: 991px)": {
      "padding-right": 0,
      "padding-left": 0,
    },
    "@media (max-width: 767px)": {
      "padding-right": 0,
      "padding-left": 0,
    },
  },
}));
export default TextContainer;
