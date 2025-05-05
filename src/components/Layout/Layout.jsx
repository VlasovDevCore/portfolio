import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";

const Layout = ({ isDark, toggleTheme, activeSection, showContent }) => {
  return (
    <>
      <Sidebar
        isDark={isDark}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />
      <Content showContent={showContent} />
    </>
  );
};

export default Layout;
