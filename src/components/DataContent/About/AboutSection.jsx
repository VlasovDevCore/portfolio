import React from "react";
import Section from "../../Section/Section";

const AboutSection = () => {
  return (
    <Section id="about" title="Кто я">
      <div className="text-black dark:text-white tracking-[0.05em] leading-[30px] space-y-2.5">
        <p>
          Привет! Меня зовут Влад, я начинающий фронтенд-разработчик.
          Программированием увлекаюсь уже 4 года — начинал с создания сайтов на
          HTML, CSS, JavaScript и немного работал с PHP для серверной части.
        </p>
        <p>
          Сейчас активно изучаю и применяю в проектах React и TypeScript. Также
          владею технологиями HTML, CSS, JavaScript, PHP, работаю с базами
          данных MySQL, использую фреймворки Bootstrap и Tailwind CSS.
        </p>
        <p>
          В разработке особое внимание уделяю адаптивному дизайну, удобству
          пользовательского интерфейса (UX/UI) и производительности приложений.
          Люблю создавать качественные продукты и доводить проекты до идеала.
        </p>
        <p>
          Сейчас занимаюсь развитием личных проектов, а также поддерживаю два
          реализованных сайта:{" "}
          <a
            className="relative inline-block text-black dark:text-white group"
            target="_blank"
            rel="noreferrer"
            href="https://articore.ru/"
          >
            ArtiCore
            <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-current transform scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
          </a>{" "}
          и{" "}
          <a
            href="https://stepcond.ru/"
            target="_blank"
            rel="noreferrer"
            className="relative inline-block text-black dark:text-white group"
          >
            Stepura Conditioner
            <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-current transform scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
          </a>
          .
        </p>

        <p>Готов к новым вызовам и открыт к сотрудничеству!</p>
      </div>
    </Section>
  );
};

export default AboutSection;
