import { useState, useEffect } from "react";
import { sectionMetadata, updateMetaTags } from "../constants/metadata";

const useSectionMetadata = () => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const initialSection = window.location.pathname.substring(1);
    const metadata = sectionMetadata[initialSection] || sectionMetadata.default;
    updateMetaTags(metadata);
    if (!activeSection && window.location.pathname === "/") {
      setActiveSection("about");
    }
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          currentSection = section.id;
        }
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
        const metadata =
          sectionMetadata[currentSection] || sectionMetadata.default;
        updateMetaTags(metadata);

        const initialSection = sessionStorage.getItem("initialSection");
        if (!initialSection) {
          window.history.pushState(null, "", `/${currentSection}`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return { activeSection, setActiveSection };
};

export default useSectionMetadata;
