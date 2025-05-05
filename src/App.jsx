import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ScrollToSection from "./components/ScrollToSection/ScrollToSection";
import Loading from "./components/Loading/Loading";
import useTheme from "./hooks/useTheme";
import useSectionMetadata from "./hooks/useSectionMetadata";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const { isDark, toggleTheme } = useTheme();
  const { activeSection } = useSectionMetadata();

  useEffect(() => {
    if (isLoading || !isContentReady) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isLoading, isContentReady]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading && !isContentReady) {
      setIsContentReady(true);
    }
  }, [isLoading, isContentReady]);

  useEffect(() => {
    if (!isLoading && isContentReady) {
      setShowContent(true);
    }
  }, [isLoading, isContentReady]);

  return (
    <Router>
      <ScrollToSection showContent={showContent} />
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              isDark={isDark}
              toggleTheme={toggleTheme}
              activeSection={activeSection}
              showContent={showContent}
            />
          }
        />
        <Route
          path="/:section"
          element={
            <Layout
              isDark={isDark}
              toggleTheme={toggleTheme}
              activeSection={activeSection}
              showContent={showContent}
            />
          }
        />
      </Routes>
      {(isLoading || !isContentReady) && (
        <Loading isDark={isDark} onComplete={handleLoadingComplete} />
      )}
    </Router>
  );
};

export default App;
