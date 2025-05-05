import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sectionMetadata, updateMetaTags } from "../../constants/metadata";

const ScrollToSection = ({ showContent }) => {
  const location = useLocation();

  useEffect(() => {
    if (!showContent) return;

    const initialSection = sessionStorage.getItem("initialSection");
    const sectionId = initialSection ? initialSection.substring(1) : "";
    sessionStorage.removeItem("initialSection");

    const metadata = sectionMetadata[sectionId] || sectionMetadata.default;
    updateMetaTags(metadata);

    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location, showContent]);

  return null;
};

export default ScrollToSection;
