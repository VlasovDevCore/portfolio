import React from "react";

const AboutSection = () => {
  return (
    <div className="px-1 py-3 pb-10 text-center text-sm opacity-80 dark:opacity-60 hover:opacity-100 dark:hover:opacity-100 text-dark dark:text-white transition-opacity duration-200">
      <p>
        <a
          href="https://www.figma.com"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Figma
        </a>{" "}
        +{" "}
        <a
          href="https://code.visualstudio.com/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          VS Code
        </a>{" "}
        + пара ночей с{" "}
        <a
          href="https://react.dev/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          React
        </a>{" "}
        — и вот он, проект. Стилизовано на{" "}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          TailwindCSS
        </a>
        .{" "}
        <a
          href="https://sweb.ru/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Spaceweb
        </a>{" "}
        довёл до продакшена. Fira Code — как визитная карточка.
      </p>
    </div>
  );
};

export default AboutSection;
