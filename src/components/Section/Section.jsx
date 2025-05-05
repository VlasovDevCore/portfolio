import React, { forwardRef } from "react";

const Section = forwardRef(({ id, title, children }, ref) => {
  return (
    <section id={id} ref={ref} className="inline-block w-full h-auto py-[30px]">
      <h2 className="flex items-center whitespace-nowrap gap-1 text-[22px] text-black dark:text-white font-medium mb-2.5">
        <div>
          <span className="font-normal">#</span>
          {title}
        </div>
        <div className="ml-5 w-full h-px bg-white opacity-10"></div>
      </h2>
      {children || <p>{title}...</p>}
    </section>
  );
});

Section.displayName = "Section"; // Добавляем displayName для отладки

export default Section;
