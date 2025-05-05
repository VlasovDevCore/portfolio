import React, { useEffect, useState } from "react";
import AboutSection from "../DataContent/About/AboutSection";
import SkillsSection from "../DataContent/Skill/SkillsChart";
import ProjectSection from "../DataContent/Project/ProjectSection";
import BlogSection from "../DataContent/Blog/BlogSection";
import FooterSection from "../DataContent/Footer/FooterSection";
import { useLocation, useNavigate } from "react-router-dom";

const Content = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") {
      sessionStorage.setItem("initialSection", location.pathname);
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`${isMobile ? "w-full" : "w-3/5"} px-5 overflow-x-auto`}
      style={{ marginLeft: isMobile ? "0" : "auto" }}
    >
      <AboutSection />
      <SkillsSection />
      <ProjectSection />
      <BlogSection />
      <FooterSection />
    </div>
  );
};

export default Content;
