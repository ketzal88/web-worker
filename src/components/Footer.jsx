import React from "react";
import { makeStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footerNewSection}>
      <div className={classes.layaoutGrid}>
        <div className={classes.gridFooter}>
          <div className="new-footer-div footer-div-logo">
            <img
              src="../assets/img/logo-white.png"
              alt=""
              className={classes.image}
            />
            {/* <div className={classes.footerText}>Paisanos</div> */}
          </div>
          <div className="new-footer-div">
            <div className={classes.footerText}>
              {/* <NavLink
                to="https://www.behance.net/paisanoscreando"
                target="_blank"
                className={classes.iconLink}
              >
                <span className="text-span-13"></span>
              </NavLink>
              <NavLink
                to="https://dribbble.com/PaisanosDesigners"
                target="_blank"
                className={classes.iconLink}
              >
                <span className="text-span-13"></span>
              </NavLink> */}
              <NavLink
                to="https://www.linkedin.com/company/Worker/"
                target="_blank"
                className={classes.iconLink}
              >
                <span className="text-span-13"></span>
              </NavLink>
            </div>
          </div>
        </div>
        {/* <div className="d-flex justify-content-center">
          <div className="d-flex flex-column mx-2">
            <NavLink to="/" aria-current="page" className={classes.footerLink}>
              Home
            </NavLink>
            <NavLink to="/projects" className={classes.footerLink}>
              Projects
            </NavLink>
            <NavLink to="/services" className={classes.footerLink}>
              Services
            </NavLink>
          </div>
          <div className="d-flex flex-column">
            <NavLink to="/culture" className={classes.footerLink}>
              Culture
            </NavLink>
            <NavLink to="/contacto" className={classes.footerLink}>
              Contact us
            </NavLink>
            <NavLink
              to="https://assets.website-files.com/5e3dcab63f5462821f6fc673/5fbd4dd75822f803f16b3d02_politicadecalidad.pdf"
              target="_blank"
              className={classes.footerLink}
            >
              Quality policies
            </NavLink>
          </div>
        </div> */}
        <div className={classes.gridFooter}>
          <div className="city-name-footer">Buenos Aires, Argentina</div>
          {/* <p className="adress-footer">
            Gral. Enrique Martínez 525,&nbsp;Colegiales
          </p> */}
        </div>
        {/* <div className={classes.gridFooter}>
          <div className="city-name-footer">Perú, Miraflores</div>
          <p className="adress-footer">Avenida General Cordova</p>
        </div> */}
      </div>
    </div>
  );
};
const useStyles = makeStyles(() => ({
  footerNewSection: {
    padding: "62px 60px",
    "background-color": "#131212",
    color: "#131212",
  },
  layaoutGrid: {
    display: "grid",
    "grid-auto-columns": "1fr",
    "grid-template-columns": "1fr 1fr 1fr 1fr",
    "grid-template-rows": "auto auto",
    "grid-row-gap": "16px",
    "grid-column-gap": "16px",
    "@media (max-width: 991px)": {
      " grid-column-gap": "49px",
      "grid-row-gap": "32px",
      "grid-template-columns": "1fr 1fr",
    },
    "@media (max-width: 767px)": {
      "grid-row-gap": "47px",
      "grid-template-columns": "1fr",
    },
  },
  gridFooter: {
    display: "flex",
    "padding-right": "49px",
    "padding-left": "49px",
    "flex-direction": "column",
    "justify-content": "flex-start",
    "align-items": "flex-start",
  },
  image: {
    width: "200px",
    // height: "50px",
    "margin-right": "5px",
  },
  footerText: {
    "font-family": "Space Grotesk",
    color: "#fff",
    "font-size": "1.2rem",
    " font-weight": 400,
  },
  iconLink: {
    "padding-bottom": "3px",
    color: "#7e7777",
    "text-decoration": "none",
    "font-family": "Fa brands 400",
    "&:hover": {
      color: "#ff204e",
    },
  },
  footerLink: {
    position: "static",
    "margin-bottom": "10px",
    transition: "350ms",
    "font-family": "Space Grotesk",
    color: "#fff",
    "font-size": "1.1rem",
    "&:hover": {
      color: "#ff204e",
    },
  },
}));
export default Footer;
