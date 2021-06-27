import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";

const ContactUs = () => {
  const classes = useStyles();
  return (
    <div className={classes.formComponent}>
      <div className={classes.wrap}>
        <Animated
          animationIn="fadeInUp"
          animationInDuration={1000}
          isVisible={true}
          className={classes.containerNoForm}
        >
          <h1 className={classes.titleForm}>Contanos tu proyecto!</h1>
          <p className={classes.textForm}>
            Y te ayudamos a desarrollarlo!
          </p>
        </Animated>
        <Animated
          animationIn="fadeInUp"
          animationInDuration={1000}
          isVisible={true}
          className={classes.containerForm}
        >
          <div className={classes.containerInput}>
            <label for="senderName" className={classes.label}>
              Mi nombre es
            </label>
            <input
              type="text"
              className={classes.input}
              autocomplete="off"
              maxlength="256"
              name="senderName"
              placeholder="Bruce Wayne"
              id="senderName"
              required=""
            />
          </div>
          <div className={classes.containerInput}>
            <label for="senderEmail" className={classes.label}>
              Mi email es
            </label>
            <input
              type="email"
              className={classes.input}
              autocomplete="off"
              maxlength="256"
              name="senderEmail"
              placeholder="bruce@wayneinc.com"
              id="senderEmail"
              required=""
            />
          </div>
          <div className={classes.containerInput}>
            <label for="subject-2" className={classes.label}>
              Mi empresa es
            </label>
            <input
              type="text"
              className={classes.input}
              autocomplete="off"
              maxlength="256"
              name="subject"
              placeholder="Wayne Inc"
              id="subject-2"
              required=""
            />
          </div>
          <div className={classes.containerInput}>
            <label for="Budget" className={classes.label}>
              Mi presupuesto ronda los
            </label>
            <input
              type="number"
              className={classes.input}
              autocomplete="off"
              maxlength="256"
              name="Budget"
              placeholder="Pesos o U$D"
              id="Budget"
              required=""
            />
          </div>
          <div className={classes.containerInput}>
            <label for="message-5" className={classes.label}>
              Contanos un poquito más!
            </label>
            <textarea
              placeholder="No tengas miedo en escribir! Todo es un comienzo"
              maxlength="5000"
              id="message-5"
              name="message"
              className={classes.textarea}
            ></textarea>
          </div>
          <input type="submit" value="A trabajar!" className={classes.submit} />
        </Animated>
      </div>
      <Link to='/' className={classes.backButton}>
        <img src="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5e3dcab63f546205df6fc687_left-arrow.svg" width="26" alt="" class="image-4"></img>
      </Link>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  formComponent: {
    position:'relative',
    display: "flex",
    overflow: "hidden",
    width: "100vw",
    height: "100vh",
    "padding-right": "5%",
    "padding-left": "5%",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
    "@media (max-width: 767px)": {
      height: "auto",
      "padding-top": "50px",
      "padding-bottom": "75px",
    },
  },
  wrap: {
    position: "relative",
    top: "33px",
    "z-index": 1,
    display: "flex",
    width: "100%",
    "max-width": "1150px",
    padding: "30px",
    "flex-direction": "row",
    "justify-content": "space-between",
    "align-items": "stretch",
    flex: "0 auto",
    "@media (max-width: 991px)": {
      "justify-content": "flex-end",
    },
    "@media (max-width: 767px)": {
      "flex-direction": "column",
      "justify-content": "space-between",
      "align-items": "center",
    },
    "@media (max-width: 479px)": {
      "padding-right": 0,
      "padding-left": 0,
    },
  },
  containerNoForm: {
    width: "45%",
    position: "relative",
    "z-index": 50,
    "min-height": "630px",
    padding: "30px 50px",
    "border-radius": "10px",
    "background-color": "#fff",
    "padding-left": 0,
    "@media (max-width: 991px)": {
      width: "60%",
    },
    "@media (max-width: 767px)": {
      width: "80%",
      "margin-top": "-100px",
    },
    "@media (max-width: 479px)": {
      width: "100%",
      "margin-top": 0,
      padding: "30px",
      height: "auto",
      "min-height": "auto",
      "padding-top": 0,
      "padding-right": 0,
      "padding-bottom": 0,
    },
  },
  containerForm: {
    position: "relative",
    "z-index": 50,
    " min-height": "630px",
    padding: "30px 50px",
    "border-radius": "10px",
    "background-color": "#fff",
    bottom: 0,
    width: "70%",
    "padding-top": "55px",
    direction: "ltr",
    "@media (max-width: 991px)": {
      width: "100%",
      "padding-right": 0,
      "padding-left": 0,
    },
    "@media (max-width: 767px)": {
      width: "80%",
      "margin-top": "-100px",
    },
    "@media (max-width: 479px)": {
      width: "100%",
      "margin-top": 0,
      padding: "30px",
      "min-height": "500px",
    },
  },
  titleForm: {
    "margin-top": 0,
    "margin-bottom": "25px",
    "font-family": `'Made tommy personal use', sans-serif`,
    "font-size": "52px",
    "line-height": "3.5rem",
    "font-weight": 500,
    "@media (max-width: 479px)": {
      "font-size": "3rem",
    },
  },
  textForm: {
    "font-family": `'Made tommy personal use', sans-serif`,
    "font-size": "1.4rem",
    "line-height": "1.9rem",
    "font-weight": 400,
    "@media (max-width: 479px)": {
      "line-height": "26px",
    },
  },
  containerInput: {
    position: "relative",
    "margin-bottom": "7px",
    "padding-top": "10px",
    "padding-bottom": "10px",
  },
  label: {
    position: "absolute",
    left: "-17px",
    top: "-1px",
    "z-index": 10,
    display: "inline-block",
    "margin-top": "-9px",
    "margin-left": "10px",
    padding: "1px 10px",
    "background-color": "#fff",
    "font-family": `'Made tommy personal use', sans-serif`,
    "font-size": ".9rem",
    "line-height": "14px",
    "font-weight": 500,
  },
  input: {
    position: "relative",
    "z-index": 1,
    width: "100%",
    height: "50px",
    "padding-top": "11px",
    border: "0 solid #dcdcdd",
    "background-color": "#eef0f5",
    "font-family": `'Made tommy personal use', sans-serif`,
    color: "#373737",
    "font-size": "1.1rem",
    "font-weight": 400,
    padding: "8px 12px",
    "margin-bottom": "10px",
    "line-height": 1.42857143,
    "vertical-align": "middle",
    "&:active": {
      "border-color": "#ff204e",
    },
    "&:focus": {
      "border-color": "#ff204e",
      color: "#1a1818",
    },
    "&::placeholder": {
      color: "#bebebe",
      "font-weight": 400,
    },
  },
  textarea: {
    overflow: "auto",
    font: "inherit",
    margin: 0,
    width: "100%",
    height: "auto",
    border: "0 solid #dcdcdd",
    "background-color": "#eef0f5",
    "font-family": `'Made tommy personal use', sans-serif`,
    color: "#373737",
    "font-size": "1.1rem",
    "font-weight": 400,
    padding: "8px 12px",
    "&:focus": {
      "border-color": "#ff204e",
    },
    "&::placeholder": {
      color: "#bebebe",
    },
  },
  submit: {
    width: "100%",
    height: "auto",
    "min-width": "210px",
    "margin-top": "-1px",
    padding: "18px 40px",
    "border-radius": 0,
    "background-color": "#ff2462",
    transition: "filter .2s",
    "font-family": `'Made tommy personal use', sans-serif`,
    color: "#fff",
    "font-size": "1.2rem",
    "line-height": "20px",
    "font-weight": 500,
    "letter-spacing": 0,
    border: "0 solid #dcdcdd",
    "&:hover": {
      filter: "brightness(96%)",
    },
  },
  backButton:{
    position:'absolute',
    top:25,
    left:25,
    height:'4rem',
    width:'4rem'

  }
}));

export default ContactUs;
