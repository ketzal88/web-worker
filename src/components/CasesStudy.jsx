import React from "react";
import CaseStudy from "./CaseStudy";
import { makeStyles } from "@material-ui/styles";

const CasesStudy = (props) => {
  const { newCase } = props;
  const classes = useStyles();
  return (
    <>
      <div className={classes.section}>
        <div className={classes.section2}>
          <div className={classes.caseContainer}>
            {[1, 2, 3].map((index) => {
              return <CaseStudy key={index} newCase={newCase} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
const useStyles = makeStyles(() => ({
  section: {
    display: "flex",
    height: "auto",
    "margin-top": "8%",
    "justify-content": "center",
    "align-items": "center",
    "@media (max-width: 479px)": {
      "margin-top": "10%",
    },
  },
  section2: {
    "max-width": "1440px",
    " margin-right": "auto",
    "margin-left": "auto",
    padding: "110px 60px 88px",
    "padding-top": 0,
  },
  caseContainer: {
    display: "flex",
    justifyContent:'space-between',
    flexWrap:'wrap'
  }
}));
export default CasesStudy;
