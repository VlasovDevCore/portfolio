import React, { useEffect, useState } from "react";
import avatar from "../../assets/image/avatar/avatar.png";
import { Link } from "react-router-dom";

import { ReactComponent as GitIcon } from "../../assets/image/soc/Git.svg";
import { ReactComponent as CodepenIcon } from "../../assets/image/soc/Codepen.svg";
import { ReactComponent as GoogleIcon } from "../../assets/image/soc/Google.svg";
import { ReactComponent as TelegramIcon } from "../../assets/image/soc/Telegram.svg";

import { ReactComponent as MoonIcon } from "../../assets/image/icon/moon.svg";
import { ReactComponent as SunIcon } from "../../assets/image/icon/sun.svg";
import { ReactComponent as MenuIcon } from "../../assets/image/icon/menu.svg";
import { ReactComponent as CloseIcon } from "../../assets/image/icon/close.svg";

const Sidebar = ({ isDark, toggleTheme, activeSection }) => {
  const links = [
    { to: "about", text: "Кто я" },
    { to: "skills", text: "Навыки и стек" },
    { to: "project", text: "Проекты" },
    { to: "blog", text: "Блог" },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLinkClick = (to) => (e) => {
    e.preventDefault();
    const element = document.getElementById(to);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, null, `/${to}`);
      if (isMobile) setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
      if (window.innerWidth >= 1000) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed z-10 bottom-4 left-4 p-2 bg-[#1f2937] rounded-full"
        >
          <MenuIcon
            className=" opacity-80 dark:opacity-60 dark:hover:opacity-100 transition-all duration-300 ease-in-out"
            width={27}
            height={27}
          />
        </button>
      )}

      <nav
        className={`fixed h-[100%] max-h-[100dvh] top-0 h-screen overflow-y-auto p-5 flex flex-col justify-between transition-all duration-300 ease-in-out z-40
        ${
          isMobile
            ? "max-w-[360px] w-[100%] bg-white dark:bg-dark-cast"
            : "w-2/5"
        }
        ${isMobile ? (sidebarOpen ? "left-0" : "-left-[360px]") : "left-0"}`}
      >
        <div>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 opacity-50 p-3 rounded-full hover:opacity-100 transition-all duration-300 ease-in-out"
            >
              <CloseIcon
                className="text-dark dark:text-white"
                width={20}
                height={20}
              />
            </button>
          )}

          <div className="w-52 h-52 mx-auto bg-[#0b0c0f] mt-4 rounded-full overflow-hidden">
            <img
              src={avatar}
              alt="Аватар"
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-full"
            />
          </div>

          <ul className="flex flex-col items-center justify-center gap-3 mt-5">
            {links.map((link) => (
              <li
                key={link.to}
                className="dark:font-light text-xl text-black dark:text-white cursor-pointer"
              >
                <Link
                  to={`/${link.to}`}
                  onClick={handleLinkClick(link.to)}
                  className={`flex items-center transition-opacity duration-200 ease-in ${
                    activeSection === link.to
                      ? "opacity-100"
                      : "opacity-70 dark:opacity-60"
                  } hover:opacity-100`}
                >
                  <span className="font-normal">#</span>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mt-[70px]">
          <div className="flex justify-center gap-5">
            <a
              href="https://github.com/VlasovDevCore"
              target="_blank"
              rel="noreferrer"
              className="inline-block"
            >
              <GitIcon
                className="text-black dark:text-white opacity-80 dark:hover:opacity-100 hover:opacity-100 transition-all duration-300 ease-in-out"
                width={27}
                height={27}
              />
            </a>

            <a
              href="https://codepen.io/VlasovDevCore"
              target="_blank"
              rel="noreferrer"
              className="inline-block"
            >
              <CodepenIcon
                className="text-neutral-800 dark:text-neutral-200 grayscale hover:grayscale-0 opacity-80 dark:opacity-60 dark:hover:opacity-100 hover:opacity-100 transition-all duration-300 ease-in-out"
                width={27}
                height={27}
              />
            </a>

            <a href="mailto:vlasov.working@gmail.com" className="inline-block">
              <GoogleIcon
                className="text-neutral-800 dark:text-neutral-200 grayscale hover:grayscale-0 opacity-80 dark:opacity-60 dark:hover:opacity-100 transition-all duration-300 ease-in-out"
                width={27}
                height={27}
              />
            </a>

            <a
              href="https://t.me/vlasov_working"
              target="_blank"
              rel="noreferrer"
              className="inline-block"
            >
              <TelegramIcon
                className="text-neutral-800 dark:text-neutral-200 grayscale hover:grayscale-0 opacity-80 dark:opacity-60 dark:hover:opacity-100 transition-all duration-300 ease-in-out"
                width={27}
                height={27}
              />
            </a>
          </div>

          <button
            onClick={toggleTheme}
            className="absolute w-5 h-auto bg-transparent border-transparent left-5 top-1 opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </nav>

      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
