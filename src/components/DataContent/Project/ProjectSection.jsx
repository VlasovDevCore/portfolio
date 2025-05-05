import React, { useState, useEffect, useCallback } from "react";
import Section from "../../Section/Section";
import parseHighlighting from "../parseHighlighting";
import { ReactComponent as CloseIcon } from "../../../assets/image/icon/close.svg";

const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-4 border-indigo-200 dark:border-indigo-800 rounded-full"></div>
      <div
        className="absolute inset-0 border-4 border-transparent border-t-indigo-500 dark:border-t-indigo-300 rounded-full animate-spin"
        style={{ animationDuration: "1.5s" }}
      />
      <div
        className="absolute inset-2 border-4 border-transparent border-b-indigo-500 dark:border-b-indigo-300 rounded-full animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "2s" }}
      />
    </div>
  </div>
);

const cleanHtmlContent = (html) => {
  if (!html) return "";

  return html
    .replace(/\\n/g, "\n")
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\t/g, "    ")
    .replace(/\\&quot;/g, '"')
    .replace(/<pre class="([^"]*)"/g, (match, p1) => {
      const lang = p1.toLowerCase().trim();
      return `<pre class="language-${lang}"`;
    })
    .replace(/<code class="([^"]*)"/g, (match, p1) => {
      const lang = p1.toLowerCase().trim();
      return `<code class="language-${lang}"`;
    });
};

const Modal = ({ project, icons, onClose, isClosing }) => {
  const isDarkTheme = document.documentElement.classList.contains("dark");

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  const renderContentBlock = (content) => {
    if (!content) return null;

    if (typeof content === "string" && content.includes("<")) {
      const cleanedHtml = cleanHtmlContent(content);
      return (
        <div className="blog-containt text-dark dark:text-white max-w-none">
          {parseHighlighting(cleanedHtml, isDarkTheme)}
        </div>
      );
    }

    if (typeof content === "string") {
      return <p className="text-white">{content}</p>;
    }

    if (Array.isArray(content)) {
      return (
        <ul className="list-disc pl-5 text-white">
          {content.map((item, index) => (
            <li key={index}>{renderContentBlock(item)}</li>
          ))}
        </ul>
      );
    }

    if (content.title && content.items) {
      return (
        <div className="mb-4 text-white">
          <h5 className="font-medium mb-2">{content.title}</h5>
          {Array.isArray(content.items) ? (
            <ul className="list-disc pl-5">
              {content.items.map((item, index) => (
                <li key={index}>{renderContentBlock(item)}</li>
              ))}
            </ul>
          ) : (
            renderContentBlock(content.items)
          )}
        </div>
      );
    }

    return Object.entries(content).map(([key, value]) => {
      if (key === "type" || key === "className") return null;
      return (
        <div key={key} className={`text-white ${content.className || ""}`}>
          {!key.startsWith("_") && <h5 className="font-medium mb-2">{key}</h5>}
          {renderContentBlock(value)}
        </div>
      );
    });
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-slate-200 dark:bg-dark-cast relative rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col ${
          isClosing ? "animate-popOut" : "animate-popIn"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 bg-slate-200 dark:bg-dark-cast p-2 rounded-lg hover:scale-110 transition-transform duration-200"
          onClick={onClose}
        >
          <CloseIcon
            className="text-dark dark:text-white"
            width={20}
            height={20}
          />
        </button>
        <div className="p-3 sm:p-4 md:p-6 text-dark dark:text-white overflow-y-auto">
          <img
            src={project.image}
            alt="Project preview"
            className="w-full h-auto rounded-lg object-cover border border-transparent dark:border-zinc-900"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
          />

          <h4 className="text-2xl font-medium my-4">{project.title}</h4>
          <div className="flex flex-wrap gap-3 mb-4">
            {project.technologies.map((tech) => {
              const iconName = tech.toLowerCase();
              const iconSrc = icons[iconName]?.default || icons[iconName];
              return (
                <div
                  key={tech}
                  className="flex items-center gap-1 px-3 py-1 rounded"
                >
                  <img
                    src={iconSrc}
                    alt={tech}
                    className="w-4 h-4 object-contain"
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                  />
                  <span className="text-sm">{tech}</span>
                </div>
              );
            })}
          </div>
          {project.description && (
            <div className="blog-containt mb-2">
              {renderContentBlock(project.description)}
            </div>
          )}
        </div>
        {project.links && (
          <div className="flex gap-4 p-6 border-t border-[#d0d0d0] dark:border-[#12151A]">
            {project.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="flex-1 text-center bg-[#C778DD] hover:bg-[#9C5AB0] text-white py-2 px-4 rounded transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Project = React.memo(({ image, title, technologies, icons, onClick }) => (
  <div
    className="w-full md:w-[calc(50%-15px)] lg:w-[calc(50%-15px)] h-auto text-white cursor-pointer group"
    onClick={onClick}
  >
    <div className="relative rounded-xl border border-transparent dark:border-zinc-900 overflow-hidden aspect-video">
      <img
        src={image}
        alt="Project preview"
        className="w-full h-full object-cover block opacity-80 dark:opacity-30 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
        loading="lazy"
      />
    </div>

    <div className="relative mt-2 flex gap-3 overflow-x-hidden">
      {technologies.map((tech) => {
        const iconName = tech.toLowerCase();
        const iconSrc = icons[iconName];
        return (
          <div
            key={tech}
            className="flex items-center gap-1 flex-shrink-0 opacity-20 group-hover:opacity-100 transition-all duration-200 ease-in-out"
          >
            <img
              src={iconSrc}
              alt={tech}
              className="w-[17px] h-[17px] object-contain grayscale group-hover:grayscale-0 transition-all duration-200 ease-in-out"
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
              loading="lazy"
            />
            <span className="text-sm text-black dark:text-white">{tech}</span>
          </div>
        );
      })}
      <div className="sticky right-0 w-4 h-full bg-gradient-to-l from-[#0D0F12] to-transparent flex-shrink-0"></div>
    </div>
  </div>
));

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [icons, setIcons] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isModalClosing, setIsModalClosing] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost/portfolio/api/projects.php"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await fetch(
          "http://localhost/portfolio/api/skills.php"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const iconsMap = data.reduce((acc, skill) => {
          acc[skill.name.toLowerCase()] = skill.icon;
          return acc;
        }, {});

        setIcons(iconsMap);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };

    fetchProjects();
    fetchSkills();
  }, []);

  const handleProjectClick = useCallback((project) => {
    setActiveProject(project);
    setIsModalClosing(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalClosing(true);
    setTimeout(() => {
      setActiveProject(null);
      setIsModalClosing(false);
    }, 200);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const groupedProjects = projects.reduce((acc, project) => {
    if (!acc[project.type]) {
      acc[project.type] = [];
    }
    acc[project.type].push(project);
    return acc;
  }, {});

  return (
    <Section id="project" title="Проекты">
      {Object.entries(groupedProjects).map(([type, projects]) => (
        <React.Fragment key={type}>
          <h3
            className={`text-dark dark:text-white font-light mb-2 ${
              type === "big" ? "mt-4" : "mt-8"
            }`}
          >
            - {type === "big" ? "Большие проекты" : "Маленькие проекты"}:
          </h3>
          <div className="flex flex-wrap gap-6">
            {projects.map((project, index) => (
              <Project
                key={`${type}-${index}`}
                {...project}
                icons={icons}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
      {activeProject && (
        <Modal
          project={activeProject}
          icons={icons}
          onClose={handleCloseModal}
          isClosing={isModalClosing}
        />
      )}
    </Section>
  );
};

export default React.memo(ProjectSection);
