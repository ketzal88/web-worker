import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const ProductBuildingSection = () => {
  const classes = useStyles();

  return (
    <div className={classes.sectionBuilding}>
      <div className={classes.column}>
        <div className={classes.serviceDiv}>
          <div className={classes.numberTitle}>01</div>
          <h3 className={classes.bitTitle}>
            PRODUCT
            <br />
            THINKING
          </h3>
          <p className={classes.bottomTitle}>
            We help our clients to define the digital product that fits with the
            business problem they want to solve (MVP definition).
          </p>
          <div className={classes.containerText}>
            <p className={classes.text}>Research</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>Proto-users definition</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>Tech definition</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>User flow</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>Wireframes (paper first)</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>Mockups (low fidelity)</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>Branding</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>UX/UI Design (high fidelity)</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>Prototyping &amp;&nbsp;Testing</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>Product backlog &amp; roadmap</p>
          </div>
        </div>
        <Link to="/contacto" className={classes.link}>
          HIRE
        </Link>
      </div>
      <div className={classes.column}>
        <div className={classes.serviceDiv}>
          <div className={classes.numberTitle}>02</div>
          <h3 className={classes.bitTitle}>
            PRODUCT
            <br />
            BUILDING
          </h3>
          <p className={classes.bottomTitle}>
            We give life to your product! It doesn't matter if it's a
            Web&nbsp;App, Mobile App, Website or other kind of product
          </p>
          <div className={classes.containerText}>
            <p className={classes.text}>Mobile Apps</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>Web Apps</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>Websites</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>Others</p>
          </div>
        </div>
        <Link to="/contacto" className={classes.link}>
          HIRE
        </Link>
      </div>
      <div className={classes.column}>
        <div className={classes.serviceDiv}>
          <div className={classes.numberTitle}>03</div>
          <h3 className={classes.bitTitle}>
            PRODUCT
            <br />
            IMPROVEMENT
          </h3>
          <p className={classes.bottomTitle}>
            If you already have a product but want to improve it, we are the
            guys for the job.
          </p>
          <div className={classes.containerText}>
            <p className={classes.text}>Product consulting</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>Usability testing</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>UX/UI&nbsp;Design</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>FrontEnd development</p>
          </div>
          <div className={classes.containerText}>
            <p className={classes.text}>BackEnd development</p>
          </div>
        </div>
        <Link to="/contacto" className={classes.link}>
          HIRE
        </Link>
      </div>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  sectionBuilding: {
    display: "flex",
    height: "auto",
    "margin-top": "123px",
    "margin-bottom": 0,
    "padding-right": 0,
    "padding-left": 0,
    "align-items": "flex-start",
    border: "0 solid #131111",
    "border-radius": 0,
    "background-color": "#131212",
    "@media (max-width: 991px)": {
      "flex-direction": "column",
    },
    "@media (max-width: 479px)": {
      "margin-top": "67px",
    },
  },
  column: {
    display: "flex",
    width: "33.3%",
    height: "auto",
    "max-width": "1440px",
    margin: "0 auto 82px",
    "padding-top": 0,
    "padding-bottom": 0,
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
    transition: "350ms",
    "&:hover": {
      border: "0 solid #1f1f1f",
      "background-color": "#1f1e1e",
      "box-shadow": "0 0 50px -10px rgba(0, 0, 0, .63)",
    },
    "@media (max-width: 991px)": {
      width: "100%",
    },
  },
  serviceDiv: {
    display: "flex",
    "margin-top": "88px",
    "margin-bottom": "88px",
    "padding-top": 0,
    "padding-right": 0,
    "padding-left": 0,
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
  },
  numberTitle: {
    "font-family": `'Made tommy personal use', sans-serif`,
    color: "#fff",
    "font-size": "2rem",
    "font-weight": 400,
  },
  bitTitle:{
    'margin-top': '34px',
    'margin-bottom': '34px',
    'font-family': `'Made tommy personal use', sans-serif`,
    color: '#fff',
    'font-size': '2.8rem',
    'line-height': '3rem',
    'text-align': 'center'
  },
  bottomTitle:{
    height: '7rem',
    'padding-right': '48px',
    'padding-left': '48px',
    'font-family': `'Made tommy personal use', sans-serif`,
    color: '#fff',
    'font-size': '1.1rem',
    'line-height': '1.9rem',
    'font-weight': 300,
    'text-align': 'center',
    "@media (max-width: 991px)": {
      'padding-right': '227px',
      'padding-left': '227px'
    },
    "@media (max-width: 767px)": {
      height: 'auto',
        'padding-right': '108px',
        'padding-left': '108px'
    },
    "@media (max-width: 479px)": {
      'padding-right': '26px',
        'padding-left': '26px'
    },
  },
  containerText:{
    display: 'flex',
    width: '70%',
    padding: '27px 32px',
    'justify-content': 'center',
    'align-items': 'center',
    'border-top': '0 solid #575757',
    'border-bottom': '2px solid rgba(87, 87, 87, .23)'
  },
  text:{
    'margin-bottom': 0,
    'margin-left': 0,
    'font-family': `'Made tommy personal use', sans-serif`,
    color: '#575757',
    'font-size': '1rem',
    'text-align': 'center',
    'text-transform': 'uppercase',
    "@media (max-width: 479px)": {
      'margin-left': 0,
      'text-align': 'center'
    },
  },
  link:{
    padding: '9px 15px',
    color: '#fff',
    border: 0,
    'line-height': 'inherit',
    'text-decoration': 'none',
    cursor: 'pointer',
    'border-radius': 0,
    display: 'flex',
    width: '9rem',
    'margin-right': 0,
    'margin-left': 0,
    marginBottom: 25,
    'padding-top': '13px',
    'padding-bottom': '13px',
    'justify-content': 'center',
    'align-items': 'center',
    'background-color': '#ff204e',
    '&:hover':{
      color: '#fff !important',
    }

  }
}));
export default ProductBuildingSection;
