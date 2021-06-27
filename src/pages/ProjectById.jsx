import React from "react";
import BannerHeroProject from "../components/BannerHeroProject";
import TitleProject from "../components/TitleProject";
import ProjectInfo from "../components/ProjectInfo";
import SectionProjectById from "../components/SectionProjectById";
import TestimonialProjectById from "../components/TestimonialProjectById";
import SomeNumbers from "../components/SomeNumbers";
import ContactUs from "../components/ContactUs";
import BackToHome from "../components/BackToHome";

const ProjectById = () => {
  return (
    <>
      <BannerHeroProject />
      <TitleProject />
      <ProjectInfo/>
      <SectionProjectById/>
      <TestimonialProjectById />
      <SomeNumbers />
      <ContactUs />
      <BackToHome />
    </>
  );
};

export default ProjectById;
