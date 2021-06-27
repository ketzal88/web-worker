import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Animated } from "react-animated-css";
import TextContainer from "./TextContainer";
import ImageContainer from "./ImageContainer";
import ImageParallax from "./ImageParallax";
import VideoContainer from "./VideoContainer";

const SectionProjectById = (props) => {
  const classes = useStyles();
  const [animate, setAnimate] = useState(false);
  const [animate2, setAnimate2] = useState(false);
  return (
    <div className={classes.section}>
      <ImageParallax image="/assets/img/image_1.png" />
      <TextContainer
        title="The challenge"
        paragraph={[
          `MODO approached Paisanos with a significant obstacle, the product launch date was stipulated within 2 months and although the back-end was developed, the product didn't have a designed interface.`,
          `That's why, from Paisanos we assigned a dedicated squad to achieve a product within the highest standards of quality, in a short period of time.`,
        ]}
        data_id={"the_challenge"}
      />
      <ImageContainer
        containerStyle={classes.containerImageModoApp}
        imageStyle={classes.image}
        image="https://assets.website-files.com/5e3dcab63f5462821f6fc673/600ea40b2137ed47088e4b9d_modo%20crop%20compressed.png"
      />
      <TextContainer
        title="1 product, 3 core features"
        paragraph={[
          `We decided to create a design system based on the 3 core features that the product will offer to customers. Send money, ask for money and pay with a QR code. The goal was to create a pattern for each vertical, applied to the product as well as communication.`,
        ]}
        data_id={"one_product"}
      />
      <ImageContainer
        containerStyle={classes.containerImageModoBillboard}
        imageStyle={classes.image2}
        image="https://assets.website-files.com/5e3dcab63f5462821f6fc673/600ea45996d01c59436527a3_Envia%20Pedi%20Paga.png"
      />
      <TextContainer
        title="The chosen one"
        paragraph={[
          `Having selected the proposal, we fixed upon the UI of the product, emphasizing the delivery of a simple and clear interface, but having a unique identity that would allow MODO to stand out over the competition.`,
        ]}
        data_id={"the_chosen"}
      />
      <ImageParallax image="/assets/img/image_2.png" />
      <TextContainer
        title="Atomic design approach"
        paragraph={[
          `In order to make the product scalable for the MODO teams, we developed a design system based on the Atomic Design approach by Brad Frost.`,
        ]}
        data_id={"atomic_design"}
      />
      <div onMouseOver={()=>setAnimate(true)}>
      <Animated
        animationIn="fadeInUp"
        animationInDuration={2000}
        isVisible={animate}
      >
        <VideoContainer
          setAnimate={setAnimate}
          containerStyle={classes.containerVideo}
          url="https://assets.website-files.com/5e3dcab63f5462821f6fc673/600e0d1c794a0f28dfe4e4a1_modo-onboarding-transcode.mp4"
          width="17rem"
        ></VideoContainer>
      </Animated>
      </div>
      <TextContainer
        title="Custom onboarding animations"
        paragraph={[
          `We've also created custom animations in order to give life to product onboarding, transmitting the identity from the start.`,
        ]}
        data_id={"custom_onboarding"}
      />
      <div onMouseOver={()=>setAnimate2(true)}>
      <Animated
        animationIn="fadeInUp"
        animationInDuration={2000}
        isVisible={animate2}
      >
        <VideoContainer
          setAnimate={setAnimate}
          containerStyle={classes.containerVideo}
          url="https://assets.website-files.com/5e3dcab63f5462821f6fc673/600e12209f676600adef664a_RecordIt-A2E4F961-C937-41CA-9172-00261F43A75Dmp4-38301-388470-transcode.mp4"
          width="17rem"
        ></VideoContainer>
      </Animated>
      </div>
      <TextContainer
        title="A 360º payment experience"
        paragraph={[
          `- Vertical, giving a physical frame to the gesture of sending money from one device to another`,
          `- Synchronized with a payment sound made during the development with Papamusic and which is also part of the audio branding of MODO.`,
          `- Including vibrations in the cell phone (for the devices that support it)`,
          `- Handcrafted animations and transitions`,
          `- Graphing the nodes, which are part of MODO's brand and represents the alliance of the Argentinian banks`,
        ]}
        data_id={"a_360"}
      />
    </div>
  );
};
const useStyles = makeStyles(() => ({
  section: {
    position: "static",
  },
  containerImageModoApp: {
    display: "flex",
    width: "100%",
    "max-width": "1440px",
    "margin-top": "49px",
    "margin-right": "auto",
    "margin-left": "auto",
    "flex-direction": "column",
    "padding-top": "50px",
    "padding-bottom": 0,
    "background-color": "#141414",
    "background-image":
      'url("https://assets.website-files.com/5e3dcab63f5462821f6fc673/600dae065f839600dc7f3ff0_Frame%201748.png")',
    "background-position": "50% 50%",
    "background-size": "cover",
  },
  containerImageModoBillboard: {
    display: "flex",
    width: "100%",
    "max-width": "1440px",
    "margin-top": "49px",
    "margin-right": "auto",
    "margin-left": "auto",
    "flex-direction": "column",
    "padding-top": "50px",
  },
  image: {
    width: "728px",
    "align-self": "center",
    "@media (max-width: 767px)": {
      width: "90vw",
    },
    "@media (max-width: 479px)": {
      width: "90vw",
    },
  },
  image2: {
    width: "80%",
    "align-self": "center",
    "@media (max-width: 767px)": {
      width: "90vw",
    },
    "@media (max-width: 479px)": {
      width: "90vw",
    },
  },
  containerVideo: {
    padding: 30,
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  animacion: {
    width: "100%",
    height: 15,
  },
}));
export default SectionProjectById;
