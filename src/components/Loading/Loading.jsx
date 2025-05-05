import React, { useEffect, useRef, useState } from "react";
import "./loader.css";

const LoadingScreen = ({ onComplete, isDark }) => {
  const buttonRef = useRef(null);
  const screenRef = useRef(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const bgColor = isDark ? "#0d0f12" : "#e2e8f0";
    document.body.style.backgroundColor = bgColor;

    const promptTimer = setTimeout(() => {
      setShowPrompt(true);
    }, 2500);

    return () => {
      clearTimeout(promptTimer);
      document.body.style.cursor = "";
    };
  }, [isDark]);

  const handleButtonPress = () => {
    setShowPrompt(false);
    if (screenRef.current) {
      screenRef.current.classList.add("disappear");
    }
    setTimeout(onComplete, 500);
  };

  return (
    <div
      ref={screenRef}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-dark-cast" : "bg-white-cast"
      }`}
    >
      <div className="relative group">
        <button
          ref={buttonRef}
          className={`relative px-8 py-4 text-lg ${
            isDark ? "bg-white-cast text-black" : "bg-dark-cast text-white"
          } rounded-lg focus:outline-none transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl`}
          onClick={handleButtonPress}
        >
          Войти в мир проектов
          <span className="absolute -right-2 -top-2 h-5 w-5 ripple-effect rounded-full bg-blue-500 opacity-75"></span>
        </button>

        <div
          className={`absolute top-full mt-6 text-center transition-opacity duration-1000 ${
            showPrompt ? "visible" : "invisible"
          } ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          <div className="flex flex-col items-center">
            <svg
              className="h-6 w-6 bouncing-element mb-2 transform rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <span className="text-sm font-light tracking-wider">
              Коснитесь, чтобы начать путешествие
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
